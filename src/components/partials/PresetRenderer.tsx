import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import { roundToFixedUp } from '../../lib/helpers';
import { setDisplayHeight, setDisplayWidth, setTotalModules } from '../../state/menu/menuSlice';
import { setPreset } from '../../state/moduleMenu/moduleMenuSlice';
const PresetRenderer = () => {

  const dispatch = useDispatch();

  const module = useSelector((state: RootState) => state.moduleMenu.module);
  const moduleVariation = useSelector((state: RootState) => state.moduleMenu.moduleVariation);
  const preset = useSelector((state: RootState) => state.moduleMenu.preset);
  const indoorOutdoor = useSelector((state: RootState) => state.moduleMenu.indoorOutdoor);

  const foot = 30;
  const inch = 2.5;

  const handleSetPreset = (preset: string) => {
    dispatch(setPreset(preset));
  }

  useEffect(() => {

    const processPreset = ( resolutionWidth: number, resolutionHeight: number) => {
      let width_mods = 0;
      let height_mods = 0;

      for (let i = 0; i < resolutionWidth; i += moduleVariation.resolution.width) {
        width_mods++;
      }
      for (let i = 0; i < resolutionHeight; i += moduleVariation.resolution.height) {
        height_mods++;
      }

      dispatch(setTotalModules(width_mods * height_mods));

      const width = width_mods * moduleVariation.physical_dimensions_inches.width * inch;
      const height = height_mods * moduleVariation.physical_dimensions_inches.height * inch;

      const final_width = roundToFixedUp(width / foot, 2);
      const final_height = roundToFixedUp(height / foot, 2);

      dispatch(setDisplayWidth(final_width));
      dispatch(setDisplayHeight(final_height));
    }

    const processPresetBySize = (width_feet: number, height_feet: number) => {
      const width_mods = width_feet / moduleVariation.physical_dimensions_inches.width * inch;
      const height_mods = height_feet / moduleVariation.physical_dimensions_inches.height * inch;

      dispatch(setTotalModules(width_mods * height_mods));
      dispatch(setDisplayHeight(height_feet));
      dispatch(setDisplayWidth(width_feet));
    }

    switch(preset){
      case ('standard'):
        processPreset(1920, 1080);
        break;
      case ('2k'):
        processPreset(2048, 1080);
        break;
      case ('4k'):
        processPreset(3840, 2160);
        break;
      case ('8k'):
        processPreset(7680, 4320);
        break;
      case ('bb1'):
        processPresetBySize(40, 10);
        break; 
      case ('bb2'):
        processPresetBySize(40, 10.5);
        break;
      case ('bb3'):
        processPresetBySize(45, 14);
        break;
      default:
        console.log('Unrecognized preset');
    }
  }, [preset, moduleVariation, dispatch])



    if (!module.ruleset) return null;

    const noPreset = (module.ruleset.preset_1 === false || module.ruleset.preset_1 === undefined) && 
                     (module.ruleset.preset_2 === false || module.ruleset.preset_2 === undefined) && 
                     (module.ruleset.preset_3 === false || module.ruleset.preset_3 === undefined) && 
                     (module.ruleset.preset_4 === false || module.ruleset.preset_4 === undefined);

      const outdoorPreset = () => {
        if (!module || !module.ruleset) return null;
        return (
            <div className='preset-buttons'>
                {module.ruleset.preset_1 &&
                    <div className='preset-btn' onClick={() => handleSetPreset('standard')}>1080x1920</div>
                }
                {module.ruleset.preset_2 &&
                    <div className='preset-btn'  onClick={() => handleSetPreset('bb1')}>10'H x 40'W</div>
                }
                {module.ruleset.preset_3 &&
                    <div className='preset-btn' onClick={() => handleSetPreset('bb2')}>10.5'H x 40'W</div>
                }
                {module.ruleset.preset_4 &&
                    <div className='preset-btn' onClick={() => handleSetPreset('bb3')}>14'H x 48'W</div>
                }
                {noPreset &&
                    <p>no preset</p>
                }
            </div>
        )
    }

    const indoorPreset = () => {
        if(!module || !module.ruleset) return null;
        return (
            <div className='preset-buttons'>
                {module.ruleset.preset_1 &&
                    <div className='preset-btn' onClick={() => handleSetPreset('standard')}>1080x1920</div>
                }
                {module.ruleset.preset_2 &&
                    <div className='preset-btn' onClick={() => handleSetPreset('2k')}>2k</div>
                }
                {module.ruleset.preset_3 &&
                    <div className='preset-btn' onClick={() => handleSetPreset('4k')}>4k</div>
                }
                {module.ruleset.preset_4 &&
                    <div className='preset-btn' onClick={() => handleSetPreset('8k')}>8k</div>
                }
                {noPreset &&
                    <p>no preset</p>
                }
            </div>
        )
    }
    
      return (
        <div>
            {indoorOutdoor == 'indoor' 
                ? indoorPreset()
                : outdoorPreset()
            }
        </div>
  )
}

export default PresetRenderer;