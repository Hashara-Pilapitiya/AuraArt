import Colors from '@/constants/Colors';
import { capitalize } from '@/helpers/common';
import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

export const SectionView = ({title, content}) => {
    return (
        <View style={styles.section}>
           <View>   
                <Text style={styles.sectionTitle}>{title}</Text>
           </View>
            <View>{content}</View>
        </View>
    )
}

export const CommonFilterRow = ({data, filterName, filters, setFilters}) => {

    const onSelect = (item) => {
        setFilters({...filters, [filterName]: item})
    }
    
    return (
        <View style={styles.flexRowWrap}>
            {
                data && data.map((item, index) => {

                    let isActive = filters && filters[filterName] == item;
                    let backgroundColor = isActive ? Colors.primary : 'transparent';
                    let color = isActive ? 'white' : 'black';

                    return (
                        <Pressable onPress={() => onSelect(item)} key={item} style={[styles.outlinedButton, {backgroundColor}]}>
                            <Text style={[styles.outlinedButtonTxt, {color}]}>{capitalize(item)}</Text>
                        </Pressable>
                    )
                })
            }
        </View>
    )
}


const styles = StyleSheet.create({
    section: {
        marginVertical: 12
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8
    },

    flexRowWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10
    },

    outlinedButton: {
        padding: 10,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1
    },

    outlinedButtonTxt: {
        color: 'gray'
    }
})