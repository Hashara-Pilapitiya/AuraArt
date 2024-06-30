import { StyleSheet, View, Text, TouchableOpacity, Platform, ActivityIndicator, Pressable, Alert } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import { Entypo, Ionicons, Octicons } from '@expo/vector-icons'
import { Stack, router, useLocalSearchParams, useRouter } from 'expo-router'
import Colors from '@/constants/Colors'
import { Image } from 'expo-image'
import { hp, wp } from '@/helpers/common'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import Toast, { ToastConfig, ToastConfigParams } from 'react-native-toast-message'


const ImageScreen = () => {

  const router = useRouter()

  const item = useLocalSearchParams()
  
  let uri = item?.webformatURL;

  const [status, setStatus] = React.useState('loading')

  const fileName = (item?.previewURL as string)?.split('/').pop();
  
  const imageUrl = uri;

  const filePath = `${FileSystem.documentDirectory}${fileName}`

  const getSize = () => {

    const aspectRatio = item?.imageWidth / item?.imageHeight

    const maxWidth = Platform.OS == 'web' ? Number(wp(50)) : Number(wp(92)) as number;
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

  const handleDownloadImage = async () => {
    if(Platform.OS == 'web') {
      const anchor = document.createElement('a');
      anchor.href = imageUrl;
      anchor.target = '_blank';
      anchor.download = fileName || 'download';
      document.body.appendChild(anchor);  
      anchor.click();
      document.body.removeChild(anchor);
    } else {
      setStatus('downloading')
      let uri = await downloadFile()
      if(uri) {
        showToast({message: 'Image downloaded successfully'})
      }
    }
  }

  const handleShareImage = async () => {
    if(Platform.OS == 'web') {
      showToast({message: 'Link copied to clipboard'})
    } else {
      setStatus('sharing');
      let uri = await downloadFile()
      if(uri) {
        await Sharing.shareAsync(uri)
      }
    }
    
  }

  const downloadFile = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(imageUrl, filePath)
      setStatus('');
      console.log('Finished downloading to ', uri)
      return uri
    } catch (err) {
      console.log('Error downloading file: ', err);
      setStatus('');
      Alert.alert('Failed to download image');
    }
  }

  const showToast = ({message}: {message: string}) => {
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: message,
    });
  }

  const toastConfig: ToastConfig = {
    success: ({ text1, props, ...rest }: ToastConfigParams<any>) => (
      <View style={styles.toast}>
        <Text style={styles.toastTxt}>{text1}</Text>
      </View>
    ),
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
        <View style={styles.loading}>
          {
            status == 'loading' && <ActivityIndicator size='large' color={Colors.primary} />
          }
        </View>
        <Image 
          source={Array.isArray(uri) ? uri[0] : uri}
          transition={100}
          style={[styles.image, getSize()]}
          onLoad={onLoad}
        />
      </View>
      <View style={styles.buttons}>
        <View>
          <Pressable onPress={() => router.back()} style={styles.button}>
            <Octicons name='x' size={24} color='#fff' />
          </Pressable>
        </View>

        <View>
          {
            status == 'downloading' ? (
              <View style={styles.button}>
                <ActivityIndicator size='small' color={Colors.primary} />
              </View>
            ) : (
              <Pressable onPress={handleDownloadImage} style={styles.button}>
                <Octicons name='download' size={24} color='#fff' />
              </Pressable>
            )
          }
          
        </View>

        <View>
        {
            status == 'sharing' ? (
              <View style={styles.button}>
                <ActivityIndicator size='small' color={Colors.primary} />
              </View>
            ) : (
              <Pressable onPress={handleShareImage} style={styles.button}>
                <Entypo name='share' size={22} color='#fff' />
              </Pressable>
            )
          }
          
        </View>
      </View>

      <Toast config={toastConfig} visibilityTime={2500} />

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
  },

  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 50
  },

  button: {
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)'
  },

  toast: {
    padding: 15,
    paddingHorizontal: 30,
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },

  toastTxt: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1
  }

})