import React, { useState, useEffect } from "react";
import api from "./services/api";

import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [repos, setRepos] = useState([]);
  const [reposLikes, setReposLikes] = useState({});

  useEffect(() => {}, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#243E56" />
      <SafeAreaView style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Bem-vindo</Text>
        </View>

        <TouchableOpacity style={styles.button} activeOpacity={.5}>
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
    marginBottom: 50,
    color: "#fff",
  },
  button: {
    marginBottom: 100,
    width: 300
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
