import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ModuleMenuState {
    indoorOutdoor: string;
    module: object;
    moduleVariation: string;
}

const initialState: ModuleMenuState = {
    indoorOutdoor: 'indoor',
    module: {},
    moduleVariation: '',
};
 
const moduleMenuSlice = createSlice({
    name: 'moduleMenu',
    initialState,
    reducers: {
        setIndoorOutdoor: (state, action: PayloadAction<string>) => {
            state.indoorOutdoor = action.payload;
        },
        setModule: (state, action: PayloadAction<string>) => {
            state.module = action.payload;
        },
        setModuleVariation: (state, action: PayloadAction<string>) => {
            state.moduleVariation = action.payload;
        }
    },
});

export const { 
    setIndoorOutdoor, 
    setModule,
    setModuleVariation,
} = moduleMenuSlice.actions;

export default moduleMenuSlice.reducer;