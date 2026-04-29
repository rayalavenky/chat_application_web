import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const ChatPage = lazy(() => import('../pages/ChatPage'));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPassword/ForgotPassword'));
const VerifyOTPPage = lazy(() => import('../pages/ForgotPassword/VerifyOTP'));
const ResetPasswordPage = lazy(() => import('../pages/ForgotPassword/ResetPassword'));
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));

const AllRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/chats' element={<ChatPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/verify-otp' element={<VerifyOTPPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
