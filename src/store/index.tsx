import { configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import modalReducer from './modal.reducer';
import userReducer from './user.reducer';
import locationReducer from './location.reducer';

const persistConfig = {
    key: "root",
    version: 2,
    storage: AsyncStorage,
    purge: true,
};

const reducer = combineReducers({
    modalState: modalReducer,
    userReducer: userReducer,
    locationReducer: locationReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: {
        persistedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {
            serializableCheck: false
        }
    ),
})

export type State = ReturnType<typeof store.getState>