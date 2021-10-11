import React from 'react'
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { moderateScale } from 'react-native-size-matters';

const CardsComponent = ({ imageName, activeStatus, onPress }) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ ...styles.view, backgroundColor: activeStatus ? 'lightgrey' : "darkgrey" }}>
            {activeStatus && <Image
                resizeMode="contain"
                source={imageName}
                style={styles.image} />}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        width: moderateScale(80),
        height: moderateScale(80),
    },
    view: {
        width: moderateScale(112),
        height: moderateScale(150),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(10),
        marginHorizontal: moderateScale(5),
        marginVertical: moderateScale(5),

    }
})

export default CardsComponent;