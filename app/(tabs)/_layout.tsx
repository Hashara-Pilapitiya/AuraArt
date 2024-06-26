import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen
        name='index'
        options={{ headerTransparent: true, headerTitle: '' }}
        />

        <Stack.Screen
        name='home/index'
        options={{ headerTransparent: true, headerTitle: '' }}
        />
    </Stack>
  )
}

export default Layout
