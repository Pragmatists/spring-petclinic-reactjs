import * as React from 'react';


import LoadingPanel from './LoadingPanel';
import PetEditor from './PetEditor';

import createPetEditorModel from './createPetEditorModel';

const NEW_PET = {
  id: null,
  isNew: true,
  name: '',
  birthDate: undefined,
  typeId: undefined
};

export default class NewPetPage extends React.Component {

  componentDidMount() {
    createPetEditorModel(this.props.params.ownerId, Promise.resolve(NEW_PET))
      .then(model => this.setState(model));
  }

  render() {
    if (!this.state) {
      return <LoadingPanel />;
    }

    return <PetEditor {...this.state} />;
  }
}
