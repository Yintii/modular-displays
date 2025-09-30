import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import PresetRenderer from './PresetRenderer.tsx';

import {
  setIndoorOutdoor,
} from '../../state/moduleMenu/moduleMenuSlice.ts';
import ModuleSelector from './ModuleSelector.tsx';
import { useEffect } from 'react';

const ModuleMenu = () => {

    const dispatch = useDispatch();
    const moduleVariation = useSelector((state: RootState) => state.moduleMenu.moduleVariation);
    const handleSetIndoorOutdoor = (indoorOutdoor: string) => {
        dispatch(setIndoorOutdoor(indoorOutdoor));
    }


    useEffect(() =>{
      const indoorTab = document.getElementById('indoor-tab');
      const outdoorTab = document.getElementById('outdoor-tab');

      indoorTab?.addEventListener('click', () => {
        if(indoorTab.classList.contains('selected-tab')) return;
        indoorTab.classList.add('selected-tab');
        outdoorTab?.classList.remove('selected-tab');
      });
      
      outdoorTab?.addEventListener('click', () => {
        if(outdoorTab.classList.contains('selected-tab')) return;
        outdoorTab.classList.add('selected-tab');
        indoorTab?.classList.remove('selected-tab');
      });
    }, []);


  return (
    <div id="module-selector">
        <div id="toggle-tabs">
            <div 
              id="outdoor-tab" 
              onClick={() => handleSetIndoorOutdoor('outdoor')}
              className="tab"
              >
                Outdoor
            </div>
            <div 
              id="indoor-tab" 
              onClick={() => handleSetIndoorOutdoor('indoor')} 
              className="selected-tab tab">
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
