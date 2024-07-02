import { RootState } from '../state/store';
import { useSelector } from 'react-redux';
import RegularContent from './RegularContent';

interface DisplayProps {
    regular_module_area: React.RefObject<HTMLDivElement>;
    
}

const Display = (props: DisplayProps) => {

    const renderer = useSelector((state: RootState) => state.moduleMenu.renderer);

    return (
        <div id="display">
            {renderer === 'regular' && <RegularContent regular_module_area={props.regular_module_area}/>}
        </div>
    );
}

export default Display;