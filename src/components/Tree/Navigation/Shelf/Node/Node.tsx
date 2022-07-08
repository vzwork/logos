import './Node.css';
import React from 'react';

const Node = (props) => {
  const data = props.data;
  return (
    <div className='node'>
      {data.name}
    </div>
  );
}

export default Node;