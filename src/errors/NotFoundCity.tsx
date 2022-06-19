import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const mainBoxStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '40%',
};

const mainTextStyle = { fontSize: '36px', color: 'gray' };

const textStyle = {
  fontSize: '24px',
  color: 'black',
};

export const NotFoundCity = () => {
  const { cityName } = useParams();

  return (
    <Box sx={mainBoxStyle}>
      <Typography sx={mainTextStyle}>
        {`${cityName} - is not added to list or the name is incorrect`}
      </Typography>
      <Box>
        <Typography sx={textStyle}>
          Go <Link to="/citiesList">here</Link> to add city you need
        </Typography>
      </Box>
    </Box>
  );
};
