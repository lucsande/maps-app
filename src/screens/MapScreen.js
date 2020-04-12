import React, { useRef, useEffect, useState } from "react";
import { Animated } from "react-native";
import { Svg, Circle, Rect } from "react-native-svg";

import { colors } from "../assets/colors";
import { SvgCircle } from "../components/SvgCircle";

import api from "../services/networking/api";
import { getSvgArea } from "../services/utils/svgDrawing";
import { createPanResponder } from "../services/utils/createPanResponder";

// default: 1m = 1px!
// default: user position(the circle) starts in the middle of the screen

// all other objects are put in relation to centralCoord, which should always be in the middle of the screen.
// convert the difference in latitude-longitude to distance in meters (use haversine formula),
// and then, considering 1px per meter, get object's position on screen relatice to centralCoord

export const MapScreen = ({ initialCoords }) => {
  const [centralCoords, setCentralCoords] = useState({});
  const [userCoords, setUserCoords] = useState({});

  useEffect(() => {
    setCentralCoords({...initialCoords});
    setUserCoords(initialCoords);
  }, []);
  
  const svgArea = getSvgArea();
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = createPanResponder(pan, centralCoords, setCentralCoords);

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
        width={`${svgArea.width}`}
        height={`${svgArea.height}`}
        style={{ backgroundColor: colors.blue }}
      >
        <SvgCircle
          svgArea={svgArea}
          elementCoords={userCoords}
          centralCoords={centralCoords}
        />
      </Svg>
    </Animated.View>
  );
};
