import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";

import { WelcomeScreen } from "./screens/WelcomeScreen";
import { MapScreen } from "./screens/MapScreen";

import { styles } from "./assets/styles";
import { colors } from "./assets/colors";
import { updateCoordsState } from "./services/utils/geolocation";

export default function App() {
  const [initialCoords, setInitialCoords] = useState({});

  useEffect(() => {
    updateCoordsState(initialCoords, setInitialCoords);
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
      <SafeAreaView style={styles.container}>
        {/* <WelcomeScreen initialCoords={initialCoords} /> */}

        <MapScreen initialCoords={initialCoords} />
      </SafeAreaView>
    </>
  );
}
