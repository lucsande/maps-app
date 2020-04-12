import Geolocation from "@react-native-community/geolocation";

// converts number in degrees to radians
const toRad = (num) => (num * Math.PI) / 180;

// converts number in radians to degrees
const toDeg = (radian) => (radian * 180) / Math.PI;

const earthRadius = 6378000; // in meters

export const hasCoords = (coords) => {
  if (coords.latitude && coords.longitude) return true;

  return false;
};

export const updateCoordsState = (initialCoords, setCoordsState) => {
  Geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;

    setCoordsState({ ...initialCoords, latitude, longitude });
  });
};

// MUST BE TESTED!!!!!
export const haversineDist = (coord1, coord2) => {
  const lat1 = coord1.latitude;
  const lon1 = coord1.longitude;
  const lat2 = coord2.latitude;
  const lon2 = coord2.longitude;

  const dLatInDegrees = lat2 - lat1;
  const dLat = toRad(dLatInDegrees);
  const dLonInDegrees = lon2 - lon1;
  const dLon = toRad(dLonInDegrees);

  // a is the square of half the chord length between the points
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  // angular distance in radians
  const angularDist = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const dist = earthRadius * angularDist;

  return dist;
};

// MUST BE TESTED!!!!!
export const bearingInDeg = (coord1, coord2) => {
  const lat1 = toRad(coord1.latitude);
  const lon1 = toRad(coord1.longitude);
  const lat2 = toRad(coord2.latitude);
  const lon2 = toRad(coord2.longitude);

  const a = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const b =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);

  const bearing = toDeg(Math.atan2(a, b));

  return bearing;
};

// MUST BE TESTED!!!!!
export const deltaXandY = (coord1, coord2) => {
  dist = haversineDist(coord1, coord2);
  bearing = bearingInDeg(coord1, coord2);

  dx = Math.cos(toRad(bearing % 90)) * dist;
  dy = Math.sin(toRad(bearing % 90)) * dist;

  return { dx, dy };
};

// using the movement deltas, find bearing in radians
export const bearingInRadFromDeltas = (dx, dy) => {
  // get bearing in radians, considering movement happens in first trigonometry quadrant
  let bearing = Math.atan(dx / dy);
  // convert to second quadrant
  if (dx < 0 && dy >= 0) bearing = toRad(360) - bearing;
  // convert to third quadrant
  if (dx < 0 && dy < 0) bearing += toRad(180);
  // convert to fourth quadrant
  if (dx >= 0 && dy < 0) bearing = toRad(180) - bearing;

  return bearing;
};

// TESTED!!!!!
// finds coords for a destination point, knowing start point and delta x and delta y
export const destPoint = (coord1, dx, dy) => {
  const lat1 = toRad(coord1.latitude);
  const lon1 = toRad(coord1.longitude);

  // the sum of the squares of the catheti is equal to the square of the hypotenuse
  const dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

  const bearing = bearingInRadFromDeltas(dx, dy);

  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(dist / earthRadius) +
      Math.cos(lat1) * Math.sin(dist / earthRadius) * Math.cos(bearing)
  );
  const lon2 =
    lon1 +
    Math.atan2(
      Math.sin(bearing) * Math.sin(dist / earthRadius) * Math.cos(lat1),
      Math.cos(dist / earthRadius) - Math.sin(lat1) * Math.sin(lat2)
    );

  return { latitude: toDeg(lat2), longitude: toDeg(lon2) };
};

// credits for a great part of this calculations goes to https://www.movable-type.co.uk/scripts/latlong.html
