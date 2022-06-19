import { reducer as citiesReducer } from 'src/slices/cities';
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const citiesPersistConfig = {
  key: 'cities',
  storage,
  whitelist: ['citiesInfo'],
};
export const rootReducer = combineReducers({
  cities: persistReducer(citiesPersistConfig, citiesReducer),
});
