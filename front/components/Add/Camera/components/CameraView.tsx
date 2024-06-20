// Camera/components/CameraView.tsx
import React from 'react';
import { Camera, CameraType, FlashMode, AutoFocus } from 'expo-camera/legacy';
import { Button, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useCameraContext } from '../CameraContext';
import { useIsFocused } from '@react-navigation/core';

interface CameraViewComponentProps {
  style?: ViewStyle;
}

const CameraViewComponent: React.FC<CameraViewComponentProps> = ({ style }) => {
  const { cameraFacing, scrollPosition, flash, cameraViewRef, aspectRatio } = useCameraContext();  // Use cameraViewRef from context
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const isFocused = useIsFocused();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      {isFocused && (
        <Camera
          ref={cameraViewRef}
          type={cameraFacing}
          zoom={scrollPosition}
          flashMode={flash}
          ratio={aspectRatio}
          pictureSize={aspectRatio}
          useCamera2Api
        >
          <View style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }} />
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 10,
  },
});

export default CameraViewComponent;
