import { ReactElement } from 'react';

import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import List from '@mui/material/List';

import { CityInfo } from 'src/slices/cities';
import { CityCard } from './CityCard';

type CitiesListType = (props: {
  citiesInfo: CityInfo[];
  onCardClick: (cityRedirectName: string) => () => void;
  onDeleteCity: (deleteCityName: string) => () => void;
  onUpdateCityInfo: (updateCityName: string) => () => void;
}) => ReactElement;

export const CitiesList: CitiesListType = ({
  citiesInfo,
  onUpdateCityInfo,
  onDeleteCity,
  onCardClick,
}) => (
  <List>
    {citiesInfo?.map((city) => (
      <ListItem key={city.name}>
        <CityCard city={city} onCardClick={onCardClick} />
        <Button onClick={onDeleteCity(city.name)}>X</Button>
        <Button onClick={onUpdateCityInfo(city.name)}>update</Button>
      </ListItem>
    ))}
  </List>
);
