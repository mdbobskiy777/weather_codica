import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { useNavigate } from 'react-router';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';

import { useDispatch, useSelector } from 'src/store';
import { deleteCity, getData, setStatus, updateCity } from 'src/slices/cities';

export const CitiesList = () => {
  const [cityName, setCityName] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  const [refreshLoading, setRefreshtLoading] = useState(false);

  const { status, error, cities } = useSelector((state) => state.cities);
  const dispatch = useDispatch();

  const refreshData = useCallback(() => {
    setRefreshtLoading(true);
    Promise.all(
      cities.map(
        (city) =>
          new Promise(() => {
            dispatch(getData(city.name));
          })
      )
    ).then(() => {
      // eslint-disable-next-line no-debugger
      debugger;
      console.log('Promise.all then is running');
      setRefreshtLoading(false);
    });
  }, [cities, dispatch]);

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
    dispatch(getData(cityName));
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
        {cities && (
          <List>
            {cities?.map((city) => (
              <ListItem key={city.name}>
                <Box onClick={onCardClick(city.name)}>
                  <div>{`City: ${city.name}`}</div>
                  <div>{`Country: ${city.country}`}</div>
                  <div>{`Temperature: ${city.current.temp}`}</div>
                </Box>
                <Button onClick={onDeleteCity(city.name)}>X</Button>
                <Button onClick={onUpdateCityInfo(city.name)}>update</Button>
              </ListItem>
            ))}
          </List>
        )}
      </div>
      <div>
        <Button variant="outlined" onClick={toggleDialog}>
          Add city
        </Button>
      </div>
      <Dialog open={isOpen} onClose={toggleDialog}>
        <div>
          {error && <Typography>{error.message}</Typography>}
          {status === 'success' && <Typography>City added!</Typography>}
          <IconButton onClick={toggleDialog}>x</IconButton>
        </div>
        <TextField
          size="small"
          placeholder="Enter city"
          value={cityName}
          onChange={handleChangeCityName}
        />
        <Button onClick={onAddCity}>Add city</Button>
      </Dialog>
    </div>
  );
};
