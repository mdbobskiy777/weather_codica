import { ChangeEvent, useCallback, useState } from 'react';

import { useNavigate } from 'react-router';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';

import { useDispatch, useSelector } from 'src/store';
import { getCityDataAsync, setStatus } from 'src/slices/cities';
import { ListItem } from '@mui/material';

export const CitiesList = () => {
  const [cityName, setCityName] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  const { status, error, cities } = useSelector((state) => state.cities);
  const dispatch = useDispatch();

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

  /*
  const onAddCity = useCallback(() => dispatch(getData(cityName)), [cityName]);
*/
  const onAddCity = useCallback(() => {
    dispatch(getCityDataAsync(cityName));
    setCityName('');
    setStatus('');
  }, [cityName]);

  const toggleDialog = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <div>
      <div>
        {cities && (
          <List>
            {cities.map((city) => (
              <ListItem onClick={onCardClick(city.name)} key={city.name}>
                <div>
                  <div>{`City: ${city.name}`}</div>
                  <div>{`Country: ${city.country}`}</div>
                </div>
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
          {error && <Typography>{error}</Typography>}
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
