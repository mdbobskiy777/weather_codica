import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { CityInfo } from 'src/slices/cities';

type GeocodingData = { name: string; lat: number; lon: number; country: string };

type GeogeocodingResponse = GeocodingData[];

const geocodingAPIInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/geo/1.0/',
});

const wheatherAPIInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});

geocodingAPIInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

wheatherAPIInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export const getCoordinatesDataByCityName = async (cityName: string) =>
  geocodingAPIInstance.get<GeogeocodingResponse>(
    `/direct?q=${cityName}&appid=bb55fa38420cf04db8d9a7af31c60b5c`
  );
/* .then((res) => res.data[0]); */

export const getWeatherDataByCoordinates = async (lat: number, lon: number, addParam = '') => {
  return wheatherAPIInstance
    .get<CityInfo>(
      `/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,daily,alerts&units=metric&appid=bb55fa38420cf04db8d9a7af31c60b5c`.replace(
        addParam,
        ''
      )
    )
    .then((res) => res.data);
};
