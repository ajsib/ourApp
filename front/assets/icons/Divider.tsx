// assets/icons/Divider.tsx
import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { ViewStyle } from 'react-native';

type DividerProps = {
  size?: number;
  color?: string;
  style?: ViewStyle;
};

const Divider = ({ size = 1496, color = 'currentColor', style }: DividerProps) => (
  <Svg
    viewBox="0 0 1496 270"
    width={size}
    height={(size / 1496) * 270} // maintain aspect ratio
    fill="none"
    style={style}
  >
    <G transform="translate(0 270) scale(.1 -.1)" fill={color}>
      <Path d="M691 1586c-146-78-266-147-268-153-4-12 493-288 518-288 15 0 237 236 259 275 6 12-21 53-104 160-62 80-119 146-127 147-7 1-133-62-278-141zm364-17c48-60 85-112 83-115-3-2-141-3-307-2l-301 3 207 112c115 61 213 112 220 112 6 1 51-49 98-110zm83-158c-1-5-47-59-101-119l-99-111-61 35c-34 19-126 69-205 112l-142 77 277 5c153 3 291 6 306 8 16 1 27-2 25-7z" />
      <Path d="M13860 1583c-58-75-109-144-114-154-7-14 15-45 114-156 68-76 128-141 134-144 17-10 527 273 524 290-3 12-528 301-546 301-4 0-54-62-112-137zm339-25 210-113-155-3c-85-1-222-1-303 0l-148 3 86 112c47 62 89 112 93 113 5 0 102-51 217-112zm220-162c-6-6-407-226-411-226-6 0-198 218-198 224 0 3 138 6 307 6 168 0 304-2 302-4z" />
      <Path d="M7315 1550l-130-130 265-265 265 265-130 130c-71 71-132 130-135 130s-64-59-135-130z" />
      <Path d="M1787 1533l-67-68-213-5-212-5-3-29c-2-16 2-32 10-37 7-5 103-9 213-9h200l72-72 73-72 73 72 72 72h165 165l72-72 73-72 73 72 72 72h1701 1700l69-70c38-38 74-70 80-70s42 31 80 70l69 70h367c395 0 395 0 387 52l-3 23-382 5-383 5-134 134-72-69-72-70h-1702-1702l-74 72-74 71-74-71-74-72h-162-162l-72 70c-40 39-74 70-77 70-2 0-35-30-72-67z" />
      <Path d="M8707 1532l-67-67-388-5-387-5-3-29c-2-16 2-32 10-37 7-5 181-9 387-9h373l74-72 75-72 144 144h1761 1760l138-140 71 70 70 70h169 168l144-140 138 140h142c152 0 169 5 162 52-3 23-6 23-155 28l-153 5-70 70-70 69-73-72-72-72h-161-160l-69 70c-38 38-74 70-80 70s-42-31-80-70l-69-70h-1759-1759l-72 70-72 69-67-67z" />
    </G>
  </Svg>
);

export default Divider;
