import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from '../../Redux/userSlice';

function Home() {
  const user = useSelector((state)=>state.user.user)
  return (
    <div>
      <p>{user&&user.username}</p>
      {!user&&<p> Not logged in</p>}
    </div>
  )
}

export default Home