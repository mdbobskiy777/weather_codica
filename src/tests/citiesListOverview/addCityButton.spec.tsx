import { fireEvent, render } from '@testing-library/react';

import { AddCityButton } from 'src/components/citiesListOverview/AddCityButton';

const toggleDialog = jest.fn();

describe('AddCityButton', () => {
  it('click AddCityButton', async () => {
    const { findByRole } = render(<AddCityButton toggleDialog={toggleDialog} />);

    const button = await findByRole('button');

    fireEvent.click(button);

    expect(toggleDialog).toHaveBeenCalled();
  });
});
