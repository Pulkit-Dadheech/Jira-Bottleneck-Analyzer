import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import { SidebarProvider } from './context/SidebarContext';
import { UserDataProvider } from './context/UserDataContext';
import { AuthProvider, useAuthModal } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import OverviewPage from './components/OverviewPage';
import CasesPage from './components/CasesPage';
import StepsPage from './components/StepsPage';
import PathsPage from './components/PathsPage';
import DelaysPage from './components/DelaysPage';
import ViolationsPage from './components/ViolationsPage';
import RecommendationPage from './components/RecommendationPage';
import PrivateRoute from './components/PrivateRoute';
import PathTreePage from './components/PathTreePage';
import AuthModal from './components/auth/AuthModal';

function AuthModalWrapper() {
  const { showAuthModal, setShowAuthModal } = useAuthModal();
  return showAuthModal ? <AuthModal onClose={() => setShowAuthModal(false)} /> : null;
}

function App() {
  return (
    <AuthProvider>
      <UserDataProvider>
        <SidebarProvider>
          <Routes>
            <Route path="/recommendations" element={<RecommendationPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} >
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="cases" element={<CasesPage />} />
              <Route path="steps" element={<StepsPage />} />
              <Route path="paths" element={<PathsPage />} />
              <Route path="delays" element={<DelaysPage />} />
              <Route path="pathTree" element={<PathTreePage/>}/>
              <Route path="violations" element={<ViolationsPage />} />
              <Route path="recommendations" element={<RecommendationPage />} />
            </Route>
          </Routes>
          <AuthModalWrapper />
        </SidebarProvider>
      </UserDataProvider>
    </AuthProvider>
  )
}

export default App
