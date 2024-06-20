// assets/icons/Add.tsx
import React from 'react';
import Svg, { Rect, Line } from 'react-native-svg';

const Add = ({ size = 24, color = 'currentColor' }) => (
  <Svg viewBox="0 0 256 256" width={size} height={size} fill="none">
    <Rect width="256" height="256" fill="none" />
    <Line x1="40" y1="128" x2="216" y2="128" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <Line x1="128" y1="40" x2="128" y2="216" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
  </Svg>
);

export default Add;
