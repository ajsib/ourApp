import React, { useRef, useState } from 'react';
import { StyleSheet, View, Animated, TouchableOpacity, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import * as Haptics from 'expo-haptics';
import Exit from '@/assets/icons/Exit';
import Lightning from '@/assets/icons/Lightning';
import Circle from '@/assets/icons/Circle';
import CameraRotate from '@/assets/icons/CameraRotate';
import { useCameraContext } from '../CameraContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import Ruler from '@/assets/icons/Ruler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const factor = (value: number, axis: 'width' | 'height' = 'width') => 
  axis === 'width' ? windowWidth * value : windowHeight * value;

const CaptureOverlay: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const { aspectRatio, toggleCaptureMode, toggleAspectRatio, toggleCameraFacing, setScrollPosition, flash, toggleFlash, takePicture, capturedImageURI } = useCameraContext();
  const iconColor = useThemeColor({}, 'tabIconSelected');
  const adjustedIconColor = aspectRatio === "4:3" ? iconColor : 'white';
  const opacity = React.useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const lastHapticScrollPosition = useRef(0);
  const [isRulerVisible, setIsRulerVisible] = useState(false);

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: isVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  React.useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: factor(0.5) - 250, animated: false });
    }
  }, [windowWidth]);

  const handleScrollBeginDrag = () => {
    setIsRulerVisible(true);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.setValue(event.nativeEvent.contentOffset.x);
    updateScrollPosition(event.nativeEvent.contentOffset.x);

    const interval = factor(0.1);
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offsetX / interval);

    if (index !== lastHapticScrollPosition.current) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
      lastHapticScrollPosition.current = index;
    }
  };

  const handleScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const interval = factor(0.1);
    const index = Math.round(offsetX / interval);
    const newX = index * interval;
    if (scrollViewRef.current) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      scrollViewRef.current.scrollTo({ x: newX, animated: true });
    }
    updateScrollPosition(newX);
    setTimeout(() => setIsRulerVisible(false), 200);
  };

  const updateScrollPosition = (offsetX: number) => {
    const maxScroll = factor(1.2);
    const position = offsetX / maxScroll;
    setScrollPosition(Math.min(Math.max(position, 0), 1));
  };

  if (!isVisible) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity }]} pointerEvents="box-none">
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.iconLeft} onPress={toggleFlash}>
          <Lightning isON={flash === 'on'} size={factor(0.06)} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconRight} onPress={toggleCaptureMode}>
          <Exit size={factor(0.06)} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          contentContainerStyle={styles.scrollViewContent}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScrollBeginDrag={handleScrollBeginDrag}
          onScroll={handleScroll}
          onScrollEndDrag={handleScrollEndDrag}
        >
          <View style={{ width: factor(0.5) - factor(0.055) }} />
          <Ruler size={factor(1.25)} color={adjustedIconColor} isVisible={isRulerVisible} /> 
          <View style={{ width: factor(0.5) - factor(0.055) }} />
        </ScrollView>
      </View>
      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.iconLeft} onPress={toggleAspectRatio}>
          <ThemedText style={[styles.aspectRatioText, { color: adjustedIconColor }]}>
            {aspectRatio}
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconCenter} onPress={takePicture}> 
          <Circle size={factor(0.2)} color={adjustedIconColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconRight} onPress={toggleCameraFacing}>
          <CameraRotate size={factor(0.06)} color={adjustedIconColor} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '2%',
    paddingHorizontal: '2%',
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '4%',
    paddingHorizontal: '5%',
  },
  bottomRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    zIndex: 1,
  },
  iconLeft: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRight: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: factor(0.1, 'height'),
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  scrollViewContent: {
    alignItems: 'center',
    height: factor(0.5, 'height'),
  },
  aspectRatioText: {
    fontSize: 18,
    fontFamily: 'TimesNewRoman-Bold'
  },
  capturedImageContainer: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    right: '10%',
    bottom: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  capturedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default CaptureOverlay;
