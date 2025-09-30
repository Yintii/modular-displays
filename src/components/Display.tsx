import { RootState } from '../state/store';
import { useSelector } from 'react-redux';
import RegularContent from './RegularContent';
import OSRegContent from './OSRegContent';

interface DisplayProps {
    module_area: React.RefObject<HTMLDivElement>;
    
}

const Display = (props: DisplayProps) => {

    const renderer = useSelector((state: RootState) => state.moduleMenu.renderer);

    return (
        <div id="display">
            {renderer === 'regular' && <RegularContent module_area={props.module_area}/>}
            {renderer === 'opt_slim_reg' && <OSRegContent module_area={props.module_area}/>}
        </div>
    );
}

export default Display;