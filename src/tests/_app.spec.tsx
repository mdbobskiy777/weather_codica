import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { App } from '../App';
import { store } from '../store';

describe('_app', () => {
  it('render App component with loading gif', () => {
    const { getByAltText } = render(<App />);

    expect(getByAltText('loading')).toBeTruthy();
  });
});

describe('_app', () => {
  it('should show AddCityDialog', async () => {
    const { findByRole, findByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const addButton = await findByRole('button');

    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);

    const addDialog = await findByRole('dialog');

    expect(addDialog).toBeInTheDocument();

    const dialogAddButton = await findByText('Add city');

    expect(dialogAddButton).toBeInTheDocument();

    fireEvent.click(dialogAddButton);
  });
});
