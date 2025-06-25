import { useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import { SidebarProvider } from './context/SidebarContext';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import OverviewPage from './components/OverviewPage';
import CasesPage from './components/CasesPage';
import StepsPage from './components/StepsPage';
import PathsPage from './components/PathsPage';
import DelaysPage from './components/DelaysPage';
import ViolationsPage from './components/ViolationsPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import RecommendationPage from './components/RecommendationPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <SidebarProvider>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/recommendations" element={<RecommendationPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} >
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="cases" element={<CasesPage />} />
          <Route path="steps" element={<StepsPage />} />
          <Route path="paths" element={<PathsPage />} />
          <Route path="delays" element={<DelaysPage />} />
          <Route path="violations" element={<ViolationsPage />} />
        </Route>
      </Routes>
    </SidebarProvider>
    </>
  )
}

export default App
