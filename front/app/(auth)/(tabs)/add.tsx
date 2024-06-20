import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, StatusBar, Platform, Animated, Dimensions } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import CustomCamera from '@/components/Add/Camera';
import Caption from '@/components/Add/Caption';
import FromDevice from '@/components/Add/FromDevice';
import { toggleCaptureMode } from '@/components/Add/Camera/CameraFunctions';
import { CameraProvider } from '@/components/Add/Camera/CameraContext';

const windowHeight = Dimensions.get('window').height;

export default function AddPage() {
  const [isCapture, setIsCapture] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isCapture ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isCapture, animation]);

  const captionScaleY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0], 
  });

  const fromDeviceScaleY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0], 
  });

  const cameraScaleY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1], 
  });

  return (
    <ThemedView style={styles.container}>
      <View style={styles.statusBarPadding} />
      <Animated.View style={[styles.caption, { transform: [{ scaleY: captionScaleY }] }]}>
        <Caption />
      </Animated.View>
      <Animated.View style={[styles.cameraContainer, { transform: [{ scaleY: cameraScaleY }, {scaleX: cameraScaleY}] }]}>
        <CameraProvider isCapture={isCapture} toggleCaptureMode={() => toggleCaptureMode(isCapture, setIsCapture, animation)}>
          <CustomCamera />
        </CameraProvider>
      </Animated.View>
      <Animated.View style={[styles.fromDevice, { transform: [{ scaleY: fromDeviceScaleY }] }]}>
        <FromDevice />
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  caption: {
    position: 'absolute',
    top: (Platform.OS === 'android' ? StatusBar.currentHeight : 20) + 10,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%'
  },
  cameraContainer: {
    top: (windowHeight * 0.06),
    maxWidth: '95%',
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    zIndex: 1
  },
  fromDevice: {
    position: 'absolute',
    bottom: '2%',
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '15%'
  },
  statusBarPadding: {
    height: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
  },
});
