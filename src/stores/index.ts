import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import { reducer as InternetStore } from './InternetStore';
import { reducer as StatusStore } from './StatusStore';
import { reducer as UserStore } from './UserStore';

const config = {
    key: 'root',
    storage
}

export default persistCombineReducers(config, {
    netInfo: InternetStore,
    toast: StatusStore,
    user: UserStore,
});