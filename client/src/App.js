import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Router, Link, navigate} from '@reach/router';
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
  const [token, setToken] = useState(false);

  // if(!token) {
  //   return (
  //     <div>
  //       <Router>
  //         <Login path="/" setToken={setToken} />
  //         <Register path="/register" />
  //       </Router>
  //     </div>
  //   )
  // }

  return (
    <div className="App">
      <Router>
        <Main path="/main" />
        <AddCustomer path="/customers/add" />
        <EditCustomer path="/customers/:id/edit" />
          <CustomerDetail path="/customers/:id/history" />
          <NewOrder path="/customers/:id/new_order" />
        <Products path="/products" />
        <AddProduct path="/products/add" />
        <EditProduct path="/products/:id/edit" />
    </Router>
    </div>
  );
}

export default App;
