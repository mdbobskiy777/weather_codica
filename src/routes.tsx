import { Fragment, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { MainLayout, MainLayoutType } from 'src/layouts/MainLayout';
import { NotFoundView } from 'src/errors/NotFoundView';

type RouteType = {
  path: string;
  layout?: MainLayoutType;
  // any type because of lazy(() => import())
  element: any;
};

type RoutesType = RouteType[];

const renderRoutes = (routes: RoutesType = []) => (
  <Suspense fallback={<div>loading...</div>}>
    <Routes>
      {routes.map((route: RouteType) => {
        const Layout = route.layout || Fragment;
        const Component = route.element;

        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Layout>
                <Component />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes: RoutesType = [
  {
    path: '/',
    layout: MainLayout,
    element: lazy(() => import('src/pages/CitiesListPage')),
  },
  {
    path: '/citiesList',
    layout: MainLayout,
    element: lazy(() => import('src/pages/CitiesListPage')),
  },
  {
    path: '/cityDetails/:cityName',
    layout: MainLayout,
    element: lazy(() => import('src/pages/CityDetailsPage')),
  },
  {
    path: '*',
    layout: MainLayout,
    element: NotFoundView,
  },
];

export const allRoutes = renderRoutes(routes);
