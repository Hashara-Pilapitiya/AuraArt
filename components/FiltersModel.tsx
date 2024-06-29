import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import {
    BottomSheetModal,
    BottomSheetView
  } from '@gorhom/bottom-sheet';
import { useMemo } from 'react';

const FiltersModel = ({modalRef}) => {

    const snapPoints = useMemo(() => ['75%'], []);


  return (
        <BottomSheetModal
            ref={modalRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            // onChange={handleSheetChanges}
        >
            <BottomSheetView style={styles.contentContainer}>
                <Text>Awesome 🎉</Text>
            </BottomSheetView>
        </BottomSheetModal>
  )
}

export default FiltersModel


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },

    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
})