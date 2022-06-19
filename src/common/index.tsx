import Box from '@mui/material/Box';

import loadingGif from 'src/assets/images/loading.gif';

type WeatherImageBoxType = { icon: string };

export const WeatherImageBox = ({ icon }: WeatherImageBoxType) => (
  <Box>
    <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt="weather_icon" />
  </Box>
);

export const Loading = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img src={loadingGif} alt="loading" width="64px" height="64px" />
  </Box>
);
