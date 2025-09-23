import './App.css';
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import CodePage from './pages/codePage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: "#d45c1b",
              },
            },
          }}
        ></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            {" "}
          </Route>
          <Route path="/code/:roomId" element={<CodePage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
