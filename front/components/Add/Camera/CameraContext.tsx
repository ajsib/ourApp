import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { CameraViewRef } from 'expo-camera';
import { toggleCaptureMode as toggleCaptureModeFunc } from './CameraFunctions';
import { CameraContextType, CameraProviderProps } from './CameraTypes';
import * as Device from 'expo-device';
import { useRouter } from 'expo-router';

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export const CameraProvider: React.FC<CameraProviderProps> = ({ isCapture, toggleCaptureMode, children }) => {
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [cameraFacing, setCameraFacing] = useState('front');
  const animation = useRef(new Animated.Value(0)).current;
  const [isIPhoneSE, setIsIPhoneSE] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [flash, setFlash] = useState<'on' | 'off'>('off');
  const cameraViewRef = useRef<CameraViewRef>(null);
  const [capturedImageURI, setCapturedImageURI] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkDeviceModel = async () => {
      const modelName = await Device.modelName;
      if (modelName && modelName.includes("iPhone SE")) {
        setIsIPhoneSE(true);
        console.log('IPHONESE');
      }
    };
    checkDeviceModel();
  }, []);

  const contextToggleCaptureMode = () => {
    toggleCaptureModeFunc(isCapture, toggleCaptureMode, animation);
    if (isCapture) {
      setAspectRatio('16:9');
    }
  };

  const toggleAspectRatio = () => {
    if (isCapture) {
      setAspectRatio(aspectRatio === '16:9' ? '4:3' :'16:9');
    }
  };

  const toggleCameraFacing = () => {
    setCameraFacing(prev => (prev === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlash(prev => (prev === 'off' ? 'on' : 'off'));
  };

  const takePicture = async () => {
    if (cameraViewRef.current) {
      const options = {
        quality: 1,
        skipProcessing: true,
        isImageMirror: true
      };
      const photo = await cameraViewRef.current.takePictureAsync(options);
      console.log(photo);
      setCapturedImageURI(photo.uri);
      router.push(`/MediaCaptured/${encodeURIComponent(photo.uri)}`);
    }
  };

  return (
    <CameraContext.Provider value={{
      isCapture,
      toggleCaptureMode: contextToggleCaptureMode,
      aspectRatio,
      toggleAspectRatio,
      cameraFacing,
      toggleCameraFacing,
      scrollPosition,
      setScrollPosition,
      flash,
      toggleFlash,
      takePicture,
      cameraViewRef,
      capturedImageURI
    }}>
      {children}
    </CameraContext.Provider>
  );
};

export const useCameraContext = (): CameraContextType => {
  const context = useContext(CameraContext);
  if (context === undefined) {
    throw new Error('useCameraContext must be used within a CameraProvider');
  }
  return context;
};
