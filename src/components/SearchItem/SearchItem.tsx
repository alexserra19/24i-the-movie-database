import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ViewStyle } from 'react-native';
import AppConstants from '../../utils/AppConstants';
import { normalize } from 'react-native-elements';
import { commonStyles } from '../../styles/common';
import helpers from '../../utils/helpers';

interface ISearchItemProps {
    item: any;
    onPress: (item: any) => void;
    containerStyle?: ViewStyle;
}

export const SearchItem = (props: ISearchItemProps) => {

    return (
        <TouchableOpacity
            onPress={() => props.onPress(props.item)}
        >
            <View style={[styles.container, commonStyles.row]}>
                <Image
                    style={styles.image}
                    source={
                        props.item.image ? 
                        { uri: props.item.image }
                        : require('../../assets/images/no-image.png')
                    }
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{helpers.reduceText(props.item.title, 20)}</Text>
                </View>

            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: AppConstants.colors.white,
        height: normalize(160),
        marginBottom: normalize(20)
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
        flex: 1
    },
    textContainer: {
        padding: 3,
        flex: 2
    },
    title: {
        fontSize: normalize(15),
    },
    categories: {
        fontSize: normalize(10),
        color: AppConstants.colors.gray,
    }
});