// assets/icons/Home.tsx
import React from 'react';
import Svg, { Rect, Line, Polyline, Path } from 'react-native-svg';

const Home = ({ size = 24, color = 'currentColor' }) => (
  <Svg viewBox="0 0 256 256" width={size} height={size} fill="none">
    <Rect width="256" height="256" fill="none" />
    <Line x1="16" y1="216" x2="240" y2="216" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <Polyline points="152 216 152 152 104 152 104 216" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <Line x1="40" y1="116.69" x2="40" y2="216" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <Line x1="216" y1="216" x2="216" y2="116.69" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <Path d="M24,132.69l98.34-98.35a8,8,0,0,1,11.32,0L232,132.69" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
  </Svg>
);

export default Home;
