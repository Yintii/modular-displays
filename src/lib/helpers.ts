// src/lib/helpers.ts

/**
 * Checks if the module bounds exceed the viewport.
 */
export function checkModulesBoundsTooLarge(modulesBounds: DOMRect): boolean {
  return (
    modulesBounds.bottom >= window.innerHeight ||
    modulesBounds.right >= window.innerWidth
  );
}

/**
 * Rounds a number upward to a fixed number of decimal places.
 */
export function roundToFixedUp(num: number, decimalPlaces: number): string {
  const multiplier = 10 ** decimalPlaces;
  const roundedVal = Math.ceil(num * multiplier) / multiplier;
  return roundedVal.toFixed(decimalPlaces);
}

/**
 * Attempts to scale an area up/down depending on its bounds vs the viewport.
 */
export function scaleArea(
  type: "display" | "wall" | "fixed_wall",
  currentScale: number,
  module_area: React.RefObject<HTMLElement> | null,
  fixed_wall: React.RefObject<HTMLElement> | null,
  displayDimensions: { width: number; height: number },
  setOverallScale: (scale: number) => { type: string; payload: number },
  dispatch: (action: { type: string; payload: number }) => void
): void {
  if (!module_area?.current) return;

  let bounds: DOMRect;
  if (type === "display") {
    bounds = module_area.current.getBoundingClientRect();
  } else {
    if (!fixed_wall?.current) return;
    bounds = fixed_wall.current.getBoundingClientRect();
  }

  //Create scaled bounds object where right and bottom values are increased by 5%
  const scaledBounds: DOMRect = {
    ...bounds,
    right: bounds.right + bounds.right * 0.05 + 5,
    bottom: bounds.bottom + bounds.bottom * 0.05 + 5,
  };

  if (checkModulesBoundsTooLarge(bounds) && currentScale !== 5) {
    const max_width = window.innerWidth - bounds.x;
    const max_height = window.innerHeight - bounds.y;

    if (
      max_width <= displayDimensions.width * 30 ||
      (max_height <= displayDimensions.height * 30 && currentScale !== 5)
    ) {
      console.log("scaling up...");
      dispatch(setOverallScale(currentScale - 5));
    }
  } else if (
    currentScale !== 100 &&
    bounds.right <= window.innerWidth &&
    bounds.bottom <= window.innerHeight
  ) {
    if (checkModulesBoundsTooLarge(scaledBounds)) {
      return;
    } else {
      console.log("scaling down...");
      dispatch(setOverallScale(currentScale + 5));
    }
  }
}

