import { reducer as citiesReducer } from 'src/slices/cities';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  cities: citiesReducer,
});
