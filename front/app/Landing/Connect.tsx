import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Keyboard } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import CodeInput from '@/components/Landing/components/CodeInput';
import GenerateCode from '@/components/Landing/components/GenerateCode';
import { handleEnterCode, handleGenerateCode, PartnerResponse } from '@/components/Landing/ConnectFunctions';
import { useAuth } from '@/components/AuthContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import PartnerConnected from '@/components/Landing/PartnerConnected';

const Connect = () => {
  const [code, setCode] = useState('');
  const [partnerInfo, setPartnerInfo] = useState<PartnerResponse | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [generateCodeError, setGenerateCodeError] = useState<string | null>(null);
  const cardBackgroundColor = useThemeColor({}, 'cardBackground');
  const { session, checkUserPartnershipStatus } = useAuth();
  const token = session;

  const handleCodeChange = (input: string) => {
    const sanitizedInput = input.replace(/[^A-Z0-9]/g, '').toUpperCase();
    setCode(sanitizedInput);
    setCodeError(null);  // Reset error message
    if (sanitizedInput.length === 7) {
      Keyboard.dismiss();
      handleEnterCode(token, sanitizedInput)
        .then(async (info) => {
          setPartnerInfo(info);
          await checkUserPartnershipStatus();
        })
        .catch(error => {
          console.error('Error fetching partner info:', error);
          setCodeError('Failed to fetch partner info.');
        });
    } else if (sanitizedInput.length === 0) {
      setPartnerInfo(null);
      Keyboard.dismiss();
    } else {
      setPartnerInfo(null);
    }
  };

  const handleGenerateCodePress = () => {
    setGenerateCodeError(null);
    handleGenerateCode(token)
      .then(response => {
        setGeneratedCode(response.code);
      })
      .catch(error => {
        console.error('Error generating code:', error);
        setGenerateCodeError('Failed to generate code.');
      });
  };

  const handleEnterCodeInsteadPress = () => {
    setGeneratedCode(null);
  };

  if (partnerInfo) {
    return (
      <PartnerConnected
        yourProfile={partnerInfo.yourProfile}
        partnerProfile={partnerInfo.partnerProfile}
      />
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.header}>Welcome to OurApp</ThemedText>
        <ThemedText style={styles.subheader}>To get connected with a partner, you can either:</ThemedText>
        <View style={styles.cardContainer}>
          <ThemedView style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
            {!generatedCode ? (
              <CodeInput
                code={code}
                setCode={setCode}
                codeError={codeError}
                handleCodeChange={handleCodeChange}
              />
            ) : (
              <ThemedText style={styles.generatedCodeText}>{generatedCode}</ThemedText>
            )}
          </ThemedView>
          <ThemedText style={styles.orText}>or</ThemedText>
          <ThemedView style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
            <GenerateCode
              generatedCode={generatedCode}
              generateCodeError={generateCodeError}
              handleGenerateCodePress={handleGenerateCodePress}
              handleEnterCodeInsteadPress={handleEnterCodeInsteadPress}
            />
          </ThemedView>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 20,
  },
  header: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: 'TimesNewRoman-Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 20,
    fontFamily: 'TimesNewRoman-Italic',
    textAlign: 'center',
    marginBottom: 40,
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  orText: {
    fontSize: 18,
    fontFamily: 'TimesNewRoman-Italic',
    marginVertical: 40,
    textAlign: 'center',
  },
  generatedCodeText: {
    fontSize: 30,
    lineHeight: 40,
    fontFamily: 'TimesNewRoman-Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Connect;
