import { useEffect } from 'react';

import { useParams } from 'react-router';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { useDispatch, useSelector } from 'src/store';
import { NotFoundCity } from 'src/errors/NotFoundCity';
import { updateCity } from 'src/slices/cities';

export const CityWeatherDetails = () => {
  const { cityName } = useParams();

  const dispatch = useDispatch();

  const currentCity = useSelector((state) =>
    state.cities.cities.find((city) => city.name === cityName)
  );

  useEffect(() => {
    if (currentCity) dispatch(updateCity(currentCity.name, 'hourly'));
  }, []);

  return (
    <div>
      <div>CityWeatherDetails</div>
      <div>
        {currentCity ? (
          <div>
            <div>{`name: ${currentCity.name}`}</div>
            <div>{`country: ${currentCity.country}`}</div>
            <div>{`timezone: ${currentCity.timezone}`}</div>
            <div>{`timezone_offset: ${currentCity.timezone_offset}`}</div>
            <div>{`dt: ${currentCity.current.dt}`}</div>
            <div>{`sunrise: ${currentCity.current.sunrise}`}</div>
            <div>{`sunset: ${currentCity.current.sunset}`}</div>
            <div>{`temperature: ${currentCity.current.temp}`}</div>
            <div>{`feels_like: ${currentCity.current.feels_like}`}</div>
            <div>{`pressure: ${currentCity.current.pressure}`}</div>
            <div>{`humidity: ${currentCity.current.humidity}`}</div>
            <div>{`dew_point: ${currentCity.current.dew_point}`}</div>
            <div>{`uvi: ${currentCity.current.uvi}`}</div>
            <div>{`clouds: ${currentCity.current.clouds}`}</div>
            <div>{`visibility: ${currentCity.current.visibility}`}</div>
            <div>{`wind_speed: ${currentCity.current.wind_speed}`}</div>
            <div>{`wind_deg: ${currentCity.current.wind_deg}`}</div>
            <div>{`weather main:: ${currentCity.current.weather[0].main}`}</div>
            <div>{`weather description:: ${currentCity.current.weather[0].description}`}</div>
            <div>{`weather icon:: ${currentCity.current.weather[0].icon}`}</div>
            <div>
              {currentCity.hourly && (
                <List>
                  {currentCity.hourly.map((hour) => (
                    <ListItem key={hour.dt}>
                      <div>{`dt: ${hour.dt}`}</div>
                      <div>{`temperature: ${hour.temp}`}</div>
                      <div>{`feels_like: ${hour.feels_like}`}</div>
                    </ListItem>
                  ))}
                </List>
              )}
            </div>
          </div>
        ) : (
          <NotFoundCity />
        )}
      </div>
    </div>
  );
};
