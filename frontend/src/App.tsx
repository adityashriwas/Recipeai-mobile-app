import '../global.css';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef, setIsNavigationReady } from './navigation/Navigation';
import RootNavigator from './navigation/navigators/RootNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer ref={navigationRef} onReady={setIsNavigationReady}>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
