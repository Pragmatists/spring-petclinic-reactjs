import * as React from 'react';
import Menu from './Menu';
import image from '../styles/images/spring-pivotal-logo.png';

export default ({location, children}) => (
  <div>
    <Menu name={location.pathname} />
    <div className='container-fluid'>
      <div className='container xd-container'>

        {children}

        <div className='container'>
          <div className='row'>
            <div className='col-12 text-center'>
              <img src={image} alt='Sponsored by Pivotal' /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
