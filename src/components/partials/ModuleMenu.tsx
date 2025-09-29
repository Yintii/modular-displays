import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import PresetRenderer from './PresetRenderer.tsx';

import {
  setIndoorOutdoor,
} from '../../state/moduleMenu/moduleMenuSlice.ts';
import ModuleSelector from './ModuleSelector.tsx';

const ModuleMenu = () => {

    const dispatch = useDispatch();
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
              >
                Outdoor
            </div>
            <div 
              id="indoor-tab" 
              onClick={() => handleSetIndoorOutdoor('indoor')} 
              className="selected-tab">
                Indoor
            </div>
        </div>
        <div id="module-selector-content">
            <ModuleSelector />
        </div>
        {moduleVariation && 
          <>
            <h3>Presets</h3>
            <PresetRenderer />
          </>
        }
    </div>
  )
}

export default ModuleMenu;
