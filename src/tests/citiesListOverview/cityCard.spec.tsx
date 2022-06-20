import { render } from '@testing-library/react';

import { CityCard } from 'src/components/citiesListOverview/CityCard';
import { mockData } from '../mocks';

describe('CityCard', () => {
  it('render CityCard', async () => {
    const { findByLabelText, findAllByRole } = render(
      <CityCard
        city={mockData.city}
        onCardClick={mockData.onCardClick}
        onDeleteCity={mockData.onDeleteCity}
        onUpdateCityInfo={mockData.onUpdateCityInfo}
        refreshLoading={mockData.refreshLoading}
        updatingCity={mockData.updatingCity}
      />
    );

    const cityName = await findByLabelText('test-city-name');

    const buttons = await findAllByRole('button');

    expect(buttons.length).toEqual(2);

    expect(cityName.textContent).toEqual(mockData.city.name);
  });
});
