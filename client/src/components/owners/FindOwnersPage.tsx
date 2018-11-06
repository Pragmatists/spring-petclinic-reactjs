import * as React from 'react';

import {Link} from 'react-router';
import {IOwner} from '../../types';
import {url} from '../../util';

import OwnersTable from './OwnersTable';

interface IFindOwnersPageState {
    owners?: IOwner[];
}


export default class FindOwnersPage extends React.Component<{}, IFindOwnersPageState> {
    componentDidMount() {
        this.fetchData();
    }

    componentWillReceiveProps() {
        this.fetchData();
    }

    /**
     * Actually loads data from the server
     */
    fetchData() {
        const requestUrl = url('api/owners');

        fetch(requestUrl)
            .then(response => response.json())
            .then(owners => {
                this.setState({owners});
            });
    }

    render() {
        const {owners} = this.state;

        return (
            <div>
                <OwnersTable owners={owners} />
                <Link className='btn btn-default' to='/owners/new'> Add Owner</Link>
            </div>
        );
    }
};
