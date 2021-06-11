import React from 'react';
import { View, StyleSheet, Text, Image, Platform, TouchableOpacity, ViewStyle } from 'react-native';
import AppConstants from '../../utils/AppConstants';
import { normalize } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { commonStyles } from '../../styles/common';
import * as RootNavigation from '../../Navigation/RootNavigation';



interface IHeaderBarProps {
    title: string;
    onPress?: () => void;
    containerStyle: ViewStyle
}

export const HeaderBar = (props: IHeaderBarProps) => {

    return (
        <View style={[styles.barContainer, props.containerStyle]}>
            <View style={styles.iconContainer}>
                <TouchableOpacity
                    onPress={props.onPress}
                >
                    <Text>
                        <Icon name="arrow-left" size={normalize(30)} color={AppConstants.colors.white}/>
                    </Text>
                </TouchableOpacity>
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
        height: normalize(50),
        alignItems: 'center',
        flexDirection: 'row',
        padding: normalize(10),
    },
    iconContainer: {
        flex: 1,
        alignItems: 'flex-start',

    },
    titleContainer: {
        flex: 4,
        alignItems: 'flex-start',
        paddingRight: normalize(20)
    },

    headerBarText: {
        fontWeight: 'bold',
        color: AppConstants.colors.white,
        fontSize: normalize(20)
    },
});