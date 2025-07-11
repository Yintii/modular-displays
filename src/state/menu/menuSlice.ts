import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface twoDimensional {
    height: number;
    width: number;
}

interface MenuState {  
  wallDimensions: twoDimensional;
  displayDimensions: twoDimensional;
  displayResolution: twoDimensional;
  innerDimensions: twoDimensional;
  displayMargins: twoDimensional;
  totalModules: number;
  overallScale: number | null;
  fixedWallScale: number | null;
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
    },
    innerDimensions: {
        height: 0,
        width: 0,
    },
    displayMargins: {
        height: 0,
        width: 0,
    },
    totalModules: 0,
    overallScale: 100,
    fixedWallScale: null,
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setWallHeight: (state, action: PayloadAction<number>) => {
            state.wallDimensions.height = action.payload;
        },
        setWallWidth: (state, action: PayloadAction<number>) => {
            state.wallDimensions.width = action.payload;
        },
        setDisplayHeight: (state, action: PayloadAction<number>) => {
            state.displayDimensions.height = action.payload;
        },
        setDisplayWidth: (state, action: PayloadAction<number>) => {
            state.displayDimensions.width = action.payload;
        },
        setDisplayResolution: (state, action: PayloadAction<twoDimensional>) => {
            state.displayResolution = action.payload;
        },
        setInnerDimensions: (state, action: PayloadAction<twoDimensional>) => {
            state.innerDimensions = action.payload;
        },
        setDisplayMargins: (state, action: PayloadAction<twoDimensional>) => {
            state.displayMargins = action.payload;
        },
        setTotalModules: (state, action: PayloadAction<number>) => {
            state.totalModules = action.payload;
        },
       setOverallScale: (state, action: PayloadAction<number>) => {
            console.log("Setting overall scale: ", action.payload)
            state.overallScale = action.payload;
        },
        setFixedWallScale: (state, action: PayloadAction<number>) => {
            console.log("Setting fixed wall scale: ", action.payload)
            if(state.wallDimensions.width == 0 || state.wallDimensions.height === 0){
              state.fixedWallScale = null;
            }else{ 
              state.fixedWallScale = action.payload;
            }
        }
    },
})

export const { 
    setWallHeight,
    setWallWidth,
    setDisplayHeight,
    setDisplayWidth,
    setDisplayResolution,
    setInnerDimensions,
    setDisplayMargins,
    setTotalModules,
    setOverallScale,
    setFixedWallScale
} = menuSlice.actions;

export default menuSlice.reducer;
