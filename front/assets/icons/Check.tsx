// Check.tsx
import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

interface CheckProps {
  size?: number;
  colorPrimary?: string;
  colorSecondary?: string;
}

const Check: React.FC<CheckProps> = ({ size = 24, colorPrimary = 'currentColor', colorSecondary = 'currentColor' }) => (
  <Svg viewBox="0 0 256 256" width={size} height={size} fill="none">
    <Rect width="256" height="256" fill="none" />
    <Path d="M104,147.43l98.34-97.09a8,8,0,0,1,11.32,0l24,23.6a8,8,0,0,1,0,11.32l-128.4,128.4a8,8,0,0,1-11.32,0l-71.6-72a8,8,0,0,1,0-11.31l24-24a8,8,0,0,1,11.32,0Z" opacity="0.2" fill={colorSecondary} />
    <Path d="M104,147.43l98.34-97.09a8,8,0,0,1,11.32,0l24,23.6a8,8,0,0,1,0,11.32l-128.4,128.4a8,8,0,0,1-11.32,0l-71.6-72a8,8,0,0,1,0-11.31l24-24a8,8,0,0,1,11.32,0Z" fill="none" stroke={colorPrimary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
  </Svg>
);

export default Check;
