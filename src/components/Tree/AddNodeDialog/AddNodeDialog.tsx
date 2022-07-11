import './AddNodeDialog.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TreeManager } from '../../../data/manager';

const AddNodeDialog = ({ closeDialog }) => {
  const baseNodeId = useSelector((state: any) => state.state.baseNodeId);
  const baseNodeName = useSelector((state: any) => state.state.baseNodeName);
  const baseNode = {id:baseNodeId, name:baseNodeName};
  const treeManager = TreeManager.getInstance();
  const [name, setName] = useState('');

  return (
    <div className='addNodeDialog'>
      <form>
        <label>
          Name:
          <input type='text' value={name} onChange={
            (event) => {
              setName(event.target.value);
            }
          }/>
        </label>
        <input type='submit' value='submit' onClick={
          async (event) => {
            event.preventDefault();
            if (baseNode.id != ''){
              await treeManager.uploadNode(baseNode, name);
              closeDialog();
            }
          }
        }/>
      </form>
    </div>
  );
}

export default AddNodeDialog;