import React, { useState } from "react";
import Client from "../components/Client";
import Editor from "../components/editor";

const CodePage = () =>{
    const [clients, setClients] = useState([
        {socketId: 1, username: 'Rohit'},
        {socketId: 2, username: 'Jon'}
    ]);
    return(
        <div className="mainWrap">
            <div className="aside">
                <div className="asideInner">
                    <div className="logo">
                        <img className="logoImage" src="/CodeX.png" alt="logo"></img>
                    </div>
                    <h3>Connected</h3>
                    <div className="clientsList">
                        {
                            clients.map(client => (
                                <Client key={client.socketId} username={client.username}/>
                            ))
                        }
                    </div>
                </div>
                <button className="btn copyBtn">Copy Room ID</button>
                <button className="btn leaveBtn">Leave</button>
            </div>
            <div className="codeWrap">
                <Editor />
            </div>
        </div>
    )
}

export default CodePage;