import { Link as RouterLink } from 'react-router-dom';

export const NavBar = () => (
  <nav>
    <div>
      <RouterLink to="/citiesList">Cities list</RouterLink>
    </div>
    <div>
      <RouterLink to="/cityDetails/:cityName">Current city details</RouterLink>
    </div>
  </nav>
);
