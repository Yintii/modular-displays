export function checkModulesBoundsTooLarge(modulesBounds) {
    return modulesBounds.bottom >= window.innerHeight || modulesBounds.right >= window.innerWidth;
}

export function roundToFixedUp(number, decimalPlaces) {
    const multiplier = 10 ** decimalPlaces
    const roundedVal = Math.ceil(number * multiplier) / multiplier;
    return roundedVal.toFixed(decimalPlaces);
}

export function scaleArea(
    type,
    currentScale,
    module_area,
    fixed_wall,
    displayDimensions,
    setOverallScale,
    dispatch,
){
    if(module_area == null || !module_area.current) return


    let bounds;
    if (type == 'display') {
        bounds = module_area.current.getBoundingClientRect();
    } else {
        if (fixed_wall == null) return;
        bounds = fixed_wall.current.getBoundingClientRect();
    }


    //create as sudo bounds object where the right and bottom values are scaled up by 5%
    let scaledBounds = {
        top: bounds.top,
        left: bounds.left,
        right: bounds.right + (bounds.right * .05) + 5,
        bottom: bounds.bottom + (bounds.bottom * .05) + 5
    }

    

    if (checkModulesBoundsTooLarge(bounds) && currentScale != 5) {
        const max_width = window.innerWidth - bounds.x;
        const max_height = window.innerHeight - bounds.y;

        if (max_width <= displayDimensions.width * 30 || max_height <= displayDimensions.height * 30 && currentScale != 5) {
            console.log('scaling up...');
            dispatch(setOverallScale(currentScale - 5));
        }
    } else if (currentScale != 100 && bounds.right <= window.innerWidth && bounds.bottom <= window.innerHeight) {
        if (checkModulesBoundsTooLarge(scaledBounds)) {
            return
        } else {
            console.log('scaling down...');
            dispatch(setOverallScale(currentScale + 2.5));
        }
    }

}