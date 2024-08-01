import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import GeneratedModules from './partials/GeneratedModules';

interface DisplayProps {
    regular_module_area: React.RefObject<HTMLDivElement>;
}

const RegularRenderingArea = (props: DisplayProps) => {
  
    const displayDimensions = useSelector((state: RootState) => state.menu.displayDimensions);
    const moduleVariation = useSelector((state: RootState) => state.moduleMenu.moduleVariation);
    const displayMargins = useSelector((state: RootState) => state.menu.displayMargins);
    const moduleFactor = useSelector((state: RootState) => state.moduleMenu.moduleFactor);
    const overallScale = useSelector((state: RootState) => state.menu.overallScale);
    const fixedWallScale = useSelector((state: RootState) => state.menu.fixedWallScale);

    const foot = 30;

    console.log("Rendering ref: ", props.regular_module_area.current)

  return (
    <div
        ref={props.regular_module_area}
        className="rendering-area"
        style={{
            width:  `${displayDimensions.width * foot + 2}px`,
            height: `${displayDimensions.height * foot + 2}px`,
            border: 'dashed grey 1px',
            scale: `${fixedWallScale ? 100 : overallScale}%`,
            top: `${fixedWallScale ? '' : '50%'}`
        }}
    >
        <div 
            className="mod-wrapper"
            style={{                
                flexFlow: moduleFactor > 1 ? 'column wrap' : 'row wrap',
                top: '35%',
                margin: `${displayMargins.height / 2}px ${displayMargins.width / 2}px`,
            }}
        >
            {moduleVariation && (
                <GeneratedModules /> 
            )}
        </div>       
    </div>
  )
}

export default RegularRenderingArea;
