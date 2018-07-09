
export interface ParamDescriptor {
    type: string;
    alias: string;
}

export interface Descriptor {
    host: string;
    port: number;
    protocol: string;
    actions: {
        path: string;
        method: string;
        header: any;
        name: string;
        params?: any;
    }[];
}
