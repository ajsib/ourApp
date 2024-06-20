// assets/icons/Letter.tsx
import React from 'react';
import Svg, { Rect, Path, Polyline } from 'react-native-svg';
import { ViewStyle } from 'react-native';

type LetterProps = {
  size?: number;
  color?: string;
  style?: ViewStyle;
};

const Letter = ({ size = 24, color = 'currentColor', style }: LetterProps) => (
  <Svg viewBox="0 0 256 256" width={size} height={size} fill="none" style={style}>
    <Rect width="256" height="256" fill="none" />
    <Path d="M32,56H224a0,0,0,0,1,0,0V192a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V56A0,0,0,0,1,32,56Z" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <Polyline points="224 56 128 144 32 56" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
  </Svg>
);

export default Letter;
