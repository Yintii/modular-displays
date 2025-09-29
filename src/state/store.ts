import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menu/menuSlice';
import moduleMenuReducer from './moduleMenu/moduleMenuSlice';

export const store: any = configureStore({
    reducer: {
        menu: menuReducer,
        moduleMenu: moduleMenuReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

