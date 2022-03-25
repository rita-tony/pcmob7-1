import { combineReducers, createStore } from 'redux';
import transactionAuthReducer from "./ducks/TransactionAuth";
import accountPrefReducer from './ducks/accountPref';

const reducer = combineReducers({
        auth: transactionAuthReducer,
        accountPrefs: accountPrefReducer,
});

const store = createStore(reducer);

export default store;