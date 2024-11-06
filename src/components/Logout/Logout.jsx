import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { clearProfile } from '../../Redux/profileSlice';
import { clearUser } from '../../Redux/userSlice';

function Logout() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

    const Logout =()=> {
        localStorage.removeItem('user')
        localStorage.removeItem('temp_access')
        localStorage.removeItem('token')
        dispatch(clearUser())
        dispatch(clearProfile())
        navigate('/')
    }
  return (
    <div>
        <button 
          style={{
            backgroundColor:"#abde04",
            color:'white',
            width:'120%',
            textAlign:'start',
            border:'none',
            outline:'none',
            borderRadius:'2px',
            height:'30px',
            paddingLeft:'5px'
          }}
          onClick={Logout}
         >
          Logout
          </button>
    </div>
  )
}

export default Logout