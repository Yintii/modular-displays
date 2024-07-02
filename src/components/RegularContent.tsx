import { useEffect } from 'react'
import { RootState } from '../state/store';
import { useSelector, useDispatch } from 'react-redux';
import { setInnerDimensions, setDisplayMargins, setDisplayResolution, setTotalModules } from '../state/menu/menuSlice';
import RegularRenderingArea from './RegularRenderingArea';

interface DisplayProps {
    regular_module_area: React.RefObject<HTMLDivElement>;
}

const RegularContent = (props: DisplayProps) => {

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
    
    //we use math.floor for this because it doesn't matter if there's remaining space, we only want to know how many times a whole module can fit in the space, this remaining space will be margin
        const mods_needed_for_width = Math.floor(displayDimensions.width * foot / single_mod_width)
        const mods_needed_for_height = Math.floor(displayDimensions.height * foot / single_mod_height)

        const innerDims = {
        width: mods_needed_for_width * (moduleVariation.physical_dimensions_inches.width * inch),
        height: mods_needed_for_height * (moduleVariation.physical_dimensions_inches.height * inch)
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

    if (mods_needed_for_height > 0 && mods_needed_for_width > 0 && moduleVariation) {
      dispatch(setDisplayResolution({
        width: mod_width_resolution * mods_needed_for_width,
        height: mod_height_resolution * mods_needed_for_height
      }));
    } else {
      dispatch(setDisplayResolution({
        width: 0,
        height: 0
      }));
    }

    //I don't think we need to save the information related to the number needed for height and width, just use it to calculate the space the modules take up then use that to calculate the margin, then use it to calculate the total modules needed to make the rendered display
    const total = mods_needed_for_width * mods_needed_for_height;
    dispatch(setTotalModules(total));

  }, [moduleVariation, displayDimensions, dispatch]);

  return (
    <RegularRenderingArea regular_module_area={props.regular_module_area} />
  )
}

export default RegularContent;
