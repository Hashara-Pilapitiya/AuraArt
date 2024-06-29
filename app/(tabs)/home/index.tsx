import { StyleSheet, View, Text, TouchableOpacity, Pressable, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'
import Categories from '@/components/Categories'
import { apiCall } from '../../../api'
import ImageGrid from '@/components/ImageGrid'
import { debounce } from 'lodash'
import FiltersModel from '@/components/FiltersModel'

let page = 1;

const HomeScreen = () => {

  const router = useRouter();

  const {top} = useSafeAreaInsets();

  const paddingTop = top > 0 ? top+70: 30;

  const [search, setSearch] = React.useState('')  

  const searchInputRef = React.useRef(null);

  const [activeCategory, setActiveCategory] = React.useState(null)

  const [images, setImages] = React.useState([])

  const [filters, setFilters] = React.useState(null)

  const modalRef = React.useRef(null)

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

  const openFiltersModal = () => {
    modalRef?.current?.present();
  }

  const closeFiltersModal = () => {
    modalRef?.current?.close();
  }

  const applyFilters = () => {
    if(filters) {
      page = 1;
      setImages([]);
      let params = {
        page,
        ...filters
      }
      if(activeCategory) params.category = activeCategory;
      fetchImages(params, false);
    }
    closeFiltersModal();
  }

  const resetFilters = () => {
    if(filters) {
      page = 1;
      setFilters(null);
      setImages([]);
      let params = {
        page
      }
      if(activeCategory) params.category = activeCategory;
      fetchImages(params, false);
    }
    closeFiltersModal();
  }

  const handleChangeCategory = (cat: any) => {
    setActiveCategory(cat)
    clearSearch();
    setImages([]);
    page = 1;
    let params = {
      page,
      ...filters
    }
    if(cat) params.category = cat;
    fetchImages(params, false);
  }

  const handleSearch = (text) => {
    setSearch(text);

    if(text.length > 2) {
      page = 1;
      setImages([]);
      setActiveCategory(null);
      fetchImages({page, q: tex, ...filters}, false)
    } 

    if(text == '') {
      page = 1;
      searchInputRef?.current?.clear();
      setImages([]);
      setActiveCategory(null);
      fetchImages({page, ...filters}, false)
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
          <Pressable onPress={openFiltersModal}>
              <View style={{backgroundColor: Colors.primary, padding: 8, borderRadius: 10, marginTop: -8}}>
                  <FontAwesome6 name='bars-staggered' size={22} color='white' />
                
              </View>
          </Pressable>
      )

    }} />

    <View style={{paddingTop}}>

    <ScrollView contentContainerStyle={{gap: 15}} showsVerticalScrollIndicator={false}>

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

      {/* Filters */}

      {/* Images */}
      <View>
          {
            images.length > 0 && <ImageGrid images={images} />
          }
      </View>

      {/* Load More */}
      <View style={{marginBottom: 70, marginTop: images.length > 0 ? 10 : 70}}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>

    </ScrollView>

    {/* Filters Model */}
    <FiltersModel
     modalRef={modalRef}
     filters={filters}
     setFilters={setFilters}
     onClose={closeFiltersModal}
     onApply={applyFilters}
     onReset={resetFilters}
    />
    

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