import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { CityInfo } from 'src/slices/cities';
import { CityCard } from './CityCard';
import { AddCityButton } from './AddCityButton';

import styles from './styles';

type CitiesListType = {
  citiesInfo: CityInfo[];
  onCardClick: (cityRedirectName: string) => () => void;
  onDeleteCity: (deleteCityName: string) => () => void;
  onUpdateCityInfo: (updateCityName: string) => () => void;
  toggleDialog: () => void;
  refreshLoading: boolean;
  updatingCity: string;
};

export const CitiesList = ({
  citiesInfo,
  onUpdateCityInfo,
  onDeleteCity,
  onCardClick,
  toggleDialog,
  refreshLoading,
  updatingCity,
}: CitiesListType) => (
  <List sx={styles.listStyle}>
    {citiesInfo?.map((city) => (
      <ListItem key={city.name} sx={styles.listItemStyle}>
        <CityCard
          city={city}
          onCardClick={onCardClick}
          onUpdateCityInfo={onUpdateCityInfo}
          onDeleteCity={onDeleteCity}
          refreshLoading={refreshLoading}
          updatingCity={updatingCity}
        />
      </ListItem>
    ))}
    <ListItem sx={styles.lastListItemStyle}>
      <AddCityButton toggleDialog={toggleDialog} />
    </ListItem>
  </List>
);
