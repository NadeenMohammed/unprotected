
import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from './component/MainLayout/MainLayout';
import Home from './component/Home/Home';
// import ProtectedRoutes from './component/ProtectedRoutes/ProtectedRouts'
import GamesDetails from './component/gamesDetails/GamesDetails'
import PlatForm from './component/PlatForm/PlatForm'
import Register from './component/Register/Register'
import Login from './component/Login/Login'
import NotFound from './component/NotFound/NotFound'
import All from './component/All/All'
import SortBy from './component/SortBy/SortBy';
import Category from './component/Category/Category'
import { useEffect, useState } from 'react';
import jwt_Decode from 'jwt-decode';
function App() {

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      saveUserData();
    }
  }, [])
  const [userData, setUserData] = useState({});
  function saveUserData() {
    let token = localStorage.getItem('token');
    let decoded = jwt_Decode(token);
    console.log(decoded);
    setUserData(decoded);
  }
  // function ProtectedRoutes() {
  //   if (localStorage.getItem("token")) {
  //     return saveUserData()
  //   } else {
  //     return <Navigate to='/Login' />
  //   }
  // }

  let routers = createBrowserRouter([
    {
      path: '/', element: <MainLayout userData={userData} setUserData={setUserData} />, children: [
        { path: 'home', element: <Home /> },
        { path: '/gameDetails/:id', element: <GamesDetails /> },
        { path: '/platform/:platform', element: <PlatForm /> },
        { path: 'register', element: <Register /> },
        { index: true, element: <Login saveUserData={saveUserData} /> },
        { path: '*', element: <NotFound /> },
        { path: 'all', element: <All /> },
        { path: 'sortBy/:sort', element: <SortBy /> },
        { path: 'cat/:category', element: <Category /> },
      ]
    }])
  return (<RouterProvider router={routers} />);
}
export default App;
