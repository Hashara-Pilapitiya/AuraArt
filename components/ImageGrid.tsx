import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { MasonryFlashList } from '@shopify/flash-list'
import ImageCard from './ImageCard'
import { wp, getColumnCount  } from '../helpers/common'

const ImageGrid = ({images, router}: {images: any[], router: any}) => {

  const columns = getColumnCount()

    return (
        <View style={styles.container}>
          <MasonryFlashList
            data={images}
            numColumns={columns}
            contentContainerStyle={styles.listContainerStyle}
            renderItem={({ item, index }) => <ImageCard router={router} item={item} index={index} columns={columns} />}
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


