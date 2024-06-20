import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { TimelineItemProps } from '../types';
import { useThemeColor } from '@/hooks/useThemeColor';

const { width } = Dimensions.get('window');

const TimelineItem: React.FC<{ item: TimelineItemProps }> = ({ item }) => {
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const cardBackgroundColor = useThemeColor({}, 'cardBackground');

  useEffect(() => {
    if (item.type === 'picture' && item.src) {
      Image.getSize(item.src, (width, height) => {
        const scalingFactor = (Dimensions.get('window').width - 20) / width;
        const scaledHeight = height * scalingFactor;
        setImageHeight(scaledHeight);
      }, (error) => {
        console.error('Failed to get image size:', error);
      });
    }
  }, [item.src, item.type]);

  const handleVideoPress = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pauseAsync();
      } else {
        videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const renderItem = () => {
    switch (item.type) {
      case 'picture':
        if (!item.src) return null;
        return (
          <ThemedView style={[styles.mediaContainer, { backgroundColor: cardBackgroundColor }]}>
            <Image
              source={{ uri: item.src }}
              style={[styles.image, { height: imageHeight }, item.caption ? styles.roundedTop : styles.roundedAll]}
              resizeMode="contain"
            />
            {item.caption && <ThemedText style={styles.caption}>{item.caption}</ThemedText>}
          </ThemedView>
        );
      case 'video':
        if (!item.src) return null;
        return (
          <TouchableWithoutFeedback onPress={handleVideoPress}>
            <ThemedView style={[styles.mediaContainer, { backgroundColor: cardBackgroundColor }]}>
              <Video
                ref={videoRef}
                source={{ uri: item.src }}
                style={styles.video}
                useNativeControls={false}
                shouldPlay={false}
                isLooping
              />
              {item.caption && <ThemedText style={styles.caption}>{item.caption}</ThemedText>}
            </ThemedView>
          </TouchableWithoutFeedback>
        );
      case 'caption':
        if (!item.text) return null;
        return (
          <ThemedView style={[styles.mediaContainer, styles.roundedAll, { backgroundColor: cardBackgroundColor }]}>
            <ThemedText style={styles.captionText}>{item.text}</ThemedText>
          </ThemedView>
        );
      default:
        return null;
    }
  };

  return (
    <ThemedView style={styles.itemContainer}>
      {renderItem()}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 20,
  },
  mediaContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginBottom: 10,
    width: width - 20,
  },
  image: {
    width: '100%',
  },
  video: {
    width: '100%',
    height: 166,
  },
  caption: {
    padding: 10,
    lineHeight: 24,
    fontSize: 18,
    textAlign: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  roundedTop: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  roundedAll: {
    borderRadius: 10,
  },
  captionContainer: {
    alignItems: 'center',
  },
  captionText: {
    lineHeight: 32,
    fontSize: 28,
    fontFamily: 'TimesNewRoman-Bold',
    textAlign: 'center',
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
});

export default TimelineItem;
