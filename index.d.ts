/**
Add index signature to interface
*/
export declare type Indexify<O extends object> = {
  [P in keyof O]: O[P];
};

/**
Constructs a index signature to interface
*/
export declare const indexify: <O extends object>(object: O) => Indexify<O>;
