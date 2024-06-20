// assets/icons/CaretLeft.tsx
import React from 'react';
import Svg, { Polyline } from 'react-native-svg';

const CaretLeft = ({ size = 24, color = 'currentColor' }) => (
  <Svg viewBox="0 0 256 256" width={size} height={size} fill="none">
    <Polyline
      points="160 208 80 128 160 48"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
  </Svg>
);

export default CaretLeft;
