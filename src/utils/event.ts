export const subscribeEvent = (
  type: keyof typeof CustomEventNames,
  listener: (data?: any) => void,
) => {
  document.addEventListener(type, listener);
};

export const unsubscribeEvent = (
  type: keyof typeof CustomEventNames,
  listener: (data?: any) => void,
) => {
  document.removeEventListener(type, listener);
};

export const publishEvent = (
  type: keyof typeof CustomEventNames,
  data?: any,
) => {
  const event = new CustomEvent(type, { detail: data });
  document.dispatchEvent(event);
};

export enum CustomEventNames {
  mainPages = 'mainPages',
  systemTick = 'systemTick',
  generalTick = 'generalTick',
}
