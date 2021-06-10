import React from 'react';
import { View, StyleSheet, Text, Image, Platform } from 'react-native';
import AppConstants from '../../utils/AppConstants';
import { normalize } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { commonStyles } from '../../styles/common';
import * as RootNavigation from '../../Navigation/RootNavigation';
import { useDispatch } from "react-redux";


interface IHeaderBarProps {
    title: string;
    onPress?: () => void;
}

export const HeaderBar = (props: IHeaderBarProps) => {

    return (
        <View style={styles.barContainer}>
            <View style={styles.iconContainer}>
                {/* <Image style={styles.iconStyle} source={require('../../assets/images/cat-icon.png')} /> */}
            </View>

            <View style={styles.titleContainer}>
                <Text style={[styles.headerBarText, commonStyles.sectionTitle]}>{props.title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    barContainer: {
        width: '100%',
        height: Platform.OS === 'ios' ? normalize(50) : normalize(50),
        backgroundColor: AppConstants.colors.white,
        borderBottomColor: AppConstants.colors.gray,
        borderBottomWidth: 5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center'
    },

    iconStyle: {
        width: normalize(40),
        height: normalize(40),
        resizeMode: 'contain',
    },

    titleContainer: {
        flex: 4,
        alignItems: 'flex-end',
        paddingRight: normalize(20)
    },

    headerBarText: {
        fontWeight: 'bold',
        color: AppConstants.colors.black,
        paddingLeft: normalize(10),
        fontSize: normalize(20)
    },
});