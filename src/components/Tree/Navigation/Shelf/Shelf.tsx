import './Shelf.css';
import React from 'react';
import Node from './Node/Node';

const Shelf = (props) => {
  const nodes = props.nodes;
  return (
    <div className='shelf'>
      <p className='node'>*</p>
      {nodes.map((item, index)=>{
          return <Node data={item} key={index} treeManager={props.treeManager} />
      })}
    </div>
  );
}

export default Shelf;