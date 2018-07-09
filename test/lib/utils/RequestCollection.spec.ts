import 'mocha';
import RequestCollection from './../../../lib/utils/RequestCollection';
import { expect } from 'chai';

interface fakeType {
    field1: string;
    field2: number;
    field3: boolean;
}

describe('lib/utils/RequestCollection', () => {
    const fake = {
        param1: { field1: 'aaa', field2: 32, field3: true},
        param2: { field1: 'bbb', field2: 2, field3: true},
        param3: { field1: 'ccc', field2: 45, field3: false}
    };

    const fake2 = {
        param4: {field1: 'sdf', field2: 5, field3: false}
    };

    let requestCollection: RequestCollection<fakeType>;
    
    beforeEach(() => {
        requestCollection = new RequestCollection();
    });

    describe('#constructor', () => {
        it('should create an empty collection key pair', () => {
            expect(requestCollection.collection).to.be.deep.equal({});
        });
    });

    describe('#append', () => {
        it('should add new objects as append gets called', () => {    
            requestCollection.append(fake);    
            expect(requestCollection.collection).to.be.deep.equal(fake);
            requestCollection.append(fake2);
            expect(requestCollection.collection).to.be.deep.equal(
                {...fake, ...fake2}
            );
        });
    });

    describe('#filter', () => {
        it('should filter the object given a condition', () => {
            requestCollection.append(fake); 
            requestCollection.append(fake2);

            const newRequestCollection = requestCollection.filter(
                (param) => param.field3
            );

            expect(newRequestCollection).to.be.deep.equal({
                param1: { field1: 'aaa', field2: 32, field3: true},
                param2: { field1: 'bbb', field2: 2, field3: true}
            });
        });
    });
});
