import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';

import { useDispatch, useSelector } from 'src/store';
import { deleteCity, addCity, setStatus, updateCity, setError } from 'src/slices/cities';
import { AddCityDialog } from './AddCityDialog';
import { CitiesList } from './CitiesList';
import { cityListBoxStyle } from './styles';

export const CitiesListOverview = () => {
  const [cityName, setCityName] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  const [refreshLoading, setRefreshLoading] = useState(false);
  const [updatingCity, setUpdatingCity] = useState('');

  const { status, error, citiesInfo } = useSelector((state) => state.cities);
  const dispatch = useDispatch();

  const refreshData = useCallback(() => {
    setRefreshLoading(true);
    Promise.all(
      citiesInfo.map((city) =>
        dispatch(updateCity(city.name)).catch(() => {
          setRefreshLoading(false);
        })
      )
    ).then(() => {
      setRefreshLoading(false);
    });
  }, [citiesInfo, dispatch]);

  useEffect(() => {
    refreshData();
  }, []);

  const navigate = useNavigate();

  const onCardClick = useCallback(
    (cityRedirectName: string) => () => {
      navigate(`/cityDetails/${cityRedirectName}`);
    },
    []
  );

  const handleChangeCityName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  }, []);

  const onAddCity = useCallback(() => {
    dispatch(addCity(cityName));
    setCityName('');
  }, [cityName]);

  const onDeleteCity = useCallback(
    (deleteCityName: string) => () => {
      dispatch(deleteCity(deleteCityName));
    },
    []
  );

  const onUpdateCityInfo = useCallback(
    (updateCityName: string) => () => {
      setUpdatingCity(updateCityName);
      dispatch(updateCity(updateCityName))
        .then(() => {
          setUpdatingCity('');
        })
        .catch(() => {
          setUpdatingCity('');
        });
    },
    []
  );

  const toggleDialog = useCallback(() => {
    setIsOpen((prev) => !prev);
    dispatch(setStatus(''));
    dispatch(setError(''));
  }, []);

  return (
    <Box>
      <Box sx={cityListBoxStyle}>
        {citiesInfo && (
          <CitiesList
            citiesInfo={citiesInfo}
            onCardClick={onCardClick}
            onDeleteCity={onDeleteCity}
            onUpdateCityInfo={onUpdateCityInfo}
            toggleDialog={toggleDialog}
            refreshLoading={refreshLoading}
            updatingCity={updatingCity}
          />
        )}
      </Box>
      <AddCityDialog
        isOpen={isOpen}
        toggleDialog={toggleDialog}
        error={error}
        cityName={cityName}
        handleChangeCityName={handleChangeCityName}
        onAddCity={onAddCity}
        status={status}
      />
    </Box>
  );
};
