import './Navigation.css';
import React from 'react';
import Shelf from './Shelf/Shelf';

const Navigation = (props) => {
  return (
    <div className='navigation'>
      <Shelf nodes={props.topShelf} treeManager={props.treeManager} />
      <Shelf nodes={props.midShelf} treeManager={props.treeManager} />
      <Shelf nodes={props.botShelf} treeManager={props.treeManager} />
    </div>
  );
}

export default Navigation