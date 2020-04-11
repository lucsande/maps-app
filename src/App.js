import React, { useState, useEffect } from "react";
import api from "./services/api";
import Geolocation from "@react-native-community/geolocation";
import { Svg, Rect } from "react-native-svg";

import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [pos, setPos] = useState({});

  const handlePress = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    console.log("X: ", locationX);
    console.log("Y: ", locationY);
  };

  useEffect(() => {
    Geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setPos({ latitude, longitude });
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#243E56" />
      <SafeAreaView style={styles.container}>
        <Svg width="2000" height="60">
          <Rect
            x="0"
            y="0"
            width="2000"
            height="60"
            fill="rgb(0,0,255)"
            strokeWidth="3"
            stroke="rgb(0,0,0)"
            onPress={(event) => handlePress(event)}
          />
        </Svg>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Bem-vindo</Text>
        </View>

        <Text style={styles.coords}>
          lat: {pos.latitude.toFixed(5)}, long: {pos.longitude.toFixed(5)}
        </Text>
        <View style={styles.dotContainer}>
          <Text style={styles.dot}>.</Text>
        </View>

        <TouchableOpacity style={styles.button} activeOpacity={0.5}>
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#243E56",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 50,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  coords: {
    color: "#fff",
    fontSize: 16,
    marginTop: 100,
  },
  dotContainer: {
    height: 1,
    width: 5000,
    borderTopColor: "#fff",
    borderTopWidth: 1,
    marginTop: 30,
    textAlign: "center",
    marginBottom: 50,
  },
  dot: {
    textAlign: "center",
    fontSize: 100,
    top: -100,
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
    marginBottom: 100,
    width: 300,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#243E56",
    backgroundColor: "#fff",
    padding: 15,
    textAlign: "center",
  },
});
