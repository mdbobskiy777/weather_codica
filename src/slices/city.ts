import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { geCoordinatesDataByCityName, getWeatherDataByCoordinates } from 'src/utils/axios';

import { AppDispatch } from 'src/store';

export type CityDetails = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
  };
  hourly?: [
    {
      dt: number;
      temp: number;
      feels_like: number;
      pressure: number;
      humidity: number;
      dew_point: number;
      uvi: number;
      clouds: number;
      visibility: number;
      wind_speed: number;
      wind_deg: number;
      wind_gust: number;
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        }
      ];
      pop: number;
    }
  ];
};

type FullCityDetails = CityDetails & { name: string; lat: number; lon: number; country: string };

const initialState: FullCityDetails = {
  name: '',
  country: '',
  lat: 0,
  lon: 0,
  timezone: '',
  timezone_offset: 0,
  current: {
    dt: 0,
    sunrise: 0,
    sunset: 0,
    temp: 0,
    feels_like: 0,
    pressure: 0,
    humidity: 0,
    dew_point: 0,
    uvi: 0,
    clouds: 0,
    visibility: 0,
    wind_speed: 0,
    wind_deg: 0,
    weather: [
      {
        id: 0,
        main: '',
        description: '',
        icon: '',
      },
    ],
  },
  hourly: [
    {
      dt: 0,
      temp: 0,
      feels_like: 0,
      pressure: 0,
      humidity: 0,
      dew_point: 0,
      uvi: 0,
      clouds: 0,
      visibility: 0,
      wind_speed: 0,
      wind_deg: 0,
      wind_gust: 0,
      weather: [
        {
          id: 0,
          main: '',
          description: '',
          icon: '',
        },
      ],
      pop: 0,
    },
  ],
};

const slice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    getCityData(state, action: PayloadAction<FullCityDetails>) {
      // eslint-disable-next-line no-param-reassign
      state = { ...action.payload };
    },
  },
});

export const getData = (cityName: string) => async (dispatch: AppDispatch) => {
  const coordinates = await geCoordinatesDataByCityName(`/${cityName}`);

  const data = await getWeatherDataByCoordinates(coordinates.data.lat, coordinates.data.lon).then(
    (res) => res.data
  );

  dispatch(slice.actions.getCityData({ ...data, ...coordinates.data }));
};

export const { reducer } = slice;

export default slice;
