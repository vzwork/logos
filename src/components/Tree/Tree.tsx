import './Tree.css';
import React, { Reducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadNode } from '../../store/actions';
import { TreeManager } from '../../dataManagment/tree';

const Tree = () => {

  const treeManager = new TreeManager();
  treeManager.setBase({id:'TZqWsqU2rbFhY1FvsQMX', name:'root'});


  // const nodes = useSelector((state: any) => state.tree.nodes);
  // const dispatch = useDispatch();
 
  // console.log(nodes);

  return (
    <div className='tree'>
      {/* <button onClick={() => dispatch(loadNode('root'))}>node</button> */}
    </div>
  );
}

export default Tree;