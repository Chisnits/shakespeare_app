import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import Shakespeare from './components/Shakespeare';
import ItemById from './components/ItemById';

ReactDOM.render(
        <BrowserRouter>
            <div>
                <Route path="/shakespeare/:id" component={ItemById}/>
                <Route exact path="/" component={Shakespeare}/>
            </div>
        </BrowserRouter>   
    , document.getElementById('root'));
registerServiceWorker();
