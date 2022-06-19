import { ChangeEvent, useCallback } from 'react';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';

import { Error, setError, setStatus } from 'src/slices/cities';
import { useDispatch } from 'src/store';
import DeleteIcon from 'src/assets/images/icons/DeleteIcon';

import { commonBoxStyle, deleteButtonBoxStyle, dialogStyle, textStyle } from './styles';

type AddCityDialogType = {
  isOpen: boolean;
  toggleDialog: () => void;
  error: Error;
  cityName: string;
  handleChangeCityName: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddCity: () => void;
  status: string;
};

export const AddCityDialog = ({
  isOpen,
  toggleDialog,
  error,
  cityName,
  handleChangeCityName,
  onAddCity,
  status,
}: AddCityDialogType) => {
  const dispatch = useDispatch();

  const onFocusHandler = useCallback(() => {
    dispatch(setStatus(''));
    dispatch(setError(''));
  }, [dispatch]);

  return (
    <Dialog open={isOpen} onClose={toggleDialog} sx={dialogStyle}>
      <Box sx={deleteButtonBoxStyle}>
        <IconButton onClick={toggleDialog}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Box sx={commonBoxStyle}>
        <TextField
          sx={{ width: '90%' }}
          size="small"
          placeholder="Enter city"
          value={cityName}
          onChange={handleChangeCityName}
          onFocus={onFocusHandler}
        />
      </Box>
      <Box sx={commonBoxStyle}>
        <Button variant="outlined" onClick={onAddCity} sx={{ width: '60%' }}>
          Add city
        </Button>
      </Box>
      <Box sx={commonBoxStyle}>
        {error && <Typography sx={textStyle}>{error.message}</Typography>}
        {status === 'success' && <Typography sx={textStyle}>City added!</Typography>}
      </Box>
    </Dialog>
  );
};
