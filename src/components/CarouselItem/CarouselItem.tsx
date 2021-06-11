import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ViewStyle } from 'react-native';
import AppConstants from '../../utils/AppConstants';
import { normalize } from 'react-native-elements';
import { commonStyles } from '../../styles/common';
import helpers from '../../utils/helpers';

interface ICarouselItemProps {
    item: any;
    onPress: (item: any) => void;
    containerStyle?: ViewStyle;
    isLandscape?: boolean
}

export const CarouselItem = (props: ICarouselItemProps) => {
    return (
        <TouchableOpacity
            onPress={() => props.onPress(props.item)}
        >
            <View style={[commonStyles.row, styles.principalMovie, commonStyles.shadows]}>
                <Image
                    style={{ width: '100%', height: '100%', resizeMode: !props.isLandscape ? 'stretch' : 'cover' }}
                    source={{ uri: props.item.image }}
                />
                <View style={styles.principalMovieTextContainer}>
                    <Text style={{ color: AppConstants.colors.white }}>
                        {helpers.reduceText(props.item.description, props.isLandscape ? 80 : 20)}
                    </Text>
                    <Text style={{ color: AppConstants.colors.white, fontSize: normalize(20) }}>
                        {helpers.reduceText(props.item.title, props.isLandscape ? 80 : 20)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    principalMovie: {
        marginTop: normalize(20),
        height: normalize(200),
        width: '100%',
    },

    principalMovieTextContainer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        backgroundColor: AppConstants.colors.black,
        padding: normalize(10),
        opacity: 0.8
    },
});