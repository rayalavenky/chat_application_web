import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const ChatPage = lazy(() => import('../pages/ChatPage'));

const AllRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/chats' element={<ChatPage />} />
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
