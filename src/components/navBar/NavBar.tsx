import { Link as RouterLink } from 'react-router-dom';

export const NavBar = () => (
  <nav>
    <div>
      <RouterLink to="/citiesList">Movie Catalog</RouterLink>
    </div>
    <div>
      <RouterLink to="/cityDetails/:cityName">Current city details</RouterLink>
    </div>
  </nav>
);
