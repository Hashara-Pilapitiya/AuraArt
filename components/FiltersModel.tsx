import { StyleSheet, View, Text, Pressable } from 'react-native'
import React from 'react'
import {
    BottomSheetModal,
    BottomSheetView
  } from '@gorhom/bottom-sheet';
import { useMemo } from 'react';
import { BlurView } from 'expo-blur';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { ColorFilter, CommonFilterRow, SectionView } from '../components/FilterViews';
import { capitalize } from '@/helpers/common';
import { data } from '@/constants/data';

const FiltersModel = ({modalRef, onClose, onApply, onReset, filters, setFilters}) => {

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
                {
                    Object.keys(sections).map((sectionName, index) => {
                        let sectionView = sections[sectionName];
                        let sectionData = data.filters[sectionName];
                        let title = capitalize(sectionName);
                        return (
                            <View key={sectionName}>
                                <SectionView
                                    title={title}
                                    content={sectionView({
                                        data: sectionData,
                                        filters,
                                        setFilters,
                                        filterName: sectionName
                                    })}
                                />
                            </View>
                        )
                            
                    })
                }

                <View style={styles.buttons}>

                    <Pressable onPress={onReset} style={styles.resetBtn}>
                        <Text style={styles.resetBtnTxt}>Reset</Text>
                    </Pressable> 

                    <Pressable onPress={onApply} style={styles.applyBtn}>
                        <Text style={styles.applyBtnTxt}>Apply</Text>
                    </Pressable>  

                </View>


            </BottomSheetView>
        </BottomSheetModal>
  )
}

export default FiltersModel

const sections = {
    "order": (props) => <CommonFilterRow {...props} />,
    "orientation": (props) => <CommonFilterRow {...props} />,
    "type": (props) => <CommonFilterRow {...props} />,
    "colors": (props) => <ColorFilter {...props} />
}

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
        marginHorizontal: 20,
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
    },

    buttons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30, 
    },

    resetBtn: {
        flex: 1,
        padding: 15,
        backgroundColor: 'gray',
        borderRadius: 10,
        marginRight: 10,
        alignItems: 'center'
    },

    resetBtnTxt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17
    },

    applyBtn: {
        padding: 15,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center'
    },

    applyBtnTxt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17
    }
})