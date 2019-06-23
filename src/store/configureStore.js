import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import pickerReducer from '../reducers/pickerReducer';
import customerReducer from '../reducers/customerReducer'
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      days: pickerReducer,
      customer:customerReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
