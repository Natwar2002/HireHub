import { useEffect } from 'react';
import { AppRoutes } from './Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './redux/store';
import { initializeAuth } from './redux/actions/authAction';
import Modal from './component/Modal/Modal';


function App() {

  const queryClient = new QueryClient();

  useEffect(() => {
    store.dispatch(initializeAuth());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <Modal/>
    </QueryClientProvider>
  )
}

export default App
