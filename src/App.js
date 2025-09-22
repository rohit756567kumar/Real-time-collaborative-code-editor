import './App.css';
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import CodePage from './pages/codePage';

function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}> </Route>
      <Route path='/code/:roomId' element={<CodePage/>}></Route>
     </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
