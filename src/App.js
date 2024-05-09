import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";
import Home from './pages/Home';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Link 
} from 'react-router-dom';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';
import {AuthContext} from './helper/AuthContext';
import pageNotFound from './pages/pageNotFound';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';

function App() {
  //const [listOfPosts, setListOfPosts] = useState([])
  const [authState, setAuthState] = useState({
    username: "", 
    id: 0, 
    status: false
  })

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/verify`, { 
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then((response) => {
      if(response.data.error) {
        setAuthState({...authState, status: false})
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true
        })
      }
    })

    // axios.get("http://localhost:3001/posts", {
    //   headers: {accessToken: localStorage.getItem("accessToken")}
    // }).then((response) => {
    //   setListOfPosts(response.data.listOfPosts)
    // })
    
  }, [])

  const logout = () =>{
    localStorage.removeItem("accessToken")
    setAuthState({username: "", id: 0, status: false}) 
  }

  return (
    <div className='App'>
      <AuthContext.Provider value={{authState, setAuthState}}>
        <BrowserRouter>
          <div className='home-nav'>
            
            {
              !authState.status ? (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/registration">Sign up</Link>
                </>
              ) : (
                <>
                  <Link to="/">Home</Link>
                  <Link to="/createPost" className='create-post'>Create A Post</Link>
                  <button onClick={logout}>Logout</button>
                </>
                
              )
            }
            <h3>{authState.username}</h3>
          </div>
          
          <Routes>
            <Route path='/' exact element={<Home />}/>
            <Route path='/createPost' exact element={<CreatePost />}/>
            <Route path='/post/:id' exact element={<Post />}/>
            <Route path='/login' exact element={<Login />}/>
            <Route path='/registration' exact element={<Registration />}/>
            <Route path='/profile/:id'exact element={<Profile />}/>
            <Route path='/ChangePassword'exact element={<ChangePassword />}/>
            <Route path="*" exact Component={pageNotFound} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
