import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

import Display from './Display';

import { FixedWallProps } from '../App';

const FixedWall = (props: FixedWallProps) => {

    const foot = 30;

    const fixedWallDimensions = useSelector((state: RootState) => state.menu.wallDimensions);
    const fixedWallScale = useSelector((state: RootState) => state.menu.fixedWallScale);

  return (
    <div 
        id="fixed-wall"
          ref={props.fixed_wall}
          style={{
              width: `${fixedWallDimensions.width * foot + 2}px`,
              height: `${fixedWallDimensions.height * foot + 2}px`,
              border: 'solid grey 1px',
              scale: `${fixedWallScale}%`,
              top: '45%'
          }}
    >
        <Display module_area={props.module_area}/>
    </div>
    );
}

export default FixedWall;
