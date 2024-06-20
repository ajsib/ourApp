import { Animated, Easing, Dimensions } from 'react-native';
import { ToggleCaptureModeFunc } from './CameraTypes';

const windowHeight = Dimensions.get('window').height;

export const toggleCaptureMode: ToggleCaptureModeFunc = (isCapture, setIsCapture, animation) => {
  setIsCapture(!isCapture);
  Animated.timing(animation, {
    toValue: isCapture ? 0 : 1,
    duration: 200,
    easing: Easing.bezier(0.42, 0, 0.58, 1),
    useNativeDriver: false,
  }).start();
};

export const interpolateHeight = (animation: Animated.Value, fromValue: number, toValue: number) => {
  return animation.interpolate({
    inputRange: [0, 1],
    outputRange: [windowHeight * fromValue, windowHeight * toValue],
  });
};
