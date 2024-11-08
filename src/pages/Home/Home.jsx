import React from 'react'
import { useSelector } from 'react-redux';
// import { setUser, clearUser } from '../../Redux/userSlice';

function Home() {
  const user = useSelector((state)=>state.user.user)
  return (
    <div style={{paddingLeft:260}}>
      {/* <p>{user&&}</p> */}
      {user?<p>{user.username}</p>:<p> Not logged in</p>}
    </div>
  )
}

export default Home