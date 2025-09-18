/**
 * Auxiliares
 */

// Tipo helper para detectar objetos (excluyendo arrays, dates, etc.)
type IsObject<T> = T extends object 
    ? T extends any[] 
        ? false 
        : T extends Date 
            ? false 
            : T extends Function 
                ? false 
                : true 
    : false;

// Version superficial
type Optional<T> = {
    [K in keyof T]?: T[K] | null;
}


/**
 * Produccion
 */

type NonMethodKeys<T> = {
    [K in keyof T]: T[K] extends ( ...args: any[] ) => any ? never : K
}[keyof T];

type DataProps<T> = Pick<T, NonMethodKeys<T>>;

// Versión recursiva profunda de Optional
type DeepOptional<T> = {
    [K in keyof T]?: T[K] extends infer U
        ? U extends null | undefined
            ? U
            : U extends object
                ? OptionalModel<U>
                : U | null | undefined
        : never;
};

export type OptionalModel<T> = ( DeepOptional<DataProps<T>> & Record<string, any> ) | null | undefined;