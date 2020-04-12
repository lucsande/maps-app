import { useRef } from "react";
import { PanResponder, Animated } from "react-native";

export const createPanResponder = (pan, centralCoords, setCentralCoords) => {
    return useRef(
        PanResponder.create({
          // Ask to be the responder:
          onStartShouldSetPanResponder: (evt, gestureState) => true,
          onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    
          onPanResponderGrant: (evt, gestureState) => {
            // gesture has started. 
            // store the object's initial position in the offset
            // pan.setOffset({
            //   x: pan.x._value,
            //   y: pan.y._value,
            // });
          },
          onPanResponderMove: (evt, gestureState) => {
            // make pan equal to gesture's delta of movement
            // object's position will be the offset(its original position) + pan(gesture's delta)
            
            const evtOption = {useNativeDriver: false}
            // ([{x: pan.x}]) creates a mapping, saying pan.x will be further refered to as x
            // ({x: gestureState.dx}) uses the mapping to set value of x(ie: pan.x) = gesture.dx
            Animated.event([{ x: pan.x }], evtOption)({ x: gestureState.dx });
            Animated.event([{ y: pan.y }], evtOption)({ y: gestureState.dy });
          },
          onPanResponderTerminationRequest: (evt, gestureState) => false,
          onPanResponderRelease: (evt, gestureState) => {
            // add offset(original position) to pan(gesture's delta)
            // pan.flattenOffset();
            const evtOption = {useNativeDriver: false}
            Animated.event([{ x: pan.x }], evtOption)({ x: 0 });
            Animated.event([{ y: pan.y }], evtOption)({ y: 0 });

            const {dx, dy} = gestureState
            setCentralCoords({dx, dy})
            console.log(centralCoords)
            console.log(dx, dy)
          },
          onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture should be cancelled
          },
          onShouldBlockNativeResponder: (evt, gestureState) => {
            // Returns whether this component should block native components from becoming the JS
            // responder. Returns true by default. Is currently only supported on android.
            return true;
          },
        })
      ).current;
}