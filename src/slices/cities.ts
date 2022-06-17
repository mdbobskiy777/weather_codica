/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch } from 'src/store';
import { getCoordinatesDataByCityName, getWeatherDataByCoordinates } from 'src/utils/axios';

export type CityInfo = {
  name: string;
  lat: number;
  lon: number;
  country: string;
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
};

type CitiesListState = {
  cities: CityInfo[];
};

const initialState: CitiesListState & {
  status: string;
  error: string | null;
} = {
  status: 'initial',
  error: null,
  cities: [],
};

/* const getCityDataAsync = createAsyncThunk(
  'users/fetchByIdStatus',
  async (cityName: string, thunkAPI) => {
    const response = await getCoordinatesDataByCityName(cityName);
    return response.data;
  }
); */

export const getCityDataAsync = createAsyncThunk(
  'cities/getCityDataAsync',
  async (cityName: string) => {
    const response = await getCoordinatesDataByCityName(cityName);

    return response.data;
  }
);

const slice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    getCityData(state, action: PayloadAction<CityInfo>) {
      state.cities.push(action.payload);
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCityDataAsync.pending, (state: typeof initialState) => {
        state.status = 'loading';
      })
      .addCase(getCityDataAsync.fulfilled, (state: typeof initialState, action: any) => {
        if (action.payload.length === 0) {
          state.status = 'error';
          state.error = 'wrong city name';
        } else {
          state.error = '';
          state.status = 'success';
          state.cities.push(action.payload[0]);
        }
      })
      .addCase(getCityDataAsync.rejected, (state: typeof initialState, action: any) => {
        state.status = 'error';
        state.error = action.error;
      });
  },
});

export const getData = (cityName: string) => async (dispatch: AppDispatch) => {
  const coordinates = await getCoordinatesDataByCityName(`/${cityName}`);
  console.log('coordinates: ', coordinates);
  const data = await getWeatherDataByCoordinates(
    coordinates.data[0].lat,
    coordinates.data[0].lon,
    '&exclude=minutely,daily,alerts,hourly'
  );
  console.log('data: ', data);
  dispatch(slice.actions.getCityData({ ...data, ...coordinates.data[0] }));
};

export const setStatus = (status: string) => (dispatch: AppDispatch) => {
  dispatch(slice.actions.setStatus(status));
};

export const { reducer } = slice;

export default slice;
