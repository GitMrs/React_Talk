//合并所以reducer,并返回

import { combineReducers} from 'redux';
import { chatuser } from './redux/chatuser.redux'
import {user} from './redux/user.redux';
import {chat} from './redux/chat.redux';
export default combineReducers({user,chatuser,chat})