import { ReactElement } from 'react';

import Box from '@mui/material/Box';

import { CityInfo } from 'src/slices/cities';

type CityCardType = (props: {
  onCardClick: (cityRedirectName: string) => () => void;
  city: CityInfo;
}) => ReactElement;

export const CityCard: CityCardType = ({ onCardClick, city }) => (
  <Box onClick={onCardClick(city.name)}>
    <div>{`City: ${city.name}`}</div>
    <div>{`Country: ${city.country}`}</div>
    <div>{`Temperature: ${city.current.temp}`}</div>
  </Box>
);
