import settings from './settingsReducer';
import cards from './cardsReducer';
import { combineReducers } from '@reduxjs/toolkit';

export default combineReducers({settings, cards});