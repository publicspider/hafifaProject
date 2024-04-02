// import logo from './logo.svg';
import "./App.css";
// import Header from "./components/Header";
import { createBrowserRouter, RouterProvider}  from 'react-router-dom';

import Dashboard from "./components/Dashboard.tsx";
// import Header from "./components/Header";
import RootLayout from "./components/RootLayout.tsx";
import Login from "./components/Login.tsx";
import AddTzadik from "./components/addTzadik.tsx";

const router=createBrowserRouter([
  {path: "/",
   element:<RootLayout/>,
   children:[
    {
      index:true,
      element:<Login />

    },
    {
      path:"dashboard",
      element:<Dashboard/>
    },
    
    {
      path:"tzadik",
      element:<AddTzadik />
    },
    

    
   ],    
},
]);



function App() {
  return<RouterProvider router={router}/>
    
      
    
  
}

export default App;
