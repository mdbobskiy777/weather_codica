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

import styles from './styles';

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
    <Dialog
      aria-label="test-dialog-btn"
      open={isOpen}
      onClose={toggleDialog}
      sx={styles.dialogStyle}
    >
      <Box sx={styles.deleteButtonBoxStyle}>
        <IconButton onClick={toggleDialog}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Box sx={styles.commonBoxStyle}>
        <TextField
          sx={{ width: '90%' }}
          size="small"
          placeholder="Enter city"
          value={cityName}
          onChange={handleChangeCityName}
          onFocus={onFocusHandler}
        />
      </Box>
      <Box sx={styles.commonBoxStyle}>
        <Button variant="outlined" onClick={onAddCity} sx={{ width: '60%' }}>
          Add city
        </Button>
      </Box>
      <Box sx={styles.commonBoxStyle}>
        {error && <Typography sx={styles.textStyle}>{error.message}</Typography>}
        {status === 'success' && <Typography sx={styles.textStyle}>City added!</Typography>}
      </Box>
    </Dialog>
  );
};
