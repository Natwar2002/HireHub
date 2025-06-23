import { useEffect } from 'react';
import { AppRoutes } from './Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './redux/store';
import { initializeAuth } from './redux/actions/authAction';


function App() {

  const queryClient = new QueryClient();

  useEffect(() => {
    store.dispatch(initializeAuth());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  )
}

export default App
