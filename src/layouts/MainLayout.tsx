import { ReactElement } from 'react';

import { NavBar } from 'src/components/navBar/NavBar';

type PropType = {
  children: ReactElement;
};

export const MainLayout = ({ children }: PropType) => (
  <div>
    <div>
      <NavBar />
    </div>
    <div>
      <main>{children}</main>
    </div>
  </div>
);

export type MainLayoutType = typeof MainLayout;
