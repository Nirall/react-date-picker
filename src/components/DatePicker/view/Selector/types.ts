type TSelectorItem<T> = {
  value: T,
  name: string,
  active: boolean,
}

type TSelectorProps<T> = {
  items: TSelectorItem<T>[],
  onChange: (value: TSelectorItem<T>) => void;
}

export type { TSelectorProps };
