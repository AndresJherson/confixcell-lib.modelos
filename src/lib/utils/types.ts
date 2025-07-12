type NonMethodKeys<T> = {
    [K in keyof T]: T[K] extends ( ...args: any[] ) => any ? never : K
}[keyof T];

type DataProps<T> = Pick<T, NonMethodKeys<T>>;

type Optional<T> = {
    [K in keyof T]?: T[K] | null;
}

export type OptionalModel<T> = Optional<DataProps<T>> & Record<string, any>;