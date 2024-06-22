// @/components/Landing/components/CodeInput.tsx

import React, { useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  codeError: string | null;
  handleCodeChange: (input: string) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ code, setCode, codeError, handleCodeChange }) => {
  const textInputRef = useRef(null);
  const textColor = useThemeColor({}, 'text');

  const handleContainerPress = () => {
    if (textInputRef.current.isFocused()) {
      Keyboard.dismiss();
    } else {
      textInputRef.current.focus();
    }
  };

  return (
    <>
      <ThemedText style={styles.cardHeader}>Enter your partner's code</ThemedText>
      <TouchableOpacity onPress={handleContainerPress} activeOpacity={1} style={styles.inputOuterContainer}>
        <View style={styles.inputContainer}>
          {[...Array(7)].map((_, index) => (
            <View key={index} style={styles.inputBox}>
              <ThemedText style={[styles.inputText, { color: textColor }]}>
                {code[index] ? code[index] : ''}
              </ThemedText>
            </View>
          ))}
        </View>
      </TouchableOpacity>
      <TextInput
        ref={textInputRef}
        style={styles.hiddenInput}
        value={code}
        onChangeText={handleCodeChange}
        maxLength={7}
        keyboardType="default"
        autoCapitalize="characters"
      />
      {codeError && <ThemedText style={styles.errorText}>{codeError}</ThemedText>}
    </>
  );
};

const styles = StyleSheet.create({
  inputOuterContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  inputBox: {
    borderBottomWidth: 2,
    borderColor: '#ccc',
    width: '12%',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 24,
    fontFamily: 'TimesNewRoman-Bold',
    textAlign: 'center',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
  },
  cardHeader: {
    fontSize: 22,
    fontFamily: 'TimesNewRoman-Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default CodeInput;
