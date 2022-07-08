import './Navigation.css';
import React from 'react';
import Shelf from './Shelf/Shelf';

const Navigation = (props) => {
  return (
    <div className='navigation'>
      <Shelf nodes={props.topShelf}/>
      <Shelf nodes={props.midShelf}/>
      <Shelf nodes={props.botShelf}/>
    </div>
  );
}

export default Navigation