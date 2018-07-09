import { MapRequest, ParamDescriptor } from './../types';

export default class RequestParser {
    private WRAPPEDPARAMS = /{[A-Z a-z 0-9]+}/gm;
    private PARAMS = /[A-Z a-z 0-9]+/;

    public pairConfigDefinition(
        config: MapRequest<ParamDescriptor>,
        definition: MapRequest<string>
    ) {
        const result: MapRequest<string> = Object.create(null);
        for (const key in config) {
            const alias = <string>config[key].alias;
            if (definition[key] !== undefined) {
                result[alias] = definition[key];
            }
        }
        return result;
    }

    public replaceValue(pair: MapRequest<string>, target: string) {
        return target.replace(this.WRAPPEDPARAMS, (value) => {
            const matches = this.PARAMS.exec(value) || [];
            return pair[matches[0]];
        });
    }
}
