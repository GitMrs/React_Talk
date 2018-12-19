import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import Login from './container/login/login';
import Register from './container/register/register';
import AuteRoute from './component/AuteRoute/AuteRoute';
import reducers from './reducer';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo';
import DashBord from './container/dashbord/dashbord';
import Chat from './container/chat/chat';

import './config';
import './app.css'
const store = createStore(reducers, compose(applyMiddleware(thunk)))

function Boss(){
    return <h1>Boss</h1>
}
ReactDOM.render(
    (<Provider store = {store} >
        <BrowserRouter>
           <div>
               <AuteRoute></AuteRoute>
               <Switch>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/geniusinfo' component={GeniusInfo}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/chat/:user' component={Chat}></Route>
                    <Route component={DashBord}></Route>
               </Switch>
           </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root'));
registerServiceWorker();
