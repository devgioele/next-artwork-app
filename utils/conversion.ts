export const boolToStr = (value: boolean): string => (value ? "yes" : "no");

export const toGps = (lat: number, lon: number, precision: number) =>
  (lat && lon && `${round(lat, precision)},${round(lon, precision)}`) || "";

export const round = (x: number, decimals: number) =>
  Math.round(x * 10 ** decimals) / 10 ** decimals;
