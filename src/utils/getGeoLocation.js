// UNUSED

import exifr from "exifr";

const getGeoLocation = async (url) => {
  const { latitude, longitude } = await exifr.gps(url);
  return { latitude, longitude };
};

export default getGeoLocation;
