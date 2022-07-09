import './Tree.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TreeManager } from '../../dataManagment/tree';
import { setBaseNode } from '../../store/actions';

import Navigation from './Navigation/Navigation';
import AddNodeDialog from './AddNodeDialog';

const treeManager = TreeManager.getInstance();

treeManager.setBase({name:'invis_root', id:'wlWqIRAqsWD1v6EOpVWj'});
treeManager.setBase({name:'root', id:'TZqWsqU2rbFhY1FvsQMX'});

const Tree = () => {
  
  const topShelf = useSelector((state: any) => state.tree.topShelf);
  const midShelf = useSelector((state: any) => state.tree.midShelf);
  const botShelf = useSelector((state: any) => state.tree.botShelf);

  const [addNodeDialogFlag, setAddNodeDialogeFlag] = useState(false);

  function clickedAddNode() {
    setAddNodeDialogeFlag(!addNodeDialogFlag);
    console.log(addNodeDialogFlag);
  }

  const addNodeDialog = <AddNodeDialog />

  return (
    <div className='tree'>
      <button onClick={clickedAddNode}>Add node</button>
      <div className='addNodeDialog-container'>
      </div>
      <Navigation topShelf={topShelf} midShelf={midShelf} botShelf={botShelf} treeManager={treeManager} />
    </div>
  );
}

export default Tree;