import 'mocha';
import RequestParser from '../../../lib/utils/RequestParser';
import { expect } from 'chai';
import descriptor from '../mocks/descriptor';

describe('lib/utils/RequestParser', () => {
    let requestParser: RequestParser;

    beforeEach(() => {
        requestParser = new RequestParser();
    });

    describe('#pairConfigDefinition', () => {
        it('should match a set of configuration properties with a set of values properties', () => {
            const params = descriptor.actions[0].params;
            const values = {
                id: '1',
                name: 'hello'
            };

            const pairs = requestParser.pairConfigDefinition(params, values);

            expect(pairs).to.be.deep.equal({
                'id-1': '1',
                name: 'hello'
            });
        });
    });

    describe('#replaceValue', () => {
        it('should replace placeholders from a configuration given certain values', () => {
            const url = 'the {id} corresponds to the user {user} that was born in {year}';
            const params = {
                id: '10',
                user: 'Maria',
                year: '1995'
            };

            const result = requestParser.replaceValue(params, url);
            expect(result).to.be.equal('the 10 corresponds to the user Maria that was born in 1995');
        });
    });
});
