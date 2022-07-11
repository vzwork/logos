import './Tree.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TreeManager } from '../../data/manager';

import Navigation from './Navigation/Navigation';
import AddNodeDialog from './AddNodeDialog/AddNodeDialog';
import { setBaseNode } from '../../store/actions';

const treeManager = TreeManager.getInstance();

treeManager.setRootTreeNode('WUdK1a6fVuO5LjG1KouS', 'root');
treeManager.setBaseNode({id:'WUdK1a6fVuO5LjG1KouS', name:'root'});

const Tree = () => {
  const dispatch = useDispatch();

  const baseNodeId = useSelector((state: any) => state.state.baseNodeId);
  const baseNodeName = useSelector((state: any) => state.state.baseNodeName);
  const baseNode = {id:baseNodeId, name:baseNodeName};

  const [addNodeDialogFlag, setAddNodeDialogeFlag] = useState(false);

  function clickedAddNode() {
    setAddNodeDialogeFlag(!addNodeDialogFlag);
  }

  function AddNodeDialogRender(props) {
    const clicked = props.clicked;
    if (clicked) {
      return <AddNodeDialog closeDialog={clickedAddNode} />;
    } else {
      return <div></div>;
    }
  }

  return (
    <div className='tree'>
      <button onClick={clickedAddNode}>Add node</button>
      <div className='addNodeDialog-container'>
        <AddNodeDialogRender clicked={addNodeDialogFlag}/>
      </div>
      <button onClick={async () => { 
        const parent = treeManager.getParent(baseNode);
        await treeManager.deleteNode(baseNode);
        await treeManager.setBaseNode(parent);
        dispatch(setBaseNode(parent));
      }}>Delete node</button>
      <Navigation topShelf={treeManager.topShelf} midShelf={treeManager.midShelf} botShelf={treeManager.botShelf} />
    </div>
  );
}

export default Tree;