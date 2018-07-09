import RequestBuilder from './RequestBuilder';
import { Descriptor, MapRequest } from './types';
import HttpRequest from './HttpRequest';

export default function ClientFactory(descriptor: Descriptor) {
    const { port, host, actions } = descriptor;

    return actions.reduce((acumulator, action) => {
        const { method, path, name, params, header } = action;
        const builder =
            new RequestBuilder(host, port)
                .setMethod(method)
                .setPath(path);

        const httpRequest = new HttpRequest();

        builder.Params.append(params);        
        builder.Header.append(header);

        return Object.assign(acumulator, {
            [name]: (input: MapRequest<string>) => {
                const { request, body } = builder.createRequestOptions(input);
                return httpRequest.apply(request, body);
            }
        });
    }, {});
}
