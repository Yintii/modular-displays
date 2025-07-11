import { useEffect, useRef } from 'react';
import MenuComponent from './components/MenuComponent'
import FixedWall from './components/FixedWall'
import Display from './components/Display'
import { RootState } from './state/store';
import { useSelector, useDispatch } from 'react-redux';
import { setOverallScale, setFixedWallScale } from './state/menu/menuSlice';
import man from './assets/man.svg';
//@ts-expect-error jbc
import { scaleArea, roundToFixedUp } from './lib/helpers';


export interface FixedWallProps {
    fixed_wall: React.RefObject<HTMLDivElement>;
    regular_module_area: React.RefObject<HTMLDivElement>;
}

export interface DisplayProps {
    regular_module_area: React.RefObject<HTMLDivElement>;
}

function App() {

  const dispatch = useDispatch();

  const module = useSelector((state: RootState) => state.moduleMenu.module);
  const moduleVariation = useSelector((state: RootState) => state.moduleMenu.moduleVariation);
  const displayDimensions = useSelector((state: RootState) => state.menu.displayDimensions);
  const displayResolution = useSelector((state: RootState) => state.menu.displayResolution);
  const fixedWallDimensions = useSelector((state: RootState) => state.menu.wallDimensions);
  const innerDimensions = useSelector((state: RootState) => state.menu.innerDimensions);
  const totalModules = useSelector((state: RootState) => state.menu.totalModules);
  const renderer = useSelector((state: RootState) => state.moduleMenu.renderer);
  const overallScale = useSelector((state: RootState) => state.menu.overallScale);
  const fixedWallScale = useSelector((state: RootState) => state.menu.fixedWallScale);

  const regular_module_area = useRef<HTMLDivElement>(null);
  const fixed_wall = useRef<HTMLDivElement>(null);
  

  const InfoBar = () => {
    if(module && moduleVariation && moduleVariation.resolution) {
      return(
        <div id="info">
          <p>Module: {module.name}</p>
          <p>Variation: {moduleVariation.name}</p>
          <p>Display Height: ~{ roundToFixedUp(innerDimensions.height, 2) } </p> 
          <p>Display Width:  ~{ roundToFixedUp(innerDimensions.width, 2) } </p>
          <p>Resolution: {displayResolution.width} x {displayResolution.height}</p>
          <p>Total Modules: {totalModules}</p>
        </div>
      );
    }else{
      return(
        <div id="info">
          <p>Module: - </p>
          <p>Variation: - </p>
          <p>Display Height: -</p>
          <p>Display Width: -</p>
          <p>Resolution: - </p>
          <p>Total Modules: -</p>
        </div>
      );
    }
  }


  //The scaling logic for the display and the fixed wall will need to have variations for each as well so that 
  //the logic for the margins is appropriately handled for each case
  useEffect(() => {
    if(Number(fixedWallDimensions.width) > 0 && Number(fixedWallDimensions.height) > 0) return;
      if(renderer === 'regular'){
        scaleArea('display', overallScale, regular_module_area, fixed_wall, displayDimensions, setOverallScale, dispatch);
      }
      //else if(renderer === 'horizontal'){
      //   scaleArea('display', overallScale, horizontal_area, fixed_wall, displayDimensions, setOverallScale, dispatch);
      // } else if(renderer === 'wp'){
      //   scaleArea('display', overallScale, wp_area, fixed_wall, displayDimensions, setOverallScale, dispatch);
      // } else if(renderer === 'opt_slim_reg'){
      //   scaleArea('display', overallScale, opt_slim_reg_area, fixed_wall, displayDimensions, setOverallScale, dispatch);
      // }
    }, [displayDimensions, overallScale, fixedWallDimensions, renderer]);

  useEffect(() => {
    if(Number(fixedWallDimensions.width) == 0 || Number(fixedWallDimensions.height) == 0) return;
    if(renderer === 'regular'){
       scaleArea('fixed_wall', fixedWallScale, regular_module_area, fixed_wall, fixedWallDimensions, setFixedWallScale, dispatch);
    }
  //  else if(renderer === 'horizontal'){
  //     scaleArea('fixed_wall', fixedWallScale, horizontal_area, fixed_wall, fixedWallDimensions, setFixedWallScale);
  //   }else if(renderer === 'wp'){
  //     scaleArea('fixed_wall', fixedWallScale, wp_area, fixed_wall, fixedWallDimensions, setFixedWallScale);
  //   }else if(renderer === 'opt_slim_reg'){
  //     scaleArea('fixed_wall', fixedWallScale, opt_slim_reg_area, fixed_wall, fixedWallDimensions, setFixedWallScale);
  //   }
   }, [fixedWallDimensions, fixedWallScale, renderer]);

  useEffect(() => {
	const renderingArea = document.querySelector('.rendering-area') as HTMLElement;
    if (!renderingArea)return;
    // if the display dimensions are larger than non zero fixed wall dimensions, we want to change the background color of the modules to be a transparent red color
    if((Number(innerDimensions.width) > Number(fixedWallDimensions.width)) && (Number(fixedWallDimensions.width) > 0) && (Number(fixedWallDimensions.height) > 0)
      || (Number(innerDimensions.height) > Number(fixedWallDimensions.height)) && (Number(fixedWallDimensions.width) > 0) && (Number(fixedWallDimensions.height) > 0)){
      renderingArea.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
    }else{
      renderingArea.style.backgroundColor = 'rgba(255, 255, 255, 1)';
    }
    }, [displayDimensions, fixedWallDimensions, innerDimensions, regular_module_area])

  return (
    <>
      <MenuComponent />
      <main id="visual-area">
        <img id="man" src={man} height={175} width={122} style={{ scale: `${fixedWallDimensions.width === 0 || fixedWallDimensions.height === 0 ? overallScale : fixedWallScale}%`, zIndex: 5}} />
        <InfoBar />
        {module.name && moduleVariation.name && displayDimensions.height !== 0 && displayDimensions.width !== 0 && (
          <div id="renderingArea">
            {fixedWallDimensions.width == 0 && fixedWallDimensions.height == 0 ? (
              <Display 
                regular_module_area={regular_module_area} 
              />
            ) : (
              <FixedWall 
                fixed_wall={fixed_wall} 
                regular_module_area={regular_module_area}
              />
            )}
          </div>
        )}

      </main>
      
   
    </>
  )
}

export default App
