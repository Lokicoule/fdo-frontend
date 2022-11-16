export enum ThemeColorEnum {
  LIGHT = "light",
  DARK = "dark",
}

function factory(value: string): ThemeColorEnum {
  switch (value.toLowerCase()) {
    case ThemeColorEnum.LIGHT.toString():
      return ThemeColorEnum.LIGHT;
    case ThemeColorEnum.DARK.toString():
      return ThemeColorEnum.DARK;
    default:
      return ThemeColorEnum.LIGHT;
  }
}

export function getThemeColor(value: string): ThemeColorEnum {
  return factory(value);
}
