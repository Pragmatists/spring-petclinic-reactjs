import * as React from 'react';
import image from '../styles/images/pets.png';

export default () => (
  <span>
    <h2>Welcome</h2>
    <div className='row'>
      <div className='col-md-12'>
        <img className='img-responsive' src={image} alt="main" />
      </div>
    </div>
  </span>
);
