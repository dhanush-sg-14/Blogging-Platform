import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import BlogDetails from './pages/BlogDetails'
import CreateBlog from './pages/CreateBlog'
import EditBlog from './pages/EditBlog'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'


// function App() {
//   return (
//     <Routes>
//       <Route path='/' element={<Home />} />
//       <Route path='/login' element={<Login />} />
//       <Route path='/register' element={<Register />} />
//       <Route path='/create-blog' element={<CreateBlog />} />
//       <Route path='/blog/:id' element={<BlogDetails />} />
//       <Route path='/profile' element={<Profile />} />
//     </Routes>
//   )
// }
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/create' element={<CreateBlog />} />
        <Route path='/blog/:id' element={<BlogDetails />} />
        <Route path='/edit/:id' element={<EditBlog />} />
      </Routes>
    </>
  )
}

export default App
