import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';

import { showFormattedTemperature } from 'src/heplers';
import { WeatherImageBox } from 'src/common';

import styles from './styles';

type Hour = {
  temp: number;
  weather: Array<{
    icon: string;
  }>;
};

type TemperatureListItemType = { hour: Hour };

export const TemperatureListItem = ({ hour }: TemperatureListItemType) => {
  return (
    <ListItem sx={styles.listItemStyle}>
      <WeatherImageBox icon={hour.weather[0].icon} />
      <Box sx={styles.temperatureBoxContainerStyle}>
        <Box aria-label="test-temperature" sx={styles.temperatureBoxStyle(hour.temp)}>
          {showFormattedTemperature(hour.temp)}
        </Box>
      </Box>
    </ListItem>
  );
};
