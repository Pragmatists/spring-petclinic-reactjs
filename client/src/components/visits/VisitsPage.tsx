import * as React from 'react';

import {IError, IOwner, IPet, IRouterContext, IVisit} from '../../types';

import {submitForm, url} from '../../util';
import {NotEmpty} from '../form/Constraints';

import DateInput from '../form/DateInput';
import Input from '../form/Input';
import PetDetails from './PetDetails';


interface IVisitsPageProps {
    params: {
        ownerId: string,
        petId: string
    };
}

interface IVisitsPageState {
    visit?: IVisit;
    owner?: IOwner;
    pet?: IPet;
    error?: IError;
}

export default class VisitsPage extends React.Component<IVisitsPageProps, IVisitsPageState> {

    context: IRouterContext;

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };


    constructor(props) {
        super(props);

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const {params} = this.props;

        if (params && params.ownerId) {
            Promise.all([
                fetch(url(`api/owners/${params.ownerId}`))
                    .then(response => response.json()),
                fetch(url(`api/pets/${this.props.params.petId}`))
                    .then(response => response.json())
            ])
                .then(([owner, pet]) => this.setState(
                    {
                        owner: owner,
                        pet: pet,
                        visit: {id: null, isNew: true, date: null, description: ''}
                    }));
        }
    }

    onSubmit(event) {
        event.preventDefault();

        const {owner, visit, pet} = this.state;
        const request = {
            id: null,
            date: visit.date,
            description: visit.description,
            pet: pet
        };

        console.log(request);

        const url = 'api/visits';
        submitForm('POST', url, request, (status, response) => {
            if (status === 200 || status === 201 || status === 204) {
                this.context.router.push({
                    pathname: '/owners/' + owner.id
                });
            } else {
                console.log('ERROR?!...', response);
                this.setState({error: response});
            }
        });
    }

    onInputChange(name: string, value: string) {
        const {visit} = this.state;

        this.setState(
            {visit: Object.assign({}, visit, {[name]: value})}
        );
    }

    render() {
        if (!this.state) {
            return <h2>Loading...</h2>;
        }

        const {owner, error, visit, pet} = this.state;

        return (
            <div>
                <h2>Visits</h2>
                <b>Pet</b>
                <PetDetails owner={owner} pet={pet} />

                <form className='form-horizontal' method='POST' action={url('/api/owner')}>
                    <div className='form-group has-feedback'>
                        <DateInput object={visit} error={error} label='Date' name='date'
                                   onChange={this.onInputChange} />
                        <Input object={visit} error={error} constraint={NotEmpty} label='Description' name='description'
                               onChange={this.onInputChange} />
                    </div>
                    <div className='form-group'>
                        <div className='col-sm-offset-2 col-sm-10'>
                            <button className='btn btn-default' type='submit' onClick={this.onSubmit}>Add Visit</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}


