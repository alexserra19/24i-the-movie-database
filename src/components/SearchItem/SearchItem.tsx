import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ViewStyle } from 'react-native';
import AppConstants from '../../utils/AppConstants';
import { normalize } from 'react-native-elements';
import { commonStyles } from '../../styles/common';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';


interface ISearchItemProps {
    item: any;
    onPress: (item: any) => void;
    containerStyle?: ViewStyle;
    isLandscape?: boolean
}

export const SearchItem = (props: ISearchItemProps) => {

    return (
        <TouchableOpacity
            onPress={() => props.onPress(props.item)}
        >
            <View style={[styles.container, commonStyles.row]}>
                <Image
                    style={[
                        styles.image,
                        { resizeMode: !props.isLandscape ? 'stretch' : 'cover' }
                    ]}
                    source={props.item.image ? { uri: props.item.image } : require('../../assets/images/no-image.jpeg')}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.date}>{props.item.date}</Text>
                    <Text style={styles.title}>{props.item.title}</Text>
                    <View style={[commonStyles.column, { flex: 1, justifyContent: 'flex-end' }]}>
                        <View style={[commonStyles.row, { alignItems: 'center' }]}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={props.item.rate}
                                selectedStar={(rating) => { }}
                                starSize={normalize(20)}
                            />
                            <Text style={styles.numVotes}>{props.item.numVotes}</Text>
                            <View style={styles.favStar}>
                                <Icon name="star-o" size={normalize(20)} />
                            </View>

                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: AppConstants.colors.white,
        height: normalize(130),
        marginBottom: normalize(20)
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
        flex: 1
    },
    textContainer: {
        padding: normalize(10),
        flex: 2,
    },
    date: {
        fontSize: normalize(15),
        color: AppConstants.colors.gray
    },
    title: {
        fontSize: normalize(20),
    },
    categories: {
        fontSize: normalize(10),
        color: AppConstants.colors.gray,
    },

    numVotes: {
        fontSize: normalize(15),
        marginLeft: normalize(10)
    },
    favStar: {
        width: '100%',
        alignItems: 'flex-end',
        flex: 1
    }
});