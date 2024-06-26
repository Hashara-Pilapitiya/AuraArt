import { StyleSheet, Text, View, Image, Pressable } from 'react-native'; 
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { wp, hp } from '../../helpers/common';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';

const  Welcome = () => {

  const router = useRouter();

  return (
    <>
    
    <Stack.Screen options={{ headerTransparent: true, headerTitle: '', 
    }}  />

    <View style={styles.container}>
      {/* Background Image */}
      <StatusBar style='light' />
      <Image 
      source={require('../../assets/images/welcome.jpg')}
      style={styles.bgImage}
      resizeMode='cover' />

      {/* Linear Graident */}
      <View style={{flex: 1}}>
        <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.6)', 'white', 'white']}
        style={styles.gradient}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 0.8}} 
        />

        {/* Welcome Text */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            AuraArt
          </Text>
          <Text style={styles.punchline}>
            Every Art Tells a Story.
          </Text>
          <View>
            <Pressable onPress={() => router.push('home')} style={styles.startButton}>
              <Text style={styles.statrTxt}>Start Explore</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>

    
    
    </>
  );
}

export default Welcome;



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  bgImage: {
    width: '100%',
    // height: '100%',
    height: hp(220),
    position: 'absolute',
  },

  gradient: {
    position: 'absolute',
    top: 320,
    width: wp(100),
    height: hp(150),
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 15
  },

  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: Colors.textColor,
  },

  punchline: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
  },

  startButton: {
    backgroundColor: Colors.primary,
    width: wp(80),
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 50
  },

  statrTxt: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
