/** Lets header / native-stack UI open the menu without relying on React context. */
let openHandler = null;

export function registerAppMenuHandler(handler) {
  openHandler = handler;
}

export function unregisterAppMenuHandler() {
  openHandler = null;
}

export function openAppMenu() {
  openHandler?.();
}
