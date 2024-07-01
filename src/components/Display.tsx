import { RootState } from '../state/store';
import { useSelector } from 'react-redux';
import RegularContent from './RegularContent';

const Display = () => {

    const renderer = useSelector((state: RootState) => state.moduleMenu.renderer);

    return (
        <div id="display">
            {renderer === 'regular' && <RegularContent />}
        </div>
    );
}

export default Display;