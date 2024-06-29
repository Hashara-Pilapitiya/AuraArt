import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import {
    BottomSheetModal,
    BottomSheetView
  } from '@gorhom/bottom-sheet';
import { useMemo } from 'react';
import { BlurView } from 'expo-blur';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Colors from '@/constants/Colors';

const FiltersModel = ({modalRef}) => {

    const snapPoints = useMemo(() => ['75%'], []);


  return (
        <BottomSheetModal
            ref={modalRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            backdropComponent={CustomBackdrop}
            // onChange={handleSheetChanges}
        >
            <BottomSheetView style={styles.contentContainer}>
                <View style={styles.content}></View>
                <Text style={styles.filterTxt}>Filters</Text>
                <Text style={styles.filterTxt}>Sections Here.</Text>
            </BottomSheetView>
        </BottomSheetModal>
  )
}

export default FiltersModel

const CustomBackdrop = ({ animatedIndex, style}) => {

    const containerAnimatedStyle = useAnimatedStyle(() => {
        let opacity = interpolate(
            animatedIndex.value,
            [-1, 0],
            [0, 1],
            Extrapolation.CLAMP
        )
        return {
            opacity
        }

    })

    const containerStyle = [
        StyleSheet.absoluteFill,
        style,
        styles.overlay,
        containerAnimatedStyle
    ]

    return (
        <Animated.View style={containerStyle}>

            {/* Blur View */}
            <BlurView
                style={StyleSheet.absoluteFill}
                tint='dark'
                intensity={100}
            />

        </Animated.View>
    )
}


const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },

    overlay: {
        backgroundColor: 'rgba(0,0,0,0.8)',
    },

    content: {
        width: '100%',
        gap: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    filterTxt: {
        color: Colors.textColor,
        fontSize: 30,
        fontWeight: 'bold',
       marginBottom: 5
    }
})