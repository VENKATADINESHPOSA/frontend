import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from '~/app';
import "mdbreact/dist/css/mdb.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import { Provider } from 'react-redux';
import store from '~/redux/store'


ReactDOM.render((
	<Provider store={store}>

	<BrowserRouter>
		<App />
	</BrowserRouter>

	</Provider>
), document.getElementById('root'));
