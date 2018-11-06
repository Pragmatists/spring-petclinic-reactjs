import * as React from 'react';
import image from '../styles/images/pets.png';

interface IErrorPageState {
  error?: {
    status: string;
    message: string;
  };
}

export default class ErrorPage extends React.Component<void, IErrorPageState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch('http://localhost:9966/api/oups')
      .then(response => response.json())
      .then(error => this.setState({error}));
  }

  render() {
    const { error } = this.state;

    return <span>
      <img src={image} />

      <h2>Something happened...</h2>
      { error ?
        <span>
          <p><b>Status:</b> {error.status}</p>
          <p><b>Message:</b> {error.message}</p>
        </span>
        :
        <p><b>Unkown error</b></p>
      }
    </span>;
  }
};
