import { useEffect } from 'react'
import { RootState } from '../state/store';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setInnerDimensions, 
  setDisplayMargins, 
  setDisplayResolution, 
  setTotalModules, 
  setModulesNeededForWidth,
  setModulesNeededForHeight
} from '../state/menu/menuSlice';
import RegularRenderingArea from './RegularRenderingArea';
import { setHalves } from '../state/moduleMenu/moduleMenuSlice';

interface DisplayProps {
    module_area: React.RefObject<HTMLDivElement>;
}

const OSRegContent = (props: DisplayProps) => {

    const dispatch = useDispatch();

    const displayDimensions = useSelector((state: RootState) => state.menu.displayDimensions);
    const moduleVariation = useSelector((state: RootState) => state.moduleMenu.moduleVariation);

    const foot = 30;
    const inch = 2.5;

    useEffect(() => {
        if(!moduleVariation || !moduleVariation.physical_dimensions_inches) return;

        const single_mod_width = moduleVariation.physical_dimensions_inches.width * inch;
        const single_mod_height = moduleVariation.physical_dimensions_inches.height * inch;

        const mod_width_resolution = moduleVariation.resolution.width;
        const mod_height_resolution = moduleVariation.resolution.height;

        const mods_needed_for_width = Math.floor(displayDimensions.width * foot / single_mod_width)
        //the mods can be cut in half for the height, so we check for
        //how many time it can regularly fit and what the remaining space is,
        //if it's greater than or equal to half the module height, we can fit one  
        //more row of half modules in there
        //if not, we just use the regular fit
        let half_row_needed = false;
        let mods_needed_for_height = Math.floor((displayDimensions.height * foot) / single_mod_height);

        const remaining_space = (displayDimensions.height * foot) - (mods_needed_for_height * single_mod_height);
        
        if(remaining_space >= (single_mod_height / 2)){
          dispatch(setHalves(true));
          half_row_needed = true;
          mods_needed_for_height += 1;
        }else{
            dispatch(setHalves(false));
            half_row_needed = false;
        }

        const innerDims = {
          width: mods_needed_for_width * (moduleVariation.physical_dimensions_inches.width * inch),
          height: (mods_needed_for_height - (half_row_needed ? 1 : 0)) * (moduleVariation.physical_dimensions_inches.height * inch) + (half_row_needed ? (single_mod_height / 2) : 0)
        }

        dispatch(setInnerDimensions({
            width: innerDims.width / foot,
            height: innerDims.height / foot
        }));

        const displayMargins = {
            width: displayDimensions.width * foot - innerDims.width,
            height: displayDimensions.height * foot - innerDims.height
        }

        dispatch(setDisplayMargins({
            width: displayMargins.width,
            height: displayMargins.height
        }));

        dispatch(setDisplayResolution({
            width: mods_needed_for_width * mod_width_resolution,
            height: mods_needed_for_height * mod_height_resolution
        }))

        
        dispatch(setModulesNeededForWidth(mods_needed_for_width));
        dispatch(setModulesNeededForHeight(mods_needed_for_height));
        const total = mods_needed_for_width * mods_needed_for_height;
        dispatch(setTotalModules(total));

    }, [displayDimensions, moduleVariation, dispatch]);

  return (
    <RegularRenderingArea module_area={props.module_area}/>
  )
}

export default OSRegContent;