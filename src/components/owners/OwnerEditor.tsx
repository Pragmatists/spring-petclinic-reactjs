import * as React from 'react';
import {submitForm, url} from '../../util';

import Input from '../form/Input';

import {Digits, NotEmpty} from '../form/Constraints';

import {IError, IFieldError, IOwner, IRouterContext} from '../../types';
import * as PropTypes from 'prop-types';

interface IOwnerEditorProps {
    initialOwner?: IOwner;
}

interface IOwnerEditorState {
    owner: IOwner;
    error?: IError;
}

export default class OwnerEditor extends React.Component<IOwnerEditorProps, IOwnerEditorState> {

    // @ts-ignore
    context: IRouterContext;

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            owner: Object.assign({}, props.initialOwner)
        };
    }

    onSubmit(event) {
        event.preventDefault();

        const {owner} = this.state;

        const url = owner.isNew ? 'api/owners' : 'api/owners/' + owner.id;
        submitForm(owner.isNew ? 'POST' : 'PUT', url, owner, (status, response) => {
            if (status === 200 || status === 201 || status === 204) {
                const newOwner = response as IOwner;
                this.context.router.push({
                    pathname: '/owners/' + (newOwner.id || owner.id)
                });
            } else {
                console.log('ERROR?!...', response);
                this.setState({error: response});
            }
        });
    }

    onInputChange(name: string, value: string, fieldError?: IFieldError) {
        const {owner, error} = this.state;
        const modifiedOwner = Object.assign({}, owner, {[name]: value});
        const newFieldErrors = error
            ? Object.assign({}, error.fieldErrors, {[name]: fieldError})
            : fieldError
                ? {[name]: fieldError}
                : {};
        this.setState({
            owner: modifiedOwner,
            error: {fieldErrors: newFieldErrors}
        });
    }

    render() {
        const {owner, error} = this.state;
        return (
            <span>
        <h2>New Owner</h2>
        <form className='form-horizontal' method='POST' action={url('api/owners')}>
          <div className='form-group has-feedback'>
            <Input object={owner} error={error} constraint={NotEmpty} label='First Name' name='firstName'
                   onChange={this.onInputChange} />
            <Input object={owner} error={error} constraint={NotEmpty} label='Last Name' name='lastName'
                   onChange={this.onInputChange} />
            <Input object={owner} error={error} constraint={NotEmpty} label='Address' name='address'
                   onChange={this.onInputChange} />
            <Input object={owner} error={error} constraint={NotEmpty} label='City' name='city'
                   onChange={this.onInputChange} />
            <Input object={owner} error={error} constraint={Digits(10)} label='Telephone' name='telephone'
                   onChange={this.onInputChange} />
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button className='btn btn-default' type='submit'
                      onClick={this.onSubmit}>{owner.isNew ? 'Add Owner' : 'Update Owner'}</button>
            </div>
          </div>
        </form>
      </span>
        );
    }
}
