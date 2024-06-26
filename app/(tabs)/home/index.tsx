import { StyleSheet, View, Text, TouchableOpacity, Pressable, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'
import Categories from '@/components/Categories'

const HomeScreen = () => {

  const router = useRouter();

  const {top} = useSafeAreaInsets();

  const paddingTop = top > 0 ? top+70: 30;

  const [search, setSearch] = React.useState('')  

  const searchInputRef = React.useRef(null);

  const [activeCategory, setActiveCategory] = React.useState(null)

  const handleChangeCategory = (cat: any) => {
    setActiveCategory(cat)
  }

  return (
    <>
    <Stack.Screen options={{
      headerTransparent: true,
      headerTitle: '',
      headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
              <View style={{backgroundColor: Colors.primary, padding: 8, borderRadius: 10}}>
                  <Feather name='arrow-left' size={22} color='white' />
              </View>
          </TouchableOpacity>
      ),

      headerRight: () => (
          <Pressable onPress={() => router.navigate('Profile')}>
              <View style={{backgroundColor: Colors.primary, padding: 8, borderRadius: 10, marginTop: -8}}>
                  <FontAwesome6 name='bars-staggered' size={22} color='white' />
                
              </View>
          </Pressable>
      )

    }} />

    <View style={{paddingTop}}>

    <ScrollView contentContainerStyle={{gap: 15}}>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <View style={styles.searchBarIcon}>
          <Feather name='search' size={20} color={Colors.primary} />
        </View>

        <TextInput placeholder='Search for photos...'
          value={search}
          ref={searchInputRef}
          onChangeText={value => setSearch(value)}
          style={styles.searchBarInput} />

        {
          search && (
            <Pressable style={styles.closeIcon}>
              <Ionicons name='close' size={20} color={Colors.primary} />
            </Pressable>
          )
        }

    
      </View>

      {/* Categories */}
      <View style={styles.categories}>

        <Categories activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />

      </View>

    </ScrollView>

    </View>

    </>
  )
}

export default HomeScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    marginTop: 40
  },

  searchBar: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgColor,
    padding: 10,
    borderRadius: 20,
    borderColor: Colors.primary,
    borderWidth: 2
  },

  searchBarIcon: {
    marginRight: 10
  },

  searchBarInput: {
    flex: 1,
    fontSize: 16
  },

  closeIcon: {
    padding: 5,
    borderRadius: 10
  }
})