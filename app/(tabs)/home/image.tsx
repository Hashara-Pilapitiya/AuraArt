import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import { Stack, router, useLocalSearchParams, useRouter } from 'expo-router'
import Colors from '@/constants/Colors'
import { Image } from 'expo-image'
import { wp } from '@/helpers/common'


const ImageScreen = () => {

  const router = useRouter()

  const item = useLocalSearchParams()
  
  let uri = item?.webformatURL;

  const [status, setStatus] = React.useState('')

  const getSize = () => {

    const aspectRatio = item?.imageWidth / item?.imageHeight

    const maxWidth = Platform.OS == 'web' ? wp(50) : wp(92);
    let calculateHeight = maxWidth / aspectRatio;
    let calculateWidth = maxWidth;

    if(aspectRatio < 1) {
      calculateWidth = calculateHeight * aspectRatio;
    }

   return {
    width: calculateWidth,
    height: calculateHeight
   }
  }

  const onLoad = () => {
    setStatus('')
  }
  
  return (
    <>
    <Stack.Screen options={{
      headerTransparent: true,
      headerTitle: '',
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons style={styles.arrow} name='arrow-back' size={24} />
      </TouchableOpacity>
      )

    }} />

    <BlurView
    style={styles.container}
    tint='dark'
    intensity={100}
    >
      <View style={getSize()}>
        <Image 
          source={uri}
          transition={100}
          style={[styles.image, getSize()]}
          onLoad={onLoad}
        />
      </View>
    </BlurView>
    </>
  )
}

export default ImageScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.8)'
  },

  arrow: {
    padding: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    color: '#fff'
  },

  image: {
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'rgba(255,255,255,0.1)',
  }

})