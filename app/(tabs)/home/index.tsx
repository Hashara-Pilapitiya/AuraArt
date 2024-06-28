import { StyleSheet, View, Text, TouchableOpacity, Pressable, ScrollView, TextInput } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'
import Categories from '@/components/Categories'
import { apiCall } from '../../../api'
import ImageGrid from '@/components/ImageGrid'
import { debounce } from 'lodash'

let page = 1;

const HomeScreen = () => {

  const router = useRouter();

  const {top} = useSafeAreaInsets();

  const paddingTop = top > 0 ? top+70: 30;

  const [search, setSearch] = React.useState('')  

  const searchInputRef = React.useRef(null);

  const [activeCategory, setActiveCategory] = React.useState(null)

  const [images, setImages] = React.useState([])

  useEffect(() => {
    fetchImages()
  }, []);

  const fetchImages = async (params={page: 1}, append=false) => {
    console.log('fetching images', params, append)
    let res = await apiCall (params);
    if (res.success && res?.data?.hits) {
      if(append) {
        setImages([...images, ...res.data.hits])
      } else {
        setImages([...res.data.hits])
      }
    }
  }

  const handleChangeCategory = (cat: any) => {
    setActiveCategory(cat)
  }

  const handleSearch = (text) => {
    setSearch(text);

    if(text.length > 2) {
      page = 1;
      setImages([]);
      fetchImages({page, q: text})
    } 

    if(text == '') {
      page = 1;
      searchInputRef?.current?.clear();
      setImages([]);
      fetchImages({page})
    }
}

const clearSearch = () => {
  setSearch('');
  searchInputRef?.current?.clear();
  page = 1;

}


const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

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
          // value={search}
          ref={searchInputRef}
          onChangeText={handleTextDebounce}
          style={styles.searchBarInput} />

        {
          search && (
            <Pressable onPress={() => handleSearch('')} style={styles.closeIcon}>
              <Ionicons name='close' size={20} color={Colors.primary} />
            </Pressable>
          )
        }

    
      </View>

      {/* Categories */}
      <View style={styles.categories}>

        <Categories activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />

      </View>

      {/* Images */}
      <View>
          {
            images.length > 0 && <ImageGrid images={images} />
          }
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
  },

  categories: {
    marginHorizontal: 20
  }
})