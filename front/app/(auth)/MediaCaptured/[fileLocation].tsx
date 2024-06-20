import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { saveMedia, sendMedia } from './actions';
import Check from '@/assets/icons/Check';
import Download from '@/assets/icons/Download';
import Send from '@/assets/icons/Send';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function DisplayCapturedMedia() {
  const { fileLocation } = useLocalSearchParams();
  const [aspectRatio, setAspectRatio] = useState(1);
  const [caption, setCaption] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  const [captionHeight, setCaptionHeight] = useState(0);
  const cardBackgroundColor = useThemeColor({}, 'cardBackground');
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const [saveSuccessful, setSaveSuccessful] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);



  useEffect(() => {
    if (fileLocation) {
      Image.getSize(fileLocation, (width, height) => {
        const maxWidth = windowWidth * 0.95;
        const maxHeight = windowHeight * 0.85;
        const totalAspectRatio = width / height;
        let scaledWidth = maxWidth;
        let scaledHeight = maxWidth / totalAspectRatio;

        if (scaledHeight + captionHeight > maxHeight) {
          scaledHeight = maxHeight - captionHeight;
          scaledWidth = scaledHeight * totalAspectRatio;
        }

        setImageHeight(scaledHeight);
        setAspectRatio(totalAspectRatio);
      }, (error) => {
        console.error('Failed to get image size:', error);
      });
    }
  }, [fileLocation, captionHeight]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleTap = () => {
    if (isEditing) {
      Keyboard.dismiss();
    }
    setIsEditing(!isEditing);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleCaptionChange = (text: string) => {
    setCaption(text);
    if (text === '') {
      setCaptionHeight(0);
    }
  };

  const handleSave = async () => {
    if (isSaving) return; 
    setIsSaving(true);
    try {
      await saveMedia(fileLocation, caption);
      setSaveSuccessful(true);
    } catch (error) {
      console.error('Error saving media:', error);
      setSaveSuccessful(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSend = async () => {
    if (isSending) return;
    setIsSending(true);
    try {
      await sendMedia(fileLocation, caption);
    } catch (error) {
      console.error('Error sending media:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={handleTap}>
        <View style={{ flex: 1, backgroundColor: backgroundColor }}>
          <ThemedView style={[styles.card, { backgroundColor: cardBackgroundColor, width: windowWidth * 0.95, height: imageHeight ? imageHeight + captionHeight : windowHeight * 0.85 }]}>
            <Image
              source={{ uri: fileLocation }}
              style={[styles.image, { height: imageHeight }]}
              onLoad={() => {}}
            />
            {!isEditing && caption.length > 0 && (
              <ThemedText
                style={styles.caption}
                onLayout={(event) => setCaptionHeight(event.nativeEvent.layout.height)}
              >
                {caption}
              </ThemedText>
            )}
            {!isEditing && caption.length === 0 && (
              <ThemedText
                style={styles.caption}
                onLayout={() => setCaptionHeight(0)}
              >
                {caption}
              </ThemedText>
            )}
          </ThemedView>
          {isEditing && (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inputContainer}>
              <TextInput
                style={[styles.captionInput, { backgroundColor: cardBackgroundColor, color: textColor }]}
                value={caption}
                onChangeText={handleCaptionChange}
                onBlur={handleBlur}
                autoFocus={true}
                placeholder="Add a caption..."
                placeholderTextColor={textColor}
                multiline
                onContentSizeChange={(event) => setCaptionHeight(event.nativeEvent.contentSize.height)}
              />
            </KeyboardAvoidingView>
          )}
        </View>
      </TouchableWithoutFeedback>
      {!keyboardVisible && (
        <View style={styles.bottomRow}>
          <TouchableOpacity 
            style={[styles.actionCard, styles.leftCard, { backgroundColor: cardBackgroundColor }]} 
            onPress={handleSave} 
            disabled={isSaving || saveSuccessful}
          >
            {saveSuccessful ? (
              <Check size={24} colorPrimary="green" colorSecondary="green" />
            ) : (
              <Download size={24} color={textColor} />
            )}
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionCard, styles.rightCard, { backgroundColor: cardBackgroundColor }]} 
            onPress={handleSend} 
            disabled={isSending}
          >
            <Send size={24} color={textColor} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    top: (Platform.OS === 'android' ? StatusBar.currentHeight : 20) + 10,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    maxWidth: windowWidth * 0.95,
    maxHeight: windowHeight * 0.85,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  image: {
    width: '100%',
  },
  captionInput: {
    fontFamily: 'TimesNewRoman',
    padding: 10,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 18,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  caption: {
    padding: 10,
    lineHeight: 24,
    fontSize: 18,
    textAlign: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: '100%',
  },
  inputContainer: {
    width: '95%',
    position: 'absolute',
    justifyContent: 'center',
    bottom: 0,
    left: '2.5%',
    right: '2.5%',
  },
  bottomRow: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionCard: {
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftCard: {
    flex: 1,
    marginRight: 10,
  },
  rightCard: {
    flex: 2,
  },
  actionText: {
    fontSize: 18,
  },
});
