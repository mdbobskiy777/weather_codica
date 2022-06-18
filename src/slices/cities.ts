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
      pop: 0;
    }
  ];
};

type CitiesListState = {
  citiesInfo: CityInfo[];
};
export type Error = {
  message: string;
};
type State = CitiesListState & {
  status: string;
  error: Error;
};

const initialState: State = {
  status: 'initial',
  error: {
    message: '',
  },
  citiesInfo: [],
};

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
    addCity(state, action: PayloadAction<CityInfo>) {
      state.citiesInfo = state.citiesInfo.find((city) => city.name === action.payload.name)
        ? state.citiesInfo
        : state.citiesInfo.concat(action.payload);
    },
    deleteCity(state, action: PayloadAction<string>) {
      state.citiesInfo = state.citiesInfo.filter((city) => city.name !== action.payload);
    },
    updateCity(state, action: PayloadAction<CityInfo>) {
      state.citiesInfo[state.citiesInfo.findIndex((city) => city.name === action.payload.name)] =
        action.payload;
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCityDataAsync.pending, (state: State) => {
        state.status = 'loading';
      })
      .addCase(getCityDataAsync.fulfilled, (state: State, action: any) => {
        if (action.payload.length === 0) {
          state.status = 'error';
          state.error.message = 'wrong city name';
        } else {
          state.error.message = '';
          state.status = 'success';
        }
      })
      .addCase(getCityDataAsync.rejected, (state: State, action: any) => {
        state.status = 'error';
        state.error = action.error;
      });
  },
});

export const addCity = (cityName: string) => async (dispatch: AppDispatch) => {
  const coordinates = await dispatch(getCityDataAsync(cityName)).unwrap();

  const data = await getWeatherDataByCoordinates(coordinates[0].lat, coordinates[0].lon);

  dispatch(slice.actions.addCity({ ...data, ...coordinates[0] }));
};

export const deleteCity = (cityName: string) => (dispatch: AppDispatch) => {
  dispatch(slice.actions.deleteCity(cityName));
};

export const updateCity =
  (cityName: string, addParam?: string) => async (dispatch: AppDispatch) => {
    const coordinates = await dispatch(getCityDataAsync(cityName)).unwrap();

    const data = await getWeatherDataByCoordinates(
      coordinates[0].lat,
      coordinates[0].lon,
      addParam
    );

    dispatch(slice.actions.updateCity({ ...data, ...coordinates[0] }));
  };

export const setStatus = (status: string) => (dispatch: AppDispatch) => {
  dispatch(slice.actions.setStatus(status));
};

export const { reducer } = slice;

export default slice;
