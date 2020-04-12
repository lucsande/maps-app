import { Animated, Dimensions } from "react-native";

export const getSvgArea = () => {
  const screen = Dimensions.get("screen");
  const svgWidth = Math.floor(screen.width) * 2;
  const svgHeight = Math.floor(screen.height) * 2;

  return {
    width: svgWidth,
    height: svgHeight,
    center: {
      x: Math.floor(svgWidth / 2),
      y: Math.floor(svgHeight / 2),
    },
  };
};
