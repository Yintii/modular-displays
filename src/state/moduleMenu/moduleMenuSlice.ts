import { PayloadAction, createSlice } from '@reduxjs/toolkit';

//outdoor modules
import IM2   from '../../data/outdoor/intelligent_m2.json'
import ISMD  from '../../data/outdoor/infinity_smd.json'
import IRGB  from '../../data/outdoor/infinity_rgb.json'
import IGS   from '../../data/outdoor/infinity_gs.json'
import ESMD  from '../../data/outdoor/envision_smd.json'
import IOSMD from '../../data/outdoor/infinity_one_smd.json'
//indoor modules
import OP1    from '../../data/indoor/opt_panel_1.json'
import OP2    from '../../data/indoor/opt_panel_2.json'
import OS     from '../../data/indoor/opt_slim.json'
import OSWP19 from '../../data/indoor/opt_slim_wp_1_9.json'
import OSWP25 from '../../data/indoor/opt_slim_wp_2_5.json'
import OSWP26 from '../../data/indoor/opt_slim_wp_2_6.json'
import OSWP39 from '../../data/indoor/opt_slim_wp_3_9.json'
import OSWP48 from '../../data/indoor/opt_slim_wp_4_8.json'
import OP     from '../../data/indoor/opt_poster.json'
import OTV    from '../../data/indoor/opt_tv.json'
import OWIN   from '../../data/indoor/opt_win.json'
import OCOOL  from '../../data/indoor/opt_cool.json'
import OSCORE from '../../data/indoor/opt_score.json'

        //these first two are just for rendering the options as a whole
    const indoorModules = [
        { name: OP2.name,    data: OP2 },
        { name: OS.name,     data: OS },
        { name: OSWP19.name, data: OSWP19 },
        { name: OSWP25.name, data: OSWP25 },
        { name: OSWP26.name, data: OSWP26 },
        { name: OSWP39.name, data: OSWP39 },
        { name: OSWP48.name, data: OSWP48 },
        { name: OP1.name,    data: OP1 },
        { name: OP.name,     data: OP },
        { name: OTV.name,    data: OTV },
        { name: OWIN.name,   data: OWIN },
        { name: OCOOL.name,  data: OCOOL },
        { name: OSCORE.name, data: OSCORE }
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
            { name: OP1.name, data: OP1 },
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

    const wpModules = [
        { name: 'Opt-Slim WP 1.9mm', data: OSWP19 },
        { name: 'Opt-Slim WP 2.5mm', data: OSWP25 },
        { name: 'Opt-Slim WP 2.6mm', data: OSWP26 },
        { name: 'Opt-Slim WP 3.9mm', data: OSWP39 },
        { name: 'Opt-Slim WP 4.8mm', data: OSWP48 }
    ];

    const horizontalModules = [
        //all these happen to be indoor modules
        { name: OTV.name, data: OTV },
        { name: OCOOL.name, data: OCOOL },
        { name: OSCORE.name, data: OSCORE }
    ];


interface ModuleMenuState {
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
    wpModules: { name: string; data: Module }[];
    horizontalModules: { name: string; data: Module }[];
    optSlimReg: { name: string; data: Module };
    renderer: string;
    preset: string | null;
    IM2: Module;
    ISMD: Module;
    IRGB: Module;
    IGS: Module;
    ESMD: Module;
    IOSMD: Module;
    OP1: Module;
    OP2: Module;
    OS: Module;
    OSWP19: Module;
    OSWP25: Module;
    OSWP26: Module;
    OSWP39: Module;
    OSWP48: Module;
    OP: Module;
    OTV: Module;
    OWIN: Module;
    OCOOL: Module;
    OSCORE: Module;
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
    wpModules: wpModules,
    horizontalModules: horizontalModules,
    optSlimReg: optSlimReg,
    renderer:'regular',
    preset: null,
    IM2: IM2,
    ISMD: ISMD,
    IRGB: IRGB,
    IGS: IGS,
    ESMD: ESMD,
    IOSMD: IOSMD,
    OP1: OP1,   
    OP2: OP2,
    OS: OS,
    OSWP19: OSWP19,
    OSWP25: OSWP25,
    OSWP26: OSWP26,
    OSWP39: OSWP39,
    OSWP48: OSWP48,
    OP: OP,
    OTV: OTV,
    OWIN: OWIN,
    OCOOL: OCOOL,
    OSCORE: OSCORE
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
        },
        setModuleVariation: (state, action: PayloadAction<string>) => {
            const variation = state.module.variations.find((variation: Variation) => variation.name === action.payload);
            if(!variation) return;
            state.moduleVariation = variation;
            state.moduleFactor = (state.moduleVariation.physical_dimensions_inches.width / state.moduleVariation.physical_dimensions_inches.height);

        },
        setPreset: (state, action: PayloadAction<string>) => {
            console.log('Setting preset: ', action.payload);
            state.preset = action.payload
        }
    },
});

export const { 
    setIndoorOutdoor, 
    setModule,
    setModuleVariation,
    setPreset
} = moduleMenuSlice.actions;

export default moduleMenuSlice.reducer;