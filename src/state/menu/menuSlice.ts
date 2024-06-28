import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface MenuState {  
  wallDimensions: {
    height: number;
    width: number;
  };
  
  displayDimensions: {
    height: number;
    width: number;
  };

}

const initialState: MenuState = {
    wallDimensions: {
        height: 0,
        width: 0,
    },
    displayDimensions: {
        height: 0,
        width: 0,
    },
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        adjustWallHeight: (state, action: PayloadAction<number>) => {
            state.wallDimensions.height = action.payload;
        },
        adjustWallWidth: (state, action: PayloadAction<number>) => {
            state.wallDimensions.width = action.payload;
        },
        adjustDisplayHeight: (state, action: PayloadAction<number>) => {
            state.displayDimensions.height = action.payload;
        },
        adjustDisplayWidth: (state, action: PayloadAction<number>) => {
            state.displayDimensions.width = action.payload;
        }
    },
})

export const { 
    adjustWallHeight,
    adjustWallWidth,
    adjustDisplayHeight,
    adjustDisplayWidth,
} = menuSlice.actions;

export default menuSlice.reducer;