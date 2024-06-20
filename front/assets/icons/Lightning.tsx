import React from 'react';
import Svg, { Rect, Polygon, Path } from 'react-native-svg';

const Lightning = ({ size = 24, color = 'currentColor', isON = false }) => (
  <Svg viewBox="0 0 256 256" width={size} height={size} fill="none">
    <Rect width="256" height="256" fill="none" />
    {isON ? (
      <Path
        d="M213.85,125.46l-112,120a8,8,0,0,1-13.69-7l14.66-73.33L45.19,143.49a8,8,0,0,1-3-13l112-120a8,8,0,0,1,13.69,7L153.18,90.9l57.63,21.61a8,8,0,0,1,3,12.95Z"
        fill={color}
      />
    ) : (
      <Polygon
        points="160 16 144 96 208 120 96 240 112 160 48 136 160 16"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    )}
  </Svg>
);

export default Lightning;
