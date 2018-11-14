import * as React from "react";
import {mount} from "enzyme";
import fetch from "jest-fetch-mock";
import VisitsPage from "./VisitsPage";
import {flushPromises} from "../../util/test-utils";

describe('visits page tests', () => {
    it('should show fetched pet', async () => {
        fetch.mockResponseOnce(JSON.stringify({date: '2015/05/05', desc: 'super description'}));
        fetch.mockResponseOnce(JSON.stringify({
            name: 'myPet',
            birthDate: new Date(),
            type: {name: 'type'},
            visits: [],
            owner: {
                address: 'address',
                city: 'city',
                telephone: '500500500',
                pets: []
            }
        }));

        const visitsPageParams = {petId: '1', ownerId: '2'};
        const component = mount(<VisitsPage params={visitsPageParams}/>);
        await flushPromises();
        component.update();

        expect(component.find('td').first().text()).toEqual('myPet');
    });
});
