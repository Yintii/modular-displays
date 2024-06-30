export function checkModulesBoundsTooLarge(modulesBounds) {
    return modulesBounds.bottom >= window.innerHeight || modulesBounds.right >= window.innerWidth;
}

export function checkModulesBoundsShrinking(displayDimensions, oldDisplayDimensions, scale) {
    if(scale == 100) return false
    if(displayDimensions.height < oldDisplayDimensions.height || displayDimensions.width < oldDisplayDimensions.width) {
        return displayDimensions.height + (displayDimensions.height * .1) < window.innerHeight && displayDimensions.width + (displayDimensions.width * .1) < window.innerWidth;
    }else{
        return false;
    }
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
    setOverallScale
){

    let bounds;

    if (type == 'display') {
        bounds = module_area.current.getBoundingClientRect();
    } else {
        if (fixed_wall.current == null) return;
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
            setOverallScale(currentScale - 5);
        }
    } else if (currentScale != 100 && bounds.right <= window.innerWidth && bounds.bottom <= window.innerHeight) {
        if (checkModulesBoundsTooLarge(scaledBounds)) {
            return
        } else {
            console.log('scaling down...');
            setOverallScale(currentScale + 2.5);
        }
    }

}