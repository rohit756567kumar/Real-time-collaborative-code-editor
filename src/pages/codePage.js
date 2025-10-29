import React, { useState , useRef, useEffect  } from "react";
import toast from 'react-hot-toast';
import Client from "../components/Client";
import Editor from "../components/Editor";
import ACTIONS from "../Action";
import { initSocket } from "../socket";
import { useLocation, useNavigate, Navigate, useParams } from "react-router-dom";

const CodePage = () => {

  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const {roomId} = useParams();
  const reactNavigator = useNavigate();

    const [clients, setClients] = useState([
    ]);



  useEffect(() => {
    let isSubscribed = true;
    const init = async () => {

      socketRef.current = await initSocket();
      if (!socketRef.current || !isSubscribed) return;
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("socket connection failed, try again later.");
        reactNavigator("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      //jooined event khud ke UI par joined notice nahi lana khud ka
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if(!isSubscribed) return;

          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
          }

          setClients(clients);

          if(socketId !== socketRef.current.id && codeRef.current){
          socketRef.current.emit(ACTIONS.SYNC_CODE, {code: codeRef.current, socketId});
          }
        }
      );

      //disconnect hone ke baad
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        if(!isSubscribed) return;
        toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();
    return () => {
      isSubscribed = false;
      if (socketRef.current) 
        {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
        }
    };
    // eslint-disable-next-line
  }, [roomId]);

  async function copyRoomId(){
    try{
      await navigator.clipboard.writeText(roomId);
      toast.success('Room ID has been copied to your Clipboard')
    }catch(err){
      toast.error('Could not copy Room ID');
    }
  }

  function leaveRoom(){
    reactNavigator('/');
  }

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
        <button className="btn copyBtn" onClick={copyRoomId}>Copy Room ID</button>
        <button className="btn leaveBtn" onClick={leaveRoom}>Leave</button>
      </div>
      <div className="codeWrap">
        <Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code) => {codeRef.current = code;}}/>
      </div>
    </div>
  );
};

export default CodePage;
