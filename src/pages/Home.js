import React from "react";

const Home = () =>{
    return (
      <div className="homePageWrapper">
        <div className="formWrapper">
          <img src="/CodeX.png" width="400px" height="100px" alt="CodeX logo" />
          <h4 className="mainLabel"> Paste invitation Room ID</h4>
          <div className="inputGroup">
            <input
              type="text"
              className="inputBox"
              placeholder="Room ID"
            ></input>
            <input
              type="text"
              className="inputBox"
              placeholder="Username"
            ></input>
            <button className="btn joinbtn">Join</button>
            <span className="creatInfo">
              if you don'y have an invite then create
              <a href=" " className="createNewBtn">
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