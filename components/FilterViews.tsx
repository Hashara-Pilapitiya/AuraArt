import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

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

export const CommonFilterRow = () => {
    return (
        <View>
            <Text>Order</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    section: {
        marginVertical: 8
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})