import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { clearProfile } from '../../Redux/profileSlice';
import { clearUser } from '../../Redux/userSlice';

const HandleLogout = (dispatch, navigate) => {
  localStorage.removeItem('user');
  localStorage.removeItem('temp_access');
  localStorage.removeItem('token');
  dispatch(clearUser());
  dispatch(clearProfile());
  navigate('/');
};

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <button
        style={{
          backgroundColor: "#abde04",
          color: 'white',
          width: '120%',
          textAlign: 'start',
          border: 'none',
          outline: 'none',
          borderRadius: '2px',
          height: '30px',
          paddingLeft: '5px',
        }}
        onClick={() => HandleLogout(dispatch, navigate)}
      >
        Logout
      </button>
    </div>
  );
};

export { HandleLogout };
