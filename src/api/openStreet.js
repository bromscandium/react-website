export const getOSMTileUrl = (z, x, y) => {
  return `https://{s}.basemaps.cartocdn.com/dark_all/${z}/${x}/${y}.png`;
};
