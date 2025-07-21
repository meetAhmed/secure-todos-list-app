import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// local imports
import AuthScreen from './src/screens/AuthScreen';
import RootNavigator from './src/navigation/RootNavigator'
import { store, useAppSelector } from './src/redux/store'
import SplashScreen from './src/screens/SplashScreen';

/*
  AppContent renders the AuthScreen or the main app navigator based on the 'isAuthenticated' state from Redux.
 */
function AppContent() {
  // authentication state from Redux store
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  // if not authenticated, show auth screen
  if (!isAuthenticated) {
    return (
      <AuthScreen />
    )
  }

  // If authenticated, show splash screen
  return (
    <SplashScreen>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SplashScreen>
  )
}

/*
  - Main entry point of the app.
  - Handles authentication state and navigation setup.
 */
function App() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;