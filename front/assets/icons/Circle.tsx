import React from 'react';
import Svg, { Rect, Circle as SvgCircle } from 'react-native-svg';

const Circle = ({ size = 24, color = 'currentColor' }) => (
  <Svg viewBox="0 0 256 256" width={size} height={size} fill="none">
    <Rect width="256" height="256" fill="none" />
    <SvgCircle 
      cx="128" 
      cy="128" 
      r="96" 
      fill="none" 
      stroke={color} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="8" 
    />
  </Svg>
);

export default Circle;
