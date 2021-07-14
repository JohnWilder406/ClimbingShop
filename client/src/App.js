import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Router, Redirect} from '@reach/router';
import React, { useState } from 'react';
import Main from './views/Main';
import Login from './components/Login';
import Register from './components/Register';
import AddCustomer from './views/AddCustomer';
import EditCustomer from './views/EditCustomer';
import CustomerDetail from './components/CustomerDetail';
import Products from './views/Products';
import AddProduct from './views/AddProduct';
import EditProduct from './views/EditProduct';
import NewOrder from './components/NewOrder';



function App() {
  //protected path token (true allows entry to site, false keeps you at Login or Registration page)
  const [token, setToken] = useState(false);

  return (
    <div className="App">
      <Router>
        <Login path="/" setToken={setToken} />
        <Register path="/register" />
        {
          token ? (
            <>
            <Main path="/main" />
            <AddCustomer path="/customers/add" />
            <EditCustomer path="/customers/:id/edit" />
              <CustomerDetail path="/customers/:id/history" />
              <NewOrder path="/customers/:id/new_order" />
            <Products path="/products" />
            <AddProduct path="/products/add" />
            <EditProduct path="/products/:id/edit" />
            </>
          ) : (
            <Redirect from="/main" to="/" noThrow/>
          )
        }
    </Router>
    </div>
  );
}

export default App;
