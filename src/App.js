import './App.css';
import React from 'react';
import { styled } from '@mui/material';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {

  const WallPaper = styled('div')({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    overflow: 'hidden',
    background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
    transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
    zIndex: -1,
    '&::before': {
      content: '""',
      width: '140%',
      height: '140%',
      position: 'absolute',
      top: '-40%',
      right: '-50%',
      background:
        'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
    },
    '&::after': {
      content: '""',
      width: '140%',
      height: '140%',
      position: 'absolute',
      bottom: '-50%',
      left: '-30%',
      background:
        'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
      transform: 'rotate(30deg)',
    },
  });


  return (
    <div className="App">
      <WallPaper />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
