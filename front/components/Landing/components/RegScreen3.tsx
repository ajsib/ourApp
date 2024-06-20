import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useRegContext } from '@/components/Landing/RegContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import * as ImagePicker from 'expo-image-picker';

const screenWidth = Dimensions.get('window').width;

const RegScreen3: React.FC = () => {
  const { firstName, setFirstName, lastName, setLastName, birthday, setBirthday, error, setError, setStep, profileImage, setProfileImage, register } = useRegContext();
  const cardBackgroundColor = useThemeColor({}, 'cardBackground');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  const handleBirthdayChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    let formatted = '';

    if (cleaned.length > 0) {
      formatted += cleaned.slice(0, 2);
    }
    if (cleaned.length > 2) {
      formatted += '/' + cleaned.slice(2, 4);
    }
    if (cleaned.length > 4) {
      formatted += '/' + cleaned.slice(4, 8);
    }

    setBirthday(formatted);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <>
      <ThemedText style={styles.subtitle}>Profile Information</ThemedText>
      <ThemedText style={styles.description}>Let's get your profile details.</ThemedText>
      <View style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholder="First Name"
          placeholderTextColor="#999"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>
      <View style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholder="Last Name"
          placeholderTextColor="#999"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <View style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
        <ThemedText style={styles.birthdayCaption}>(DD/MM/YYYY)</ThemedText>
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholder="Birthday"
          placeholderTextColor="#999"
          value={birthday}
          onChangeText={handleBirthdayChange}
          maxLength={10}
          keyboardType="numeric"
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      <TouchableOpacity onPress={pickImage} style={[styles.imagePicker, { backgroundColor: cardBackgroundColor }]}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <ThemedText style={styles.profilePhotoText}>Upload Profile Picture</ThemedText>
        )}
      </TouchableOpacity>
      <View style={styles.navButtons}>
        <TouchableOpacity onPress={() => setStep(2)} style={[styles.button, { backgroundColor: cardBackgroundColor }]}>
          <ThemedText style={[styles.buttonText, { color: tintColor }]}>Back</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={register} style={[styles.button, { backgroundColor: cardBackgroundColor }]}>
          <ThemedText style={[styles.buttonText, { color: tintColor }]}>Submit</ThemedText>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: 'TimesNewRoman-Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
    fontFamily: 'TimesNewRoman-Italic',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
  },
  input: {
    fontSize: 18,
    fontFamily: 'TimesNewRoman',
    padding: 10,
  },
  birthdayCaption: {
    fontSize: 14,
    fontFamily: 'TimesNewRoman-Italic',
    color: '#999',
    marginBottom: 5,
  },
  imagePicker: {
    width: '60%',
    aspectRatio: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    overflow: 'hidden',
  },
  profilePhotoText: {
    fontSize: 18,
    fontFamily: 'TimesNewRoman-Italic',
    color: '#999',
    textAlign: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  button: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'TimesNewRoman-BoldItalic',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default RegScreen3;
