import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';

import {
    setIndoorOutdoor,
} from '../../state/moduleMenu/moduleMenuSlice.ts';
import ModuleSelector from './ModuleSelector.tsx';

const ModuleMenu = () => {

    const dispatch = useDispatch();

    const module = useSelector((state: RootState) => state.moduleMenu.module);
    const moduleVariation = useSelector((state: RootState) => state.moduleMenu.moduleVariation);

    const handleSetIndoorOutdoor = (indoorOutdoor: string) => {
        dispatch(setIndoorOutdoor(indoorOutdoor));
    }


  return (
    <div id="module-selector">
        <div id="toggle-tabs">
            <div 
              id="outdoor-tab" 
              onClick={() => handleSetIndoorOutdoor('outdoor')} 
              className="tab">
                Outdoor
            </div>
            <div 
              id="indoor-tab" 
              onClick={() => handleSetIndoorOutdoor('indoor')} 
              className="active tab">
                Indoor
            </div>
        </div>
        <div id="module-selector-content">
            <ModuleSelector />
        </div>
        {/*Here we need to add the logic for the presets, and they should only show once the variation of the module has been selected, or if it's a wp module, then we should the presets available */}
        {moduleVariation && 
          <>
            <h3>Presets</h3>
            <PresetRenderer />
          </>
        }
      {module?.name?.includes('Opt-Slim WP') &&
        <>
          <h3>Presets</h3>
          {/* <PresetRenderer
            displayDimensions={props.displayDimensions}
            module={props.module}
            setPreset={props.setPreset}
            indoorOutdoor={props.indoorOutdoor}
            moduleVariation={props.moduleVariation}
            setDisplayDimensions={props.setDisplayDimensions}
            preset={props.preset}
            inch={props.inch}
            foot={props.foot}
          /> */}
        </>
      }
    </div>
  )
}

export default ModuleMenu;