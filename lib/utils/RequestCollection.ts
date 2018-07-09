import { MapRequest } from './../types';

export default class RequestCollection<T> {
    private collectionObject: MapRequest<T>
    constructor() {
        this.collectionObject =  Object.create(null);
    }

    get collection() {
        return this.collectionObject;
    }

    append(params:any) {
        Object.assign(this.collectionObject, params);
    }

    filter(condition: (param: T) => boolean): MapRequest<T> {
        const result: MapRequest<T> = Object.create(null);
        for (let key in this.collectionObject) {
            if (condition(this.collectionObject[key])) {
                result[key] = this.collectionObject[key];
            }
        }

        return result;
    }
}
