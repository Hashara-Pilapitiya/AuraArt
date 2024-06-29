import { StyleSheet, View, Text, Pressable } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { getImageSize } from '../helpers/common'

interface ItemType {
  imageHeight: number;
  imageWidth: number;
  webformatURL: string;
  // Define the rest of the properties of 'ItemType' here
}

interface ImageCardProps {
  item: ItemType;
  index: number;
  columns: number;
  router: any;
}

const ImageCard = ({item, index, columns, router}: ImageCardProps) => {

  const isLastInRow = () => {
    return (index+1) % columns === 0;
  }

  const getImageHeight = () => {
    let {imageHeight: height, imageWidth: width} = item;
    return {height: getImageSize(height, width)};
  }

  return (
    <Pressable onPress={() => router.push({pathname: 'home/image', params: {...item}})} style={[styles.imageWrapper, !isLastInRow() && styles.spacing]}>
      <Image
        style={[styles.image, getImageHeight()]}
        source={{uri: item?.webformatURL}}
        transition={100}
      />
      {/* <Image style={styles.image} source={{uri: item?.webformatURL}} /> */}
    </Pressable>
  )
}

export default ImageCard


const styles = StyleSheet.create({
  image: {
    height: 300,
    width: '100%',
  },

  imageWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    borderCurve: 'continuous',
    marginBottom: 10,
  }, 

  spacing: {
    marginRight: 10
  }
})