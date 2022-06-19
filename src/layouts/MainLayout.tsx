import { ReactElement } from 'react';

import Container from '@mui/material/Container';

type PropsType = {
  children: ReactElement;
};

export const MainLayout = ({ children }: PropsType) => <Container>{children}</Container>;

export type MainLayoutType = typeof MainLayout;
