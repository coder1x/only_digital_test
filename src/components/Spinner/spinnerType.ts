type Props = {
  current?: number;
  defaultAngle?: number;
  transitionDurationRatio?: number;
  list: { id: number; title: string }[];
  onChange: (id: number) => void;
};

type Config = {
  spinnerElement: HTMLDivElement;
  dots: HTMLButtonElement[];
  dotsAmount: number;
  spinnerRadius: number;
  dotRadius: number;
  singleAngle: number;
};

type Position = {
  configData: Config | null;
  shift?: number;
  defaultAngleArg: number;
  toggleTitleArg: (value: boolean) => void;
  toggleVisibleButtonArg: (value: boolean) => void;
};

export { Props, Config, Position };
