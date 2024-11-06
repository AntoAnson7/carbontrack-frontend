import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setUser, clearUser } from '../../Redux/userSlice';

function Logout() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

    const Logout =()=> {
        localStorage.removeItem('user')
        localStorage.removeItem('temp_access')
        localStorage.removeItem('token')
        dispatch(clearUser())
        navigate('/')
    }
  return (
    <div>
        <button className='btn btn-danger m-20' onClick={Logout}>Logout</button>
    </div>
  )
}

export default Logout