import React from 'react'
import { Stack } from 'expo-router'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack>
            <Stack.Screen
            name='index'
            options={{ headerTransparent: true, headerTitle: '' }}
            />

            <Stack.Screen
            name='home/index'
            options={{ headerTransparent: true, headerTitle: '' }}
            />

            <Stack.Screen
            name='home/image'
            options={{ headerTransparent: true, headerTitle: '', presentation: 'transparentModal', animation: 'fade' }}
            />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default Layout
