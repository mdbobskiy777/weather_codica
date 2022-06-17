import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { CityDetails } from 'src/slices/city';
import { CityInfo } from 'src/slices/cities';

type GeocodingData = { name: string; lat: number; lon: number; country: string };

type GeogeocodingResponse = GeocodingData[];

type WheatherResponseTernarType<T> = T extends string ? CityInfo : CityDetails;

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
    `/direct?q=${cityName}&appid=49e554f6956b3cc8ebe95b6374266b87`
  );
/* .then((res) => res.data[0]); */

export const getWeatherDataByCoordinates = async (
  lat: number,
  lon: number,
  filters?: string | undefined
) => {
  type WheatherResponse = WheatherResponseTernarType<typeof filters>;

  return wheatherAPIInstance
    .get<WheatherResponse>(
      `/onecall?lat=${lat}&lon=${lon}${filters},hourly&appid=49e554f6956b3cc8ebe95b6374266b87`
    )
    .then((res) => res.data);
};
