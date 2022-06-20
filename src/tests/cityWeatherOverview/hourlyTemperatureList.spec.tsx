import { render } from '@testing-library/react';

import { HourlyTemperatureList } from 'src/components/cityWeatherOverview/HourlyTemperatureList';
import { mockData } from '../mocks';

describe('HourlyTemperatureList', () => {
  it('render HourlyTemperatureList with formatted temperature values', async () => {
    const { findAllByLabelText } = render(
      <HourlyTemperatureList currentCity={mockData.city} loading={mockData.loading} />
    );

    const temperatureValues = await findAllByLabelText('test-temperature');

    expect(temperatureValues.length).toEqual(2);

    expect(temperatureValues[0].textContent).toEqual('+14');
    expect(temperatureValues[1].textContent).toEqual('+15');
  });
});
