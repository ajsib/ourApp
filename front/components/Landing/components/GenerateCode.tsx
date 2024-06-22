// @/components/Landing/components/GenerateCode.tsx

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

interface GenerateCodeProps {
  generatedCode: string | null;
  generateCodeError: string | null;
  handleGenerateCodePress: () => void;
  handleEnterCodeInsteadPress: () => void;
}

const GenerateCode: React.FC<GenerateCodeProps> = ({ generatedCode, generateCodeError, handleGenerateCodePress, handleEnterCodeInsteadPress }) => {
  const tintColor = useThemeColor({}, 'tint');

  return (
    <>
      <ThemedText style={styles.cardHeader}>Generate a code for your partner</ThemedText>
      <TouchableOpacity style={[styles.button, { borderColor: tintColor, borderWidth: 1 }]} onPress={handleGenerateCodePress}>
        <ThemedText style={[styles.buttonText, { color: tintColor }]}>Generate Code</ThemedText>
      </TouchableOpacity>
      {generateCodeError && <ThemedText style={styles.errorText}>{generateCodeError}</ThemedText>}
      {generatedCode && (
        <TouchableOpacity onPress={handleEnterCodeInsteadPress}>
          <ThemedText style={styles.enterCodeInsteadText}>Enter a code instead</ThemedText>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  cardHeader: {
    fontSize: 22,
    fontFamily: 'TimesNewRoman-Bold',
    marginBottom: 20,
    textAlign: 'center',
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
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  enterCodeInsteadText: {
    fontSize: 18,
    fontFamily: 'TimesNewRoman-BoldItalic',
    color: '#999',
    marginTop: 20,
  },
});

export default GenerateCode;
