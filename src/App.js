import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'

import Transportation from './components/Questionaire/Transportation';
import HomeEnergy from './components/Questionaire/HomeEnergy';
import FoodAndDiet from './components/Questionaire/FoodAndDiet';
import Shopping from './components/Questionaire/Shopping';
import WasteManagement from './components/Questionaire/WasteManagement';
import Lifestyle from './components/Questionaire/Lifestyle';
import Questionaire from './components/Questionaire/Questionaire';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>





          
          {/* Questionaire paths */}
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