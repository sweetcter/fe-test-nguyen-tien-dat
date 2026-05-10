import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import tasksReducer from '@/store/slices/tasksSlice';

const storage = {
  getItem(key: string) {
    return Promise.resolve(window.localStorage.getItem(key));
  },
  setItem(key: string, value: string) {
    window.localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem(key: string) {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const tasksPersistConfig = {
  key: 'tasks',
  storage,
  blacklist: ['isLoading', 'selectedIds'],
};

const rootReducer = combineReducers({
  tasks: persistReducer(tasksPersistConfig, tasksReducer),
});

export default rootReducer;
