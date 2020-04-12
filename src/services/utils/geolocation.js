import Geolocation from "@react-native-community/geolocation";

export const updateCoordsState = (initialCoords, setCoordsState) => {
  Geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    setCoordsState({ ...initialCoords, latitude, longitude });
  });
};

// converts number in degrees to radians
export const toRad = (num) => (num * Math.PI) / 180;

// converts number in radians to degrees
export const toDeg = (radian) => (radian * 180) / Math.PI;

export const haversineDist = (coord1, coord2) => {
  const earthRadius = 6371; // km
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

  // c is the angular distance in radians
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distInKm = earthRadius * c;
  const dist = distInKm * 1000;

  return dist;
};

export const bearing = (coord1, coord2) => {
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

export const deltaXandY = (coord1, coord2) => {
  dist = haversineDist(coord1, coord2);
  bearing = bearing(coord1, coord2);

  dx = Math.cos(bearing % 90) * dist;
  dy = Math.sin(bearing % 90) * dist;

  return { dx, dy };
};

export const destPoint = (dx, dy) => {
  // the sum of the squares of the catheti is equal to the square of the hypotenuse
  const dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

  // bearing = ????

  
  // https://www.movable-type.co.uk/scripts/latlong.html
  var φ2 = Math.asin(
    Math.sin(φ1) * Math.cos(d / R) +
      Math.cos(φ1) * Math.sin(d / R) * Math.cos(brng)
  );
  var λ2 =
    λ1 +
    Math.atan2(
      Math.sin(brng) * Math.sin(d / R) * Math.cos(φ1),
      Math.cos(d / R) - Math.sin(φ1) * Math.sin(φ2)
    );

    // where	φ is latitude, λ is longitude, θ is the bearing (clockwise from north),
    // δ is the angular distance d/R; d being the distance travelled, R the earth’s radius

    // The longitude can be normalised to −180…+180 using (lon+540)%360-180

    // For final bearing, simply take the initial bearing from the end point to the start point 
    // and reverse it with (brng+180)%360.
};
