import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import { setModule, setModuleVariation } from '../../state/moduleMenu/moduleMenuSlice';

const ModuleSelector = () => {
    
    const dispatch = useDispatch();

    const indoorOutdoor  = useSelector((state: RootState) => state.moduleMenu.indoorOutdoor);
    const module         = useSelector((state: RootState) => state.moduleMenu.module);
    
    const indoorModules     = useSelector((state: RootState) => state.moduleMenu.indoorModules);    
    const outdoorModules    = useSelector((state: RootState) => state.moduleMenu.outdoorModules);

    // const regularModules    = useSelector((state: RootState) => state.moduleMenu.regularModules);
    // const wpModules         = useSelector((state: RootState) => state.moduleMenu.wpModules);
    // const horizontalModules = useSelector((state: RootState) => state.moduleMenu.horizontalModules);
    // const optSlimReg        = useSelector((state: RootState) => state.moduleMenu.optSlimReg);
    
    const IM2    = useSelector((state: RootState) => state.moduleMenu.IM2);
    const ISMD   = useSelector((state: RootState) => state.moduleMenu.ISMD);
    const IRGB   = useSelector((state: RootState) => state.moduleMenu.IRGB);
    const IGS    = useSelector((state: RootState) => state.moduleMenu.IGS);
    const ESMD   = useSelector((state: RootState) => state.moduleMenu.ESMD);
    const IOSMD  = useSelector((state: RootState) => state.moduleMenu.IOSMD);
    const OP2    = useSelector((state: RootState) => state.moduleMenu.OP2);
    const OS     = useSelector((state: RootState) => state.moduleMenu.OS);
    const OP     = useSelector((state: RootState) => state.moduleMenu.OP);


    const handleSetModule = (module: string) => {
        switch (module) {
            case OP2.value:
                dispatch(setModule(OP2));
                break;
            case OS.value:
                dispatch(setModule(OS));
                break;
            case OP.value:
                dispatch(setModule(OP));
                break;
            case IM2.value:
                dispatch(setModule(IM2));
                break;
            case ISMD.value:
                dispatch(setModule(ISMD));
                break;
            case IRGB.value:
                dispatch(setModule(IRGB));
                break;
            case IGS.value:
                dispatch(setModule(IGS));
                break;
            case ESMD.value:
                dispatch(setModule(ESMD));
                break;
            case IOSMD.value:
                dispatch(setModule(IOSMD));
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
                            <option key={index} value={variation.name}>{variation.name}</option>
                        )
                    })}
                </select>
            }
            {/*only render the module variation selector if the module is not empty*/}
        </>
    )

};  


export default ModuleSelector;
