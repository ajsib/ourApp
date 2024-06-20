// Camera/index.tsx
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import CameraView from './components/CameraView';
import CaptureOverlay from './components/CaptureOverlay';
import { useCameraContext } from './CameraContext';

export default function Camera({ style }: { style?: ViewStyle }) {
  const { isCapture, toggleCaptureMode, aspectRatio: contextRatio } = useCameraContext();
  const touchableDisabled = useRef(isCapture);

  useEffect(() => {
    touchableDisabled.current = isCapture;
  }, [isCapture]);

  const handleTouchablePress = () => {
    if (!touchableDisabled.current) {
      toggleCaptureMode();
    }
  };

  const aspectRatio = contextRatio === '4:3' ? 3 /4 : 9 / 16;

  return (
    <View style={[styles.fixedContainer, aspectRatio === 4 / 3 && { width: '100%' }]}>
      <ThemedView style={[styles.container, { backgroundColor: 'transparent' }, style]} onTouchEnd={handleTouchablePress}>
        <CameraView style={{ aspectRatio }} />
        <CaptureOverlay isVisible={isCapture} />
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  fixedContainer: {
    aspectRatio: 9 / 16,
    // height: '100%'
  },
  container: {
    flex: 1,
    // borderRadius: 10,
  },
});
