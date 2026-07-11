import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PageLoader from '../ui/PageLoader';

const ProtectedRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <PageLoader />;
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />;

  return children;
};

export default ProtectedRoute;
