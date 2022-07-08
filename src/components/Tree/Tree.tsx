import './Tree.css';
import React, { Reducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TreeManager } from '../../dataManagment/tree';

import Navigation from './Navigation/Navigation';

const treeManager = new TreeManager();

const Tree = () => {
  const topShelf = useSelector((state: any) => state.tree.topShelf);
  const midShelf = useSelector((state: any) => state.tree.midShelf);
  const botShelf = useSelector((state: any) => state.tree.botShelf);

  function click() {
    treeManager.setBase({name:'root', id:'0Nds6jadb9sXs30JXo6F'});
  }

  function click1() {
    treeManager.setBase({name:'root', id:'wlWqIRAqsWD1v6EOpVWj'});
  }
 
  function click2() {
    treeManager.setBase({name:'root2', id:'TZqWsqU2rbFhY1FvsQMX'});
  }

  function click3() {
    treeManager.setBase({name:'earth', id:'TZqWsqU2rbFhY1FvsQMZ'});
  }

  return (
    <div className='tree'>
      <button onClick={click}>root 1</button>
      <button onClick={click1}>root 2</button>
      <button onClick={click2}>root 3</button>
      <button onClick={click3}>earth</button>
      <Navigation topShelf={topShelf} midShelf={midShelf} botShelf={botShelf} />
    </div>
  );
}

export default Tree;