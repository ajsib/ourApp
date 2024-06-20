import { Animated, ViewStyle } from 'react-native';
import { CameraViewRef } from 'expo-camera';

// CameraTypes.ts
export interface CameraContextType {
  isCapture: boolean;
  toggleCaptureMode: () => void;
  aspectRatio: string;
  toggleAspectRatio: () => void;
  cameraFacing: string;
  toggleCameraFacing: () => void;
  scrollPosition: number;
  setScrollPosition: (position: number) => void;
  flash: 'on' | 'off';
  toggleFlash: () => void;
  takePicture: () => void;
  cameraViewRef: React.RefObject<CameraViewRef>;
  capturedImageURI: string | null;
}

export interface CameraProviderProps {
  isCapture: boolean;
  toggleCaptureMode: () => void;
  children: React.ReactNode;
}


export interface CameraProps {
  style?: ViewStyle;
}

export interface ToggleCaptureModeFunc {
  (isCapture: boolean, setIsCapture: (value: boolean) => void, animation: Animated.Value): void;
}
