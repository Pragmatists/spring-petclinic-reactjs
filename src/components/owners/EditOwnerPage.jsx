import * as React from 'react';
import OwnerEditor from './OwnerEditor';

import { url } from '../../util';

export default class EditOwnerPage extends React.Component {
  componentDidMount() {
    const { params } = this.props;

    if (params && params.ownerId) {
      const fetchUrl = url(`api/owners/${params.ownerId}`);
      fetch(fetchUrl)
        .then(response => response.json())
        .then(owner => this.setState({ owner }));
    }
  }
  render() {
    const owner = this.state && this.state.owner;
    if (owner) {
      return <OwnerEditor initialOwner={owner} />;
    }
    return null;
  }
}
