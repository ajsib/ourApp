// assets/icons/Queue.tsx
import React from 'react';
import Svg, { Rect, Line, Circle, Polyline } from 'react-native-svg';
import { ViewStyle } from 'react-native';

type QueueProps = {
  size?: number;
  color?: string;
  style?: ViewStyle;
};

const Queue = ({ size = 24, color = 'currentColor', style }: QueueProps) => (
  <Svg viewBox="0 0 256 256" width={size} height={size} fill="none" style={style}>
    <Rect width="256" height="256" fill="none" />
    <Line x1="200" y1="24" x2="200" y2="72" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <Line x1="224" y1="48" x2="176" y2="48" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <Circle cx="180" cy="164" r="28" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <Circle cx="52" cy="196" r="28" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <Polyline points="80 196 80 56 136 42" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <Line x1="208" y1="112" x2="208" y2="164" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <Line x1="160" y1="84" x2="80" y2="104" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
  </Svg>
);

export default Queue;
