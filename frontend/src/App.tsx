import '../global.css'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef, setIsNavigationReady } from './navigation/Navigation'
import RootNavigator from './navigation/navigators/RootNavigator'

const App = () => {
  return (
    <NavigationContainer ref={navigationRef} onReady={setIsNavigationReady}>
      <RootNavigator/>
    </NavigationContainer>
  )
}

export default App