// assets/icons/Pin.tsx
import React from 'react';
import Svg, { Rect, Circle, Line, Path } from 'react-native-svg';
import { ViewStyle } from 'react-native';

type PinProps = {
  size?: number;
  color?: string;
  style?: ViewStyle;
};

const Pin = ({ size = 24, color = 'currentColor', style }: PinProps) => (
  <Svg viewBox="0 0 256 256" width={size} height={size} fill="none" style={style}>
    <Rect width="256" height="256" fill="none" />
    <Circle cx="128" cy="64" r="32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <Line x1="128" y1="96" x2="128" y2="176" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <Path d="M168,139.07c37.58,6,64,20.29,64,36.93,0,22.09-46.56,40-104,40S24,198.09,24,176c0-16.64,26.42-30.91,64-36.93" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
  </Svg>
);

export default Pin;
