import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../assets/styles";

export const WelcomeScreen = ({ initialCoords }) => {
  const displayCoords = () => {
    const { latitude, longitude } = initialCoords;
    if (latitude) {
      return `lat ${latitude.toFixed(5)}, long: ${longitude.toFixed(5)}`;
    }

    return "";
  };

  return (
    <>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Bem-vindo</Text>
      </View>

      <Text style={styles.coords}>{displayCoords()}</Text>

      <View style={styles.dotContainer}>
        <Text style={styles.dot}>.</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.5}
      >
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </>
  );
};
