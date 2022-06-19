import { interpolateTemperatureToColor } from '../../heplers';
import { MAX_COLOR, MIN_COLOR } from '../../constants';

export const mainBoxStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '10px',
};

export const cityTextStyle = { fontSize: '48px', color: 'black' };

export const countryTextStyle = { fontSize: '24px', color: 'gray' };

export const dateTextStyle = { fontSize: '16px', color: 'black' };

export const temperatureTextStyle = { fontSize: '60px', color: 'gray' };

export const extraInfoTextStyle = { fontSize: '18px', color: 'gray' };

export const mainWeatherTextStyle = { fontSize: '32px', color: 'black' };

export const weatherTextStyle = { fontSize: '24px', color: 'gray' };

export const nameBoxStyle = {
  display: 'flex',
  alignItems: 'flex-end',
  flexDirection: 'column',
};

export const extraInfoBoxStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  margin: '10px 10px',
};

export const imageBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

export const listStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
};

export const temperatureBoxStyle = (temp: number) => ({
  backgroundColor: `rgb(
  ${interpolateTemperatureToColor(temp, MAX_COLOR[0], MIN_COLOR[0])},
  ${interpolateTemperatureToColor(temp, MAX_COLOR[1], MIN_COLOR[1])},
  ${interpolateTemperatureToColor(temp, MAX_COLOR[2], MIN_COLOR[2])})`,
  padding: '4px 10px',
  marginTop: `${50 - temp}px`,
});

export const listItemStyle = {
  padding: '0',
  margin: '0',
  display: 'flex',
  flexDirection: 'column',
};

export const temperatureBoxContainerStyle = {
  height: '100px',
  margin: '0',
  padding: '0',
  width: '100%',
};
