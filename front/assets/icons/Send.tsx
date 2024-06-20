// Send.tsx
import React from 'react';
import Svg, { Rect, Line, Path } from 'react-native-svg';

interface SendProps {
  size?: number;
  color?: string;
}

const Send: React.FC<SendProps> = ({ size = 24, color = 'currentColor' }) => (
  <Svg viewBox="0 0 256 256" width={size} height={size} fill="none">
    <Rect width="256" height="256" fill="none" />
    <Line x1="144" y1="128" x2="80" y2="128" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <Path d="M48.49,221.28A8,8,0,0,0,59.93,231l168-96.09a8,8,0,0,0,0-14l-168-95.85a8,8,0,0,0-11.44,9.67L80,128Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
  </Svg>
);

export default Send;
