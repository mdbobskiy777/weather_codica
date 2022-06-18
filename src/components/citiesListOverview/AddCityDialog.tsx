import { ChangeEvent, ReactElement } from 'react';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import { Error } from 'src/slices/cities';

type AddCityDialogType = (props: {
  isOpen: boolean;
  toggleDialog: () => void;
  error: Error;
  cityName: string;
  handleChangeCityName: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddCity: () => void;
  status: string;
}) => ReactElement;

export const AddCityDialog: AddCityDialogType = ({
  isOpen,
  toggleDialog,
  error,
  cityName,
  handleChangeCityName,
  onAddCity,
  status,
}) => (
  <Dialog open={isOpen} onClose={toggleDialog}>
    <div>
      {error && <Typography>{error.message}</Typography>}
      {status === 'success' && <Typography>City added!</Typography>}
      <IconButton onClick={toggleDialog}>x</IconButton>
    </div>
    <TextField
      size="small"
      placeholder="Enter city"
      value={cityName}
      onChange={handleChangeCityName}
    />
    <Button onClick={onAddCity}>Add city</Button>
  </Dialog>
);
