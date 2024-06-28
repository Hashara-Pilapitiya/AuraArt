import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { MasonryFlashList } from '@shopify/flash-list'
import ImageCard from './ImageCard'
import { wp } from '../helpers/common'



const ImageGrid = ({images}) => {
    return (
        <View style={styles.container}>
          <MasonryFlashList
            data={images}
            numColumns={2}
            initialNumToRender={100}
            contentContainerStyle={styles.listContainerStyle}
            renderItem={({ item }) => <ImageCard />}
            estimatedItemSize={200}
          />
        </View>
        
  )
}

export default ImageGrid


const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: wp(100)
  },

  listContainerStyle: {
    paddingHorizontal: 20,
  }
})