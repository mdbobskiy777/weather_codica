import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import AddIcon from 'src/assets/images/icons/AddIcon';

type AddCityButtonType = { toggleDialog: () => void };

export const AddCityButton = ({ toggleDialog }: AddCityButtonType) => (
  <Box>
    <IconButton onClick={toggleDialog}>
      <AddIcon />
    </IconButton>
  </Box>
);
