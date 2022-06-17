import { BrowserRouter as Router } from 'react-router-dom';

import { allRoutes } from 'src/routes';

export const App = () => (
  <Router>
    <div>
      {allRoutes}
    </div>
  </Router>
);
