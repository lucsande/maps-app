import React, { useRef, useEffect, useState } from "react";
import { Animated, Dimensions } from "react-native";
import { Svg, Circle, Rect } from "react-native-svg";
import { colors } from "../assets/colors";

import api from "../services/networking/api";
import { createPanResponder } from "../services/utils/createPanResponder";

// default: 1m = 2px!
// default: user position(the circle) startin middle of screen
// all other objects are put in relation to initial user position,
// converting the difference in latitude-longitude to distance in meters (use formula),
// and then, considering 2px per meter, get object's position on screen

export const MapScreen = ({ initialCoords }) => {
  const [centralCoords, setCentralCoords] = useState({});
  
  useEffect(() => {
    setCentralCoords(initialCoords);
  }, []);

  const screen = Dimensions.get("screen");
  screen["width"] = Math.floor(screen.width);
  screen["height"] = Math.floor(screen.height);
  screen["center"] = {
    x: Math.floor(screen.width / 2),
    y: Math.floor(screen.height / 2),
  };

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = createPanResponder(pan);

  const handlePress = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    console.log("X: ", locationX);
    console.log("Y: ", locationY);
  };

  return (
    <Animated.View
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
      }}
      {...panResponder.panHandlers}
    >
      <Svg
        width={`${screen.width / 2}`}
        height={`${screen.height / 2}`}
        style={{ backgroundColor: "red" }}
      >
        <Circle
          cx={`${screen.center.x / 2}`}
          cy={`${screen.center.y / 2}`}
          r="10"
          stroke={colors.white}
          strokeWidth="1"
        />
      </Svg>
    </Animated.View>
  );
};
