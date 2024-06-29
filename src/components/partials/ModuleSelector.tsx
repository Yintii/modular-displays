import { useEffect } from 'react';
//outdoor modules
import IM2 from '../../data/outdoor/intelligent_m2.json'
import ISMD from '../../data/outdoor/infinity_smd.json'
import IRGB from '../../data/outdoor/infinity_rgb.json'
import IGS from '../../data/outdoor/infinity_gs.json'
import ESMD from '../../data/outdoor/envision_smd.json'
import IOSMD from '../../data/outdoor/infinity_one_smd.json'
//indoor modules
import OP1 from '../../data/indoor/opt_panel_1.json'
import OP2 from '../../data/indoor/opt_panel_2.json'
import OS from '../../data/indoor/opt_slim.json'
import OSWP19 from '../../data/indoor/opt_slim_wp_1_9.json'
import OSWP25 from '../../data/indoor/opt_slim_wp_2_5.json'
import OSWP26 from '../../data/indoor/opt_slim_wp_2_6.json'
import OSWP39 from '../../data/indoor/opt_slim_wp_3_9.json'
import OSWP48 from '../../data/indoor/opt_slim_wp_4_8.json'
import OP from '../../data/indoor/opt_poster.json'
import OTV from '../../data/indoor/opt_tv.json'
import OWIN from '../../data/indoor/opt_win.json'
import OCOOL from '../../data/indoor/opt_cool.json'
import OSCORE from '../../data/indoor/opt_score.json'

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';

import { setModule, setModuleVariation } from '../../state/moduleMenu/moduleMenuSlice';

const ModuleSelector = () => {

        //these first two are just for rendering the options as a whole
    const indoorModules = [
        { name: OP2.name, data: OP2 },
        { name: OS.name, data: OS },
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

    ]
    const outdoorModules = [
        { name: IM2.name, data: IM2 },
        { name: ISMD.name, data: ISMD },
        { name: IRGB.name, data: IRGB },
        { name: IGS.name, data: IGS },
        { name: ESMD.name, data: ESMD },
        { name: IOSMD.name, data: IOSMD }
    ]

    // const optSlimReg = { name: OS.name, data: OS };

    // //these are classifying arrays, used to determine which renderer to use
    // const regularModules = {
    //     indoor: [
    //         { name: OP1.name, data: OP1 },
    //         { name: OP2.name, data: OP2 },
    //         { name: IOSMD.name, data: IOSMD },
    //         { name: OP.name, data: OP },
    //         { name: OWIN.name, data: OWIN }
    //     ],
    //     //outdoor regulars have the appendage logic
    //     outdoor: [
    //         { name: IM2.name, data: IM2 },
    //         { name: ISMD.name, data: ISMD },
    //         { name: IRGB.name, data: IRGB },
    //         { name: IGS.name, data: IGS },
    //         { name: ESMD.name, data: ESMD }
    //     ]
    // }

    // const wpModules = [
    //     { name: 'Opt-Slim WP 1.9mm', data: OSWP19 },
    //     { name: 'Opt-Slim WP 2.5mm', data: OSWP25 },
    //     { name: 'Opt-Slim WP 2.6mm', data: OSWP26 },
    //     { name: 'Opt-Slim WP 3.9mm', data: OSWP39 },
    //     { name: 'Opt-Slim WP 4.8mm', data: OSWP48 }
    // ]
    // const horizontalModules = [
    //     //all these happen to be indoor modules
    //     { name: OTV.name, data: OTV },
    //     { name: OCOOL.name, data: OCOOL },
    //     { name: OSCORE.name, data: OSCORE }
    // ];



    const dispatch = useDispatch();
    const indoorOutdoor = useSelector((state: RootState) => state.moduleMenu.indoorOutdoor);
    const module = useSelector((state: RootState) => state.moduleMenu.module);
    //const moduleVariation = useSelector((state: RootState) => state.menu.moduleVariation);

    const handleSetModule = (module: string) => {
        switch (module) {
            case OP2.value:
                dispatch(setModule(OP2));
                break;
            case OS.value:
                dispatch(setModule(OS));
                break;
            case OSWP19.value:
                dispatch(setModule(OSWP19));
                break;
            case OSWP25.value:
                dispatch(setModule(OSWP25));
                break;
            case OSWP26.value:
                dispatch(setModule(OSWP26));
                break;
            case OSWP39.value:
                dispatch(setModule(OSWP39));
                break;
            case OSWP48.value:
                dispatch(setModule(OSWP48));
                break;
            case OP1.value:
                dispatch(setModule(OP1));
                break;
            case OP.value:
                dispatch(setModule(OP));
                break;
            case OTV.value:
                dispatch(setModule(OTV));
                break;
            case OWIN.value:
                dispatch(setModule(OWIN));
                break;
            case OCOOL.value:
                dispatch(setModule(OCOOL));
                break;
        }
    }   

    const handleSetModuleVariation = (variation: string) => {
        dispatch(setModuleVariation(variation));
    }


    return (
        <>

            {/*if indoorOutdoor is indoor, render indoor modules, otherwise render outdoor modules*/}
            {indoorOutdoor === 'indoor' ? (
                <select onChange={(event) => handleSetModule(event.target.value)}>
                    <option value="" disabled selected>Choose a module</option>
                    {indoorModules.map((module, index) => {
                        return (
                            <option key={index} value={module.data.value}>{module.name}</option>
                        )
                    })}
                </select>
            ) : (
                <select onChange={(event) => handleSetModule(event.target.value)}>
                    <option value="" disabled selected>Choose a module</option>
                    {outdoorModules.map((module, index) => {
                        return (
                            <option key={index} value={module.data.value}>{module.name} </option>
                        )
                    })}
                </select>
            )}
            {/*only render the module variation selector if the module is not empty*/}
            {module && 
                <select onChange={(event) => handleSetModuleVariation(event.target.value)}>
                    <option value="" disabled selected>Choose a variation</option>
                    {module?.variations?.map((variation, index) => {
                        return (
                            <option key={index} value={variation.id}>{variation.name}</option>
                        )
                    })}
                </select>
            }
            {/*only render the module variation selector if the module is not empty*/}
        </>
    )

};  


export default ModuleSelector;