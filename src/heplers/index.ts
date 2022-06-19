const scale = (number: number, inMin: number, inMax: number, outMin: number, outMax: number) =>
  ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

export const interpolateTemperatureToColor = (temperature: number, max: number, min: number) =>
  scale(temperature, 0, 30, 0, 1) * max + (1 - scale(temperature, 0, 30, 0, 1)) * min;

export const showFormattedTemperature = (temp: number) =>
  Math.sign(temp) === 1 ? `+${Math.floor(temp)}` : `-${Math.floor(temp)}`;
