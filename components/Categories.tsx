import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import { data } from '../constants/data'
import Colors from '@/constants/Colors'

const Categories = ({activeCategory, handleChangeCategory}: {activeCategory: string, handleChangeCategory: (category: string | null) => void}) => {
  return (
   
   <FlatList 
   horizontal
   contentContainerStyle={styles.flatlistContiner}
   showsHorizontalScrollIndicator={false}
   data={data.categories}
   keyExtractor={item => item}
   renderItem={({item, index}) => (
    <CategoryItem
    isActive={activeCategory === item}
    handleChangeCategory={handleChangeCategory}
    title={item} index={index} />
    )}
   />
  )
}

const CategoryItem = ({title, index, isActive, handleChangeCategory}: {title: string, index: number, isActive: boolean, handleChangeCategory: (category: string | null) => void}) => {

    let color = isActive ? Colors.primary :  'black'
    let backgroundColor = isActive ? 'white' : Colors.lightGray
    let borderColor = isActive ? Colors.primary : 'black'
    let borderWidth = isActive ? 2 : 0

    return (
        <View>
            <Pressable onPress={() => handleChangeCategory(isActive ? null : title)} style={[styles.category, {backgroundColor}, {borderColor}, {borderWidth}]}>
                <Text style={[styles.title, {color}]}>{title}</Text>
            </Pressable>
        </View>
    )
}

export default Categories


const styles = StyleSheet.create({
  flatlistContiner: {
    marginTop: 10,
    gap: 15,
  },

    category: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },

    title: {
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 0.5
    }
})






