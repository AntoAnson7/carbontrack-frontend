import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup';
import Questionaire from './components/Questionaire/Questionaire';
import Logout from './components/Logout/Logout';
import Unauthorized from './components/Errors/Unauthorized';
import Dashboard from './pages/Dashboard/Dashboard'
import { useDispatch } from 'react-redux';
import { fetchUser } from './Redux/userSlice';
import { fetchProfile } from './Redux/profileSlice';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar/Sidebar';
import PageUnavailable from './components/Errors/PageUnavailable'


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchUser(token));
      dispatch(fetchProfile(token))
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Signup/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>

          {/* Errors */}
          <Route path="/unauthorized" element={<Unauthorized/>}/>
          <Route path="/unavailable" element={<PageUnavailable />} />
          <Route path="*" element={<Navigate to="/unavailable" />} />

          {/* Questionaire path */}
          <Route path="/questionaire" element={<Questionaire/>}/>
        </Routes>
      </Router>

    </div>
  );
}


export default App;


// import {Button} from 'antd'
// import {motion} from 'framer-motion'
// function App() {
//   return (
//     <div className="App">
//       <p>Carvb</p>
//       <button className='btn btn-primary'>Login</button>
//       <Button type="primary">Button</Button>
      
//       <motion.div className="my-test"
//         initial={{x:'-100%',opacity:0}}
//         animate={{x:0, opacity:1}}
//         transition={{ duration: 0.5 }}
//       >
//         <h1>Hi</h1>
//         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quia laborum veritatis quo similique, saepe eveniet quos, assumenda velit alias, cumque aperiam exercitationem odit. Modi voluptas mollitia adipisci earum, delectus repudiandae consequuntur, accusamus tempora culpa at ipsum quidem eius aliquam est sit cupiditate amet! Natus accusantium voluptatibus eveniet rem nemo!</p>
//       </motion.div>

//     </div>
//   );
// }