import React, { useState , useRef, useEffect  } from "react";
import toast from 'react-hot-toast';
import Client from "../components/Client";
import Editor from "../components/Editor";
import ACTIONS from "../Action";
import { initSocket } from "../socket";
import { useLocation, useNavigate, Navigate, useParams } from "react-router-dom";

const CodePage = () => {

  const socketRef = useRef(null);
  const location = useLocation();
  const {roomId} = useParams();
  const reactNavigator = useNavigate();

    const [clients, setClients] = useState([
    ]);



  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log('socket error', e);
        toast.error('socket connection failed, try again later.');
        reactNavigator('/');
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      //jooined event khud ke UI par joined notice nahi lana khud ka
      socketRef.current.on(ACTIONS.JOINED, ({clients,username,scoketId}) => {
        if(username !== location.state?.username){
          toast.success(`${username} joined the room.`);
        }
        setClients(clients);
      })
    };
    init();
  }, []);

  if(!location.state){
  return <Navigate to="/"/>
}

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoImage" src="\rtcLogo.png" alt="logo"></img>
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn">Copy Room ID</button>
        <button className="btn leaveBtn">Leave</button>
      </div>
      <div className="codeWrap">
        <Editor />
      </div>
    </div>
  );
};

export default CodePage;
