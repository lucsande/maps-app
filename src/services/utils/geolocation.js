import Geolocation from "@react-native-community/geolocation";

export const updateCoordsState = (initialCoords, setCoordsState) => {
  Geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    setCoordsState({...initialCoords, latitude, longitude });
  });
};
