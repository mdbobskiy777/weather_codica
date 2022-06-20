import { interpolateTemperatureToColor } from '../../heplers';
import { MAX_COLOR, MIN_COLOR } from '../../constants';

export default {
  mainBoxStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '10px',
  },
  cityTextStyle: { fontSize: '48px', color: 'black' },
  countryTextStyle: { fontSize: '24px', color: 'gray' },
  dateTextStyle: { fontSize: '16px', color: 'black' },
  temperatureTextStyle: { fontSize: '60px', color: 'gray' },
  extraInfoTextStyle: { fontSize: '18px', color: 'gray' },
  mainWeatherTextStyle: { fontSize: '32px', color: 'black' },
  weatherTextStyle: { fontSize: '24px', color: 'gray' },
  nameBoxStyle: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  extraInfoBoxStyle: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    margin: '10px 10px',
  },
  imageBoxStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  listStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  temperatureBoxStyle: (temp: number) => ({
    backgroundColor: `rgb(
  ${interpolateTemperatureToColor(temp, MAX_COLOR[0], MIN_COLOR[0])},
  ${interpolateTemperatureToColor(temp, MAX_COLOR[1], MIN_COLOR[1])},
  ${interpolateTemperatureToColor(temp, MAX_COLOR[2], MIN_COLOR[2])})`,
    padding: '4px 10px',
    marginTop: `${50 - temp}px`,
    textAlign: 'center',
  }),
  listItemStyle: {
    padding: '0',
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100px',
  },
  temperatureBoxContainerStyle: {
    height: '100px',
    margin: '0',
    padding: '0',
    width: '100%',
  },
};
