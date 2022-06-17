import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch } from 'src/store';
import { geCoordinatesDataByCityName, getWeatherDataByCoordinates } from '@/utils/axios';

export type CityInfo = {
  'lat': number,
  'lon': number,
  'timezone': string,
  'timezone_offset': number,
  'current': {
    'dt': number,
    'sunrise': number,
    'sunset': number,
    'temp': number,
    'feels_like': number,
    'pressure': number,
    'humidity': number,
    'dew_point': number,
    'uvi': number,
    'clouds': number,
    'visibility': number,
    'wind_speed': number,
    'wind_deg': number,
    'weather': [
      {
        'id': number,
        'main': string,
        'description': string,
        'icon': string,
      }
    ]
  }
};

type CitiesListState = {
  cities: CityInfo[],
};

const initialState: CitiesListState = {
  cities: [],
};

const slice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    getCityData(state, action: PayloadAction<CityInfo>) {
      state.cities.push(action.payload);
    },
  },
});

export const getData = (cityName: string) => async (dispatch: AppDispatch) => {
  const coordinates = await geCoordinatesDataByCityName(`/${cityName}`);

  const data = await getWeatherDataByCoordinates(coordinates.data.lat, coordinates.data.lon, '&exclude=minutely,daily,alerts,hourly')
    .then((res) => res.data);

  dispatch(slice.actions.getCityData({ ...data, ...coordinates.data }));
};

export const { reducer } = slice;

export default slice;
