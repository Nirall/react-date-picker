import { style } from "../../model/data";

type TSelectorItem<T> = {
  value: T,
  name: string,
  active: boolean,
}

type TSelectorProps<T> = {
  items: TSelectorItem<T>[],
  onChange: (value: TSelectorItem<T>) => void;
  style?: Partial<typeof style>;
}

export type { TSelectorProps };
