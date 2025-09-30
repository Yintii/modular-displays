import { PayloadAction, createSlice } from '@reduxjs/toolkit';

//outdoor modules
import IM2   from '../../data/outdoor/intelligent_m2.json'
import ISMD  from '../../data/outdoor/infinity_smd.json'
import IRGB  from '../../data/outdoor/infinity_rgb.json'
import IGS   from '../../data/outdoor/infinity_gs.json'
import ESMD  from '../../data/outdoor/envision_smd.json'
import IOSMD from '../../data/outdoor/infinity_one_smd.json'
//indoor modules
import OP2    from '../../data/indoor/opt_panel_2.json'
import OS     from '../../data/indoor/opt_slim.json'
import OP     from '../../data/indoor/opt_poster.json'
import OWIN   from '../../data/indoor/opt_win.json'


        //these first two are just for rendering the options as a whole
    const indoorModules = [
        { name: OP2.name,    data: OP2 },
        { name: OS.name,     data: OS },
        { name: OP.name,     data: OP },
        { name: OWIN.name,   data: OWIN },
    ];

    const outdoorModules = [
        { name: IM2.name,   data: IM2 },
        { name: ISMD.name,  data: ISMD },
        { name: IRGB.name,  data: IRGB },
        { name: IGS.name,   data: IGS },
        { name: ESMD.name,  data: ESMD },
        { name: IOSMD.name, data: IOSMD }
    ];

    const optSlimReg = { name: OS.name, data: OS };

    //these are classifying arrays, used to determine which renderer to use
    const regularModules = {
        indoor: [
            { name: OP2.name, data: OP2 },
            { name: IOSMD.name, data: IOSMD },
            { name: OP.name, data: OP },
            { name: OWIN.name, data: OWIN }
        ],
        //outdoor regulars have the appendage logic
        outdoor: [
            { name: IM2.name, data: IM2 },
            { name: ISMD.name, data: ISMD },
            { name: IRGB.name, data: IRGB },
            { name: IGS.name, data: IGS },
            { name: ESMD.name, data: ESMD }
        ]
    };


export interface ModuleMenuState {
    indoorOutdoor: string;
    module: Module;
    moduleVariation: Variation;
    moduleFactor: number;
    indoorModules: { name: string; data: Module }[];
    outdoorModules: { name: string; data: Module }[];
    regularModules: { 
        indoor: { name: string; data: Module }[], 
        outdoor: { name: string; data: Module }[] 
    };
    optSlimReg: { name: string; data: Module };
    renderer: string;
    preset: string | null;
    halves: boolean;
    fives: number;
    fours: number;
    threes: number;
    twos: number;
    IM2: Module;
    ISMD: Module;
    IRGB: Module;
    IGS: Module;
    ESMD: Module;
    IOSMD: Module;
    OP2: Module;
    OS: Module;
    OP: Module;
}

interface Module {
    name: string;
    value: string;
    ruleset: Ruleset
    variations: Variation[];
}

interface Ruleset {
    minimum?:         number;
    tileVertical:    boolean;
    tileHorizontal:  boolean;
    canSplitInHalf?: boolean;
    seamless?:       boolean;
    borderOptional?: boolean;
    preset_1:        boolean;
    preset_2:        boolean;
    preset_3:        boolean;
    preset_4:        boolean;
}

interface Variation {
    id: number;
    name: string;
    pixel_pitch: number;
    resolution: {
        width: number;
        height: number;
    };
    physical_dimensions_inches: {
        width: number;
        height: number;
    };
}


const initialState: ModuleMenuState = {
    indoorOutdoor: 'indoor',
    module: <Module>{},
    moduleVariation: <Variation>{},
    moduleFactor: 0,
    indoorModules: indoorModules,
    outdoorModules: outdoorModules,
    regularModules: regularModules,
    optSlimReg: optSlimReg,
    renderer:'regular',
    preset: null,
    halves: false,
    fives: 0,
    fours: 0,
    threes: 0,
    twos: 0,
    IM2: IM2,
    ISMD: ISMD,
    IRGB: IRGB,
    IGS: IGS,
    ESMD: ESMD,
    IOSMD: IOSMD,
    OP2: OP2,
    OS: OS,
    OP: OP,
};


const moduleMenuSlice = createSlice({
    name: 'moduleMenu',
    initialState,
    reducers: {
        setIndoorOutdoor: (state, action: PayloadAction<string>) => {
            state.indoorOutdoor = action.payload;
        },
        setModule: (state, action: PayloadAction<Module>) => {
            state.module = action.payload;
            //set the rendering depending on which module is selected
            if(state.indoorOutdoor === 'indoor'){
                if(state.module.name === state.optSlimReg.name){
                    state.renderer = 'opt_slim_reg';
                } else if(state.regularModules.indoor.find(m => m.name === state.module.name)){
                    state.renderer = 'regular';
                }   else{
                    state.renderer = 'regular'; //default to regular if something goes wrong
                }
            } else{
                //outdoor logic
                if(state.regularModules.outdoor.find(m => m.name === state.module.name)){
                    state.renderer = 'regular';
                } else{
                    state.renderer = 'regular'; //default to regular if something goes wrong
                }
            }
            //set the default variation to the first one
            if(state.module.variations && state.module.variations.length > 0){
                state.moduleVariation = state.module.variations[0];
                state.moduleFactor = (state.moduleVariation.physical_dimensions_inches.width / state.moduleVariation.physical_dimensions_inches.height);
            }else{
                state.moduleVariation = <Variation>{};
                state.moduleFactor = 0;
            }
        },
        setModuleVariation: (state, action: PayloadAction<string>) => {
            const variation = state.module.variations.find((variation: Variation) => variation.name === action.payload);
            if(!variation) return;
            state.moduleVariation = variation;
            state.moduleFactor = (state.moduleVariation.physical_dimensions_inches.width / state.moduleVariation.physical_dimensions_inches.height);

        },
        setPreset: (state, action: PayloadAction<string>) => {
            console.log('Setting preset: ', action.payload);
            state.preset = action.payload;
        },
        setHalves: (state, action: PayloadAction<boolean>) => {
            state.halves = action.payload;
        },
        setFives: (state, action: PayloadAction<number>) => {
            state.fives = action.payload;
        },
        setFours: (state, action: PayloadAction<number>) => {
            state.fours = action.payload;
        },
        setThrees: (state, action: PayloadAction<number>) => {
            state.threes = action.payload;
        },
        setTwos: (state, action: PayloadAction<number>) => {
            state.twos = action.payload;
        }
    },
});

export const { 
    setIndoorOutdoor, 
    setModule,
    setModuleVariation,
    setPreset,
    setHalves,
    setFives,
    setFours,
    setThrees,
    setTwos
} = moduleMenuSlice.actions;

export default moduleMenuSlice.reducer;
