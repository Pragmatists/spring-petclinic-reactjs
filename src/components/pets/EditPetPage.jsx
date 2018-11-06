import * as React from 'react';

import { url } from '../../util';

import LoadingPanel from './LoadingPanel';
import PetEditor from './PetEditor';

import createPetEditorModel from './createPetEditorModel';

export default class EditPetPage extends React.Component {

  componentDidMount() {
    const { params } = this.props;

    const fetchUrl = url(`api/pets/${params.petId}`);

    const loadPetPromise = fetch(fetchUrl).then(response => response.json());

    createPetEditorModel(this.props.params.ownerId, loadPetPromise)
      .then(model => this.setState(model));
  }

  render() {
    if (!this.state) {
      return <LoadingPanel />;
    }

    return <PetEditor {...this.state} />;
  }
}
