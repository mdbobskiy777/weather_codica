import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { CityDetails } from 'src/slices/city';
import { CityInfo } from '@/slices/cities';

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

export const geCoordinatesDataByCityName = async (cityName: string) =>
  geocodingAPIInstance.get<{ name: string; lat: number; lon: number; country: string }>(
    `/1.0/direct?q=${cityName}&appid=49e554f6956b3cc8ebe95b6374266b87`
  );

export const getWeatherDataByCoordinates = async (
  lat: number,
  lon: number,
  filters?: string | undefined
) => {
  type ResponseTernarType<T> = T extends string ? CityInfo : CityDetails;

  type Response = ResponseTernarType<typeof filters>;

  return wheatherAPIInstance.get<Response>(
    `/onecall?lat=${lat}&lon=${lon}${filters},hourly&appid=49e554f6956b3cc8ebe95b6374266b87`
  );
};
