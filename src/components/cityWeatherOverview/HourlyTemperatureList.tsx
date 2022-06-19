import Box from '@mui/material/Box';
import List from '@mui/material/List';

import { CityInfo } from 'src/slices/cities';
import { Loading } from 'src/common';
import { TemperatureListItem } from './TemperatureListItem';

import { listStyle } from './styles';

type HourlyTemperatureListType = { currentCity: CityInfo; loading: boolean };

const isDayIsCurrent = (day: number) => new Date(day * 1000).getDate() === new Date().getDate();

export const HourlyTemperatureList = ({ currentCity, loading }: HourlyTemperatureListType) => {
  return (
    <Box>
      {loading ? (
        <Loading />
      ) : (
        <List sx={listStyle}>
          {currentCity.hourly
            ?.filter((hour) => isDayIsCurrent(hour.dt))
            .map((hour) => (
              <TemperatureListItem key={hour.dt} hour={hour} />
            ))}
        </List>
      )}
    </Box>
  );
};
