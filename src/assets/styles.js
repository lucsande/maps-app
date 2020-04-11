import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
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
    color: colors.white,
  },
  coords: {
    color: colors.white,
    fontSize: 16,
    marginTop: 100,
  },
  dotContainer: {
    height: 1,
    width: 5000,
    borderTopColor: colors.white,
    borderTopWidth: 1,
    marginTop: 30,
    textAlign: "center",
    marginBottom: 50,
  },
  dot: {
    textAlign: "center",
    fontSize: 100,
    top: -100,
    color: colors.white,
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
    color: colors.blue,
    backgroundColor: colors.white,
    padding: 15,
    textAlign: "center",
  },
});
