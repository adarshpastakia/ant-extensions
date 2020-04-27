// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

export const withinDropdown = (target: HTMLElement | null) => {
  do {
    if (target) {
      if (target.classList.contains("ant-ext-sd__popover")) {
        return true;
      }
      target = target.parentElement;
    }
  } while (target !== null);
  return false;
};
