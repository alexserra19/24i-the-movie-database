import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ViewStyle } from 'react-native';
import AppConstants from '../../utils/AppConstants';
import { normalize } from 'react-native-elements';
import { commonStyles } from '../../styles/common';
import helpers from '../../utils/helpers';

interface IMediaListItemProps {
    item: any;
    onPress: (item: any) => void;
    containerStyle?: ViewStyle;
    categories: string
}

export const MediaListItem = (props: IMediaListItemProps) => {

    return (
        <TouchableOpacity
            onPress={() => props.onPress(props.item)}
        >
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{ uri: props.item.image }}
                />
                <View style={styles.textContainer}>

                <Text style={styles.title}>{helpers.reduceText(props.item.title, 20)}</Text>
                <Text style={styles.categories}>{helpers.reduceText(props.categories, 20)}</Text>
                </View>

            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: { 
        width: normalize(120), 
        marginRight: 10, 
        backgroundColor: 
        AppConstants.colors.white, 
        height: normalize(160) 
    },
    image: {
        width: '100%', 
        height: '60%', 
        resizeMode: 'stretch'
    },
    textContainer: {
        padding: 3 
    },
    title: {
        fontSize: normalize(15),
    },
    categories: {
        fontSize: normalize(10),
        color: AppConstants.colors.gray,
    }
});