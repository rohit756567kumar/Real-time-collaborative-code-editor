import React from "react";
import {v4 as uuidv4} from 'uuid';
import { useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


const Home = () =>{
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setRoomId(id);
    toast.success('Created a new room');
  }

  const joinRoom = () => {
    if(!roomId || !username){
      toast.error('ROOM ID & username is required');
      return;
    }

    //Redirect
    navigate(`/code/${roomId}`,{
      state: {
        username,
      }
    })
  }

  const handleInputEnter = (e) => {
    if(e.code === 'Enter'){
      joinRoom();
    }
  }

    return (
      <div className="homePageWrapper">
        <div className="formWrapper">
          <img className="homePageLogo" src="/CodeX.png" alt="CodeX logo" />
          <h4 className="mainLabel"> Paste invitation Room ID</h4>
          <div className="inputGroup">
            <input
              type="text"
              className="inputBox"
              placeholder="Room ID"
              onChange={(e) => {
                setRoomId(e.target.value);
              }}
              value={roomId}
              onKeyUp={handleInputEnter}
            ></input>
            <input
              type="text"
              className="inputBox"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              onKeyUp={handleInputEnter}
            ></input>
            <button className="btn joinbtn" onClick={joinRoom}>
              Join
            </button>
            <span className="creatInfo">
              if you don't have an invite then create{"  "}
              <a onClick={createNewRoom} href=" " className="createNewBtn">
                New Room
              </a>
            </span>
          </div>
        </div>
        <footer>
          <h4>
            Build by <a href="https://github.com/rohit756567kumar">Rohit</a>
          </h4>
        </footer>
      </div>
    );
}

export default Home