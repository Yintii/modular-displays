import { useSelector } from 'react-redux';
import { RootState } from '../../state/store'



const GeneratedModules = () => {
    const modules = [];
    //generates the reg and horizontal modules

    const module = useSelector((state: RootState) => state.moduleMenu.module);
    //const halves = useSelector((state: RootState) => state.moduleMenu.halves);
    const moduleVariation = useSelector((state: RootState) => state.moduleMenu.moduleVariation);
    const totalMods = useSelector((state: RootState) => state.menu.totalModules);

    const inch = 2.5;

    console.log("Module: ", module)
   // halves ? console.log("Halves: ", halves) : console.log("No halves")

    if (moduleVariation && module?.name !== "Opt-Slim [2.6-4.8mm]"){
        console.log("rendering reg or horizontal")
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
                    {i + 1}
                </div>
            )
        }
    } 
    // else if (props.module?.name === "Opt-Slim [2.6-4.8mm]"){
    //     console.log("rendering opt slim")
    //     for (let i = 0; i < props.totalMods; i++) {
    //         modules.push(
    //             <div
    //                 key={i}
    //                 className="module"
    //                 style={{
    //                     width: `${props.moduleVariation.physical_dimensions_inches.width * props.inch}px`,
    //                     height: `${props.moduleVariation.physical_dimensions_inches.height * props.inch}px`,
    //                     border: 'dotted grey 1px'
    //                 }}
    //             >
    //                 {i + 1}
    //             </div>
    //         )
    //     }
    //     console.log("props.halves", props.halves)
    //     if(props.halves > 0){
    //         console.log('Generating halves')
    //         for (let i = props.totalMods; i < props.totalMods + props.halves; i++) {
    //             modules.push(
    //                 <div
    //                     key={i}
    //                     className="module"
    //                     style={{
    //                         width: `${props.moduleVariation.physical_dimensions_inches.width * props.inch}px`,
    //                         height: `${(props.moduleVariation.physical_dimensions_inches.height * props.inch) / 2}px`,
    //                         border: 'dotted grey 1px'
    //                     }}
    //                 >
    //                     {i + 1}
    //                 </div>
    //             )
    //         }
    //     }
    // }
    // else{//generates the wp modules
    //     if(props.fives > 0){
    //         for (let i = 0; i < props.fives; i++) {
    //             modules.push(
    //                 <div
    //                     key={i}
    //                     className="module"
    //                     style={{
    //                         width: `${props.fivesWidth}px`,
    //                         height: `${props.wpHeight}px`,
    //                         border: 'dotted grey 1px'
    //                     }}
    //                 >
    //                     {i + 1}
    //                 </div>
    //             )
    //         }
    //     }
    //     if(props.fours > 0){
    //         for(let i = props.fives; i < props.fives + props.fours; i++){
    //             modules.push(
    //                 <div
    //                     key={i}
    //                     className="module"
    //                     style={{
    //                         width: `${props.foursWidth}px`,
    //                         height: `${props.wpHeight}px`,
    //                         border: 'dotted grey 1px'
    //                     }}
    //                 >
    //                     {i + 1}
    //                 </div>
    //             )
    //         }
    //     }
    //     if(props.threes > 0){
    //         for(let i = props.fives + props.fours; i < props.fives + props.fours + props.threes; i++){
    //             modules.push(
    //                 <div
    //                     key={i}
    //                     className="module"
    //                     style={{
    //                         width: `${props.threesWidth}px`,
    //                         height: `${props.wpHeight}px`,
    //                         border: 'dotted grey 1px'
    //                     }}
    //                 >
    //                     {i + 1}
    //                 </div>
    //             )
    //         }
    //     }
    //     if(props.twos > 0){
    //         for(let i = props.fives + props.fours + props.threes; i < props.fives + props.fours + props.threes + props.twos; i++){
    //             modules.push(
    //                 <div
    //                     key={i}
    //                     className="module"
    //                     style={{
    //                         width: `${props.twosWidth}px`,
    //                         height: `${props.wpHeight}px`,
    //                         border: 'dotted grey 1px'
    //                     }}
    //                 >
    //                     {i + 1}
    //                 </div>
    //             )
    //         }
    //     }
    // }
    return modules;
};

export default GeneratedModules;