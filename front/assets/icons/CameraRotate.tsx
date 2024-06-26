import React from 'react';
import Svg, { Rect, Path, Polyline } from 'react-native-svg';

const CameraRotate = ({ size = 24, color = 'currentColor' }) => (
  <Svg viewBox="0 0 256 256" width={size} height={size} fill="none">
    <Rect width="256" height="256" fill="none" />
    <Path 
      d="M208,208H48a16,16,0,0,1-16-16V80A16,16,0,0,1,48,64H80L96,40h64l16,24h32a16,16,0,0,1,16,16V192A16,16,0,0,1,208,208Z" 
      fill="none" 
      stroke={color} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="16" 
    />
    <Polyline 
      points="168 96 168 120 144 120" 
      fill="none" 
      stroke={color} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="16" 
    />
    <Polyline 
      points="112 144 88 144 88 168" 
      fill="none" 
      stroke={color} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="16" 
    />
    <Path 
      d="M168,120l-11.72-12.28A40,40,0,0,0,104,104" 
      fill="none" 
      stroke={color} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="16" 
    />
    <Path 
      d="M152,160a40,40,0,0,1-52.28-3.73L88,144" 
      fill="none" 
      stroke={color} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="16" 
    />
  </Svg>
);

export default CameraRotate;
