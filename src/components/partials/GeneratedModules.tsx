import { useSelector } from 'react-redux';
import { RootState } from '../../state/store'



const GeneratedModules = () => {
    const modules = [];
    
    const moduleVariation = useSelector((state: RootState) => state.moduleMenu.moduleVariation);
    const totalMods = useSelector((state: RootState) => state.menu.totalModules);
    const halves = useSelector((state: RootState) => state.moduleMenu.halves);

    const renderer = useSelector((state: RootState) => state.moduleMenu.renderer);

    const mods_needed_for_width = useSelector((state: RootState) => state.menu.modulesNeededForWidth);

    const inch = 2.5;

    if (renderer === 'regular' || renderer === 'horizontal'){
        for (let i = 0; i < totalMods; i++) {
            modules.push(
                <div
                    key={i}
                    className="module"
                    style={{
                        width: `${moduleVariation.physical_dimensions_inches.width * inch}px`,
                        height: `${moduleVariation.physical_dimensions_inches.height * inch}px`,
                        border: 'dotted grey 1px'
                    }}
                >
                    {(i + 1)}
                </div>
            )
        }
    } 
    else if (renderer === 'opt_slim_reg'){
        
        if(halves){
            console.log('Generating halves')
            for (let i = 0; i < mods_needed_for_width; i++) {
                modules.push(
                    <div
                        key={i}
                        className="module"
                        style={{
                            width: `${moduleVariation.physical_dimensions_inches.width * inch}px`,
                            height: `${(moduleVariation.physical_dimensions_inches.height * inch) / 2}px`,
                            border: 'dotted grey 1px'
                        }}
                    >
                        {i + 1}
                    </div>
                )
            }
            for (let i = mods_needed_for_width; i < totalMods; i++) {
            modules.push(
                <div
                    key={i}
                    className="module"
                    style={{
                        width: `${moduleVariation.physical_dimensions_inches.width * inch}px`,
                        height: `${moduleVariation.physical_dimensions_inches.height * inch}px`,
                        border: 'dotted grey 1px'
                    }}
                >
                    {(i + 1)}
                </div>
            )
        }
    }else{
        for (let i = 0; i < totalMods; i++) {
            modules.push(
                <div
                    key={i}
                    className="module"
                    style={{
                        width: `${moduleVariation.physical_dimensions_inches.width * inch}px`,
                        height: `${moduleVariation.physical_dimensions_inches.height * inch}px`,
                        border: 'dotted grey 1px'
                    }}
                >
                    {(i + 1)}
                </div>
            )
        }
    }
    }

    return modules;
};

export default GeneratedModules;
