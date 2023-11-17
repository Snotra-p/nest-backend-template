// for as const  type makes
export type ConstValue<T extends object> = T[keyof T];
