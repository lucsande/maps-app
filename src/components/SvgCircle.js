import React, { useState, useEffect } from "react";
import { Circle } from "react-native-svg";

import { colors } from "../assets/colors";
import { deltaXandY, hasCoords } from "../services/utils/geolocation";

export const SvgCircle = (props) => {
  const { svgArea, centralCoords, elementCoords } = props;
  const [position, setPosition] = useState({});

  useEffect(() => {
    if (hasCoords(centralCoords)) {
      const deltas = deltaXandY(centralCoords, elementCoords);
      const x = svgArea.center.x + deltas.dx;
      const y = svgArea.center.y + deltas.dy;

      setPosition({ ...position, x, y });
    }
  }, [centralCoords]);

  return (
    <Circle
      cx={`${position.x || 0}`}
      cy={`${position.y || 0}`}
      r="5"
      stroke={colors.white}
      strokeWidth="1"
    />
  );
};
