import { ReactElement } from 'react';

import Button from '@mui/material/Button';

type AddCityButtonType = (props: { toggleDialog: () => void }) => ReactElement;

export const AddCityButton: AddCityButtonType = ({ toggleDialog }) => (
  <div>
    <Button variant="outlined" onClick={toggleDialog}>
      Add city
    </Button>
  </div>
);
