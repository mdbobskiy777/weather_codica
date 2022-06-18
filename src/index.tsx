import { Provider } from 'react-redux';

import { createRoot } from 'react-dom/client';

import { PersistGate } from 'redux-persist/integration/react';

import { App } from 'src/App';
import { persistor, store } from 'src/store';

const container = document.getElementById('root');

const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
