import { useEffect, useState } from 'react';

import { useParams } from 'react-router';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useDispatch, useSelector } from 'src/store';
import { NotFoundCity } from 'src/errors/NotFoundCity';
import { updateCity } from 'src/slices/cities';
import { WeatherImageBox } from 'src/common';
import { showFormattedTemperature } from 'src/heplers';
import { HourlyTemperatureList } from './HourlyTemperatureList';
import {
  cityTextStyle,
  countryTextStyle,
  dateTextStyle,
  extraInfoBoxStyle,
  extraInfoTextStyle,
  imageBoxStyle,
  mainBoxStyle,
  mainWeatherTextStyle,
  nameBoxStyle,
  temperatureTextStyle,
  weatherTextStyle,
} from './styles';

export const CityWeatherDetails = () => {
  const { cityName } = useParams();
  const [loading, setISloading] = useState(false);

  const dispatch = useDispatch();

  const currentCity = useSelector((state) =>
    state.cities.citiesInfo.find((city) => city.name === cityName)
  );

  useEffect(() => {
    if (currentCity) {
      setISloading(true);
      dispatch(updateCity(currentCity.name, 'hourly')).then(() => {
        setISloading(false);
      });
    }
  }, []);

  return (
    <Box>
      {currentCity ? (
        <Box>
          <Box sx={mainBoxStyle}>
            <Box>
              <Box sx={nameBoxStyle}>
                <Typography sx={cityTextStyle}>{currentCity.name}</Typography>
                <Typography sx={countryTextStyle}>{currentCity.country}</Typography>
                <Typography sx={dateTextStyle}>
                  {new Date(currentCity.current.dt * 1000).toLocaleString()}
                </Typography>
              </Box>
              <Box sx={extraInfoBoxStyle}>
                <Typography sx={extraInfoTextStyle}>
                  {`Feels like: ${showFormattedTemperature(currentCity.current.feels_like)}℃`}
                </Typography>
                <Typography
                  sx={extraInfoTextStyle}
                >{`Ultra Violet Radiation: ${currentCity.current.uvi}`}</Typography>
                <Typography
                  sx={extraInfoTextStyle}
                >{`Clouds: ${currentCity.current.clouds}`}</Typography>
                <Typography
                  sx={extraInfoTextStyle}
                >{`Visibility: ${currentCity.current.visibility}`}</Typography>
                <Typography
                  sx={extraInfoTextStyle}
                >{`Wind Speed: ${currentCity.current.wind_speed}`}</Typography>
                <Typography
                  sx={extraInfoTextStyle}
                >{`Wind Direction Degree : ${currentCity.current.wind_deg}°`}</Typography>
              </Box>
            </Box>
            <Box sx={imageBoxStyle}>
              <Typography sx={temperatureTextStyle}>
                {showFormattedTemperature(currentCity.current.temp)}℃
              </Typography>
              <Box>
                <WeatherImageBox icon={`${currentCity.current.weather[0].icon}@4x`} />
              </Box>
              <Typography sx={mainWeatherTextStyle}>
                {currentCity.current.weather[0].main}
              </Typography>
              <Typography sx={weatherTextStyle}>
                ({currentCity.current.weather[0].description})
              </Typography>
            </Box>
          </Box>
          <Box>
            {currentCity.hourly && (
              <HourlyTemperatureList currentCity={currentCity} loading={loading} />
            )}
          </Box>
        </Box>
      ) : (
        <NotFoundCity />
      )}
    </Box>
  );
};
