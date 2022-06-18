import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { useNavigate } from 'react-router';

import { useDispatch, useSelector } from 'src/store';
import { deleteCity, addCity, setStatus, updateCity } from 'src/slices/cities';

import { AddCityDialog } from './AddCityDialog';
import { AddCityButton } from './AddCityButton';
import { CitiesList } from './CitiesList';

export const CitiesListOverview = () => {
  const [cityName, setCityName] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  const [refreshLoading, setRefreshtLoading] = useState(false);

  const { status, error, citiesInfo } = useSelector((state) => state.cities);
  const dispatch = useDispatch();

  const refreshData = useCallback(() => {
    setRefreshtLoading(true);
    Promise.all(
      citiesInfo.map(
        (city) =>
          new Promise(() => {
            dispatch(updateCity(city.name));
          })
      )
    ).then(() => {
      // eslint-disable-next-line no-debugger
      debugger;
      console.log('Promise.all then is running');
      setRefreshtLoading(false);
    });
  }, [citiesInfo, dispatch]);

  useEffect(() => {
    refreshData();
    console.log('refreshData useEffect');
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
    setStatus('');
  }, [cityName]);

  const onDeleteCity = useCallback(
    (deleteCityName: string) => () => {
      dispatch(deleteCity(deleteCityName));
    },
    []
  );

  const onUpdateCityInfo = useCallback(
    (updateCityName: string) => () => {
      dispatch(updateCity(updateCityName));
    },
    []
  );

  const toggleDialog = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <div>
      <div>
        {refreshLoading && <div>Updating weather info...</div>}
        {citiesInfo && (
          <CitiesList
            citiesInfo={citiesInfo}
            onCardClick={onCardClick}
            onDeleteCity={onDeleteCity}
            onUpdateCityInfo={onUpdateCityInfo}
          />
        )}
      </div>
      <AddCityButton toggleDialog={toggleDialog} />
      <AddCityDialog
        isOpen={isOpen}
        toggleDialog={toggleDialog}
        error={error}
        cityName={cityName}
        handleChangeCityName={handleChangeCityName}
        onAddCity={onAddCity}
        status={status}
      />
    </div>
  );
};
