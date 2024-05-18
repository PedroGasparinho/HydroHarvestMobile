import { configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import modalReducer from './modal.reducer';

const persistConfig = {
    key: "root",
    version: 2,
    storage: AsyncStorage,
    purge: true,
};

const reducer = combineReducers({
    modalState: modalReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: {
        persistedReducer,
        //modalState: modalReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {
            serializableCheck: false
        }
    ),
})

export type RootState = ReturnType<typeof store.getState>