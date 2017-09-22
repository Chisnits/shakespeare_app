import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './redux/store';
import Shakespeare from './components/Shakespeare';
import ItemById from './components/ItemById'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route path="/shakespeare/:id" component={ItemById}/>
                <Route exact path="/" component={Shakespeare}/>
            </div>
        </BrowserRouter>
    </Provider>    
    , document.getElementById('root'));
registerServiceWorker();
