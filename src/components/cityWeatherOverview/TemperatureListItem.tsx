import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';

import { showFormattedTemperature } from 'src/heplers';
import { WeatherImageBox } from 'src/common';

import { listItemStyle, temperatureBoxContainerStyle, temperatureBoxStyle } from './styles';

type Hour = {
  temp: number;
  weather: [
    {
      icon: string;
    }
  ];
};

type TemperatureListItemType = { hour: Hour };

export const TemperatureListItem = ({ hour }: TemperatureListItemType) => {
  return (
    <ListItem sx={listItemStyle}>
      <WeatherImageBox icon={hour.weather[0].icon} />
      <Box sx={temperatureBoxContainerStyle}>
        <Box sx={temperatureBoxStyle(hour.temp)}>{showFormattedTemperature(hour.temp)}</Box>
      </Box>
    </ListItem>
  );
};
