import React from 'react';
import Svg, { Rect, Line } from 'react-native-svg';

const Exit = ({ size = 24, color = 'currentColor' }) => (
  <Svg viewBox="0 0 256 256" width={size} height={size} fill="none">
    <Rect width="256" height="256" fill="none" />
    <Rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <Line x1="160" y1="96" x2="96" y2="160" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <Line x1="96" y1="96" x2="160" y2="160" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
  </Svg>
);

export default Exit;
