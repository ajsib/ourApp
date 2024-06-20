// assets/icons/Chat.tsx
import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

const Chat = ({ size = 24, color = 'currentColor' }) => (
  <Svg viewBox="0 0 256 256" width={size} height={size} fill="none">
    <Rect width="256" height="256" fill="none" />
    <Path d="M32.5,138A72,72,0,1,1,62,167.5l-27.76,8.16a8,8,0,0,1-9.93-9.93Z" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <Path d="M163.94,80.11A72,72,0,0,1,223.5,186l8.16,27.76a8,8,0,0,1-9.93,9.93L194,215.5A72.05,72.05,0,0,1,92.06,175.89" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
  </Svg>
);

export default Chat;
