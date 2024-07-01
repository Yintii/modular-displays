import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface twoDimensional {
    height: number;
    width: number;
}

interface MenuState {  
  wallDimensions: twoDimensional;
  displayDimensions: twoDimensional;
  displayResolution: twoDimensional;
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
    displayResolution: {
        width: 0,
        height: 0,
    }
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
        },
        adjustDisplayResolution: (state, action: PayloadAction<twoDimensional>) => {
            state.displayResolution = action.payload;
        },
    },
})

export const { 
    adjustWallHeight,
    adjustWallWidth,
    adjustDisplayHeight,
    adjustDisplayWidth,
    adjustDisplayResolution
} = menuSlice.actions;

export default menuSlice.reducer;