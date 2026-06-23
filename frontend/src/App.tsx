import {BrowserRouter, Routes, Route} from 'react-router'
import ChatAppPage from './pages/ChatAppPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import { Toaster } from 'sonner'

function App() {
 

  return (
    <>
    <Toaster richColors />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatAppPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
