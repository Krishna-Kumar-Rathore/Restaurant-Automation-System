
import './App.css';
import Home from './screens/Home';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/Signup.js';
import { CartProvider } from './Components/ContextReducer.js';
// import Admin from './screens/Admin.jsx';
import Admin from './screens/Admin.jsx';
import AddFoodItems from './screens/AddFoodItems.jsx';

function App() {
  return (
    <CartProvider>
    <Router>
     <div style={{backgroundColor : '#1d1b21'}} > 
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/createUser' element={<Signup/>} />
        <Route exact path= '/admin' element={<Admin/>} />
        <Route exact path= '/addFoodItem' element={<AddFoodItems/>} />

       
      </Routes>
      
       </div>
    </Router>
    </CartProvider>
  
  );
}

export default App;

// Lecture 3 : completed till 36minutes i.e. start from carousal
