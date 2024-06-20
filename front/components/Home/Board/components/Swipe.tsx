// components/Home/Board/components/Swipe.tsx
import React, { useRef } from 'react';
import { Animated, ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { SwipeProps } from '../types';

const Swipe: React.FC<SwipeProps> = ({ pages, pageWidth }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
      )}
      bounces={false}
      scrollEventThrottle={16}
      style={[styles.scrollView, { width: pageWidth }]}
    >
      {pages.map((page, index) => {
        const inputRange = [
          (index - 1) * pageWidth,
          index * pageWidth,
          (index + 1) * pageWidth,
        ];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1, 0.8],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View key={index} style={[styles.page, { width: pageWidth, transform: [{ scale }] }]}>
            {page}
          </Animated.View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
  },
  page: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Swipe;
