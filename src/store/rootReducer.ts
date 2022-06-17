import { reducer as cityReducer } from 'src/slices/city';
import { reducer as citiesReducer } from 'src/slices/cities';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  cityDetails: cityReducer,
  cities: citiesReducer,
});