import './Shelf.css';
import React from 'react';
import Node from './Node/Node';

const Shelf = (props) => {
  const nodes = props.nodes;
  return (
    <div className='shelf'>
      <Node data={{name:'*'}}/>
      {nodes.map((item, index)=>{
          return <Node data={item} key={index}/>
      })}
    </div>
  );
}

export default Shelf;