export type PageTemplate<
  P extends object = object,
  R extends object = object
> = (file: string, props: P) => R;
