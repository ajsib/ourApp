// assets/icons/Ruler.tsx
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View, ViewStyle } from 'react-native';

type RulerProps = {
  size?: number;
  color?: string;
  style?: ViewStyle;
  isVisible?: boolean;
};

const Ruler = ({ size = 24, color = 'currentColor', style, isVisible = true }: RulerProps) => (
  <View style={[style, { width: size, height: size / 5, overflow: 'hidden' }]}>
    {isVisible && (
      <Svg viewBox="0 0 960 194" width={size} height={size/5} fill="none" style={style}>
        <Path d="M0 0v72" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <Path d="M48 0v72" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M96 0v72" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M144 0v72" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M192 0v72" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M240 0v72" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M288 0v72" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M336 0v72" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M384 0v72" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M432 0v72" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M480 0v72" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M528 0v72" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M576 0v72" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M624 0v72" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M672 0v72" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M720 0v72" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M768 0v72" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M816 0v72" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M864 0v72" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M912 0v72" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M960 0v72" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <Path d="M0 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M24 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M48 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M72 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M96 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M120 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M144 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M168 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M192 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M216 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M240 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M264 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M288 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M312 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M336 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M360 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M384 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M408 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M432 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M456 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M480 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M504 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M528 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M552 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M576 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M600 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M624 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M648 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M672 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M696 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M720 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M744 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M768 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M792 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M816 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M840 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M864 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M888 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M912 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M936 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M960 0v32" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M0 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M12 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M24 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M36 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M48 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M60 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M72 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M84 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M96 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M108 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M120 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M132 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M144 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M156 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M168 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M180 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M192 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M204 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M216 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M228 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M240 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M252 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M264 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M276 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M288 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M300 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M312 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M324 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M336 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M348 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M360 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M372 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M384 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M396 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M408 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M420 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M432 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M444 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M456 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M468 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M480 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M492 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M504 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M516 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M528 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M540 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M552 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M564 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M576 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M588 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M600 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M612 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M624 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M636 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M648 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M660 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M672 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M684 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M696 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M708 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M720 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M732 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M744 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M756 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M768 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M780 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M792 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M804 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M816 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M828 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M840 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M852 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M864 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M876 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M888 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M900 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M912 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" /> 
        <Path d="M924 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M936 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M948 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        <Path d="M960 0v18" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
      </Svg>
    )}
</View>
);

export default Ruler;
