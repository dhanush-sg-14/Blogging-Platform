import {
  Route,
  Routes
} from 'react-router-dom'

import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

import BlogDetails from './pages/BlogDetails'
import CreateBlog from './pages/CreateBlog'
import EditBlog from './pages/EditBlog'
import Home from './pages/Home'
import Login from './pages/Login'
import MyBlogs from './pages/MyBlogs'
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
        <Route
          path='/create'
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        <Route path='/blog/:id' element={<BlogDetails />} />
        <Route
          path='/edit/:id'
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path='/myblogs'
          element={
            <ProtectedRoute>
              <MyBlogs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
