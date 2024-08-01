import { Route,Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/header/header';
import Dashboard from './Components/dashboard/dashboard';
import PostUser from './Components/Employee/postUser';
import NotFound from './Components/PageNotFound/pagenotfound'
import UpdateUser from './Components/updateUser/updateUser';
function App() {
  return (
   <>
   
   <Header/>
   <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/employee' element={<PostUser/>} />
      <Route path='/employee/:id' element={<UpdateUser/>}/>
      <Route path='*' element={<NotFound/>} />
      
   </Routes>
   </>
  );
}

export default App;
