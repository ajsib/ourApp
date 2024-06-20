import React from 'react';
import Svg, { Rect, Polyline, Line } from 'react-native-svg';

const Crop = ({ size = 24, color = 'currentColor' }) => (
  <Svg viewBox="0 0 256 256" width={size} height={size} fill="none">
    <Rect width="256" height="256" fill="none" />
    <Polyline points="64 24 64 192 232 192" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <Line x1="24" y1="64" x2="64" y2="64" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <Polyline points="96 64 192 64 192 160" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <Line x1="192" y1="192" x2="192" y2="232" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
  </Svg>
);

export default Crop;