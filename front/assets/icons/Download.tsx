// Download.tsx
import React from 'react';
import Svg, { Rect, Line, Polyline } from 'react-native-svg';

interface DownloadProps {
  size?: number;
  color?: string;
}

const Download: React.FC<DownloadProps> = ({ size = 24, color = 'currentColor' }) => (
  <Svg viewBox="0 0 256 256" width={size} height={size} fill="none">
    <Rect width="256" height="256" fill="none" />
    <Line x1="128" y1="144" x2="128" y2="32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <Polyline points="216 144 216 208 40 208 40 144" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" fill="none" />
    <Polyline points="168 104 128 144 88 104" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" fill="none" />
  </Svg>
);

export default Download;
