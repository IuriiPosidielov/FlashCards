import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import rootReducer from '../reducers/rootReducer'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}
  
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({        
            immutableCheck: false, serializableCheck: false 
    }),});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;