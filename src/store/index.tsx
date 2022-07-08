import { configureStore } from '@reduxjs/toolkit';
import treeReducer from './reducers/index';

export default configureStore({
  reducer: {
    tree: treeReducer
  }
})