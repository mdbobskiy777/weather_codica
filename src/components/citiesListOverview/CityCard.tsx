import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import loadingGif from 'src/assets/images/loading.gif';

import { CityInfo } from 'src/slices/cities';
import { WeatherImageBox } from 'src/common';
import RefreshIcon from 'src/assets/images/icons/RefreshIcon';
import DeleteIcon from 'src/assets/images/icons/DeleteIcon';
import { showFormattedTemperature } from 'src/heplers';
import {
  cityCardBoxStyle,
  cityCardMainBoxStyle,
  cityTextStyle,
  countryTextStyle,
  infoBoxStyle,
  loadingImgBoxStyle,
  nameBoxStyle,
  optionsBoxStyle,
  weatherDescTextStyle,
} from './styles';

type CityCardType = {
  onCardClick: (cityRedirectName: string) => () => void;
  city: CityInfo;
  onUpdateCityInfo: (cityUpdateName: string) => () => void;
  onDeleteCity: (cityDeleteName: string) => () => void;
  refreshLoading: boolean;
  updatingCity: string;
};

export const CityCard = ({
  onCardClick,
  city,
  onUpdateCityInfo,
  updatingCity,
  onDeleteCity,
  refreshLoading,
}: CityCardType) => (
  <Box sx={cityCardMainBoxStyle}>
    {refreshLoading || updatingCity === city.name ? (
      <Box sx={loadingImgBoxStyle}>
        <img src={loadingGif} alt="loading" width="64px" height="64px" />
      </Box>
    ) : (
      <Box sx={cityCardBoxStyle}>
        <Box sx={optionsBoxStyle}>
          <IconButton onClick={onUpdateCityInfo(city.name)}>
            <RefreshIcon />
          </IconButton>
          <IconButton onClick={onDeleteCity(city.name)}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <Box sx={infoBoxStyle} onClick={onCardClick(city.name)}>
          <Box sx={nameBoxStyle}>
            <Typography sx={cityTextStyle}>{city.name}</Typography>
            <Typography sx={countryTextStyle}>{city.country}</Typography>
          </Box>
          <Typography>{showFormattedTemperature(city.current.temp)}℃</Typography>
          <WeatherImageBox icon={`${city.current.weather[0].icon}@2x`} />
          <Typography sx={weatherDescTextStyle}>{city.current.weather[0].description}</Typography>
        </Box>
      </Box>
    )}
  </Box>
);
