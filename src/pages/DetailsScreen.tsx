import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, TextInput, Platform, Alert } from 'react-native';
import AppConstants from '../utils/AppConstants';
import { normalize } from 'react-native-elements';
import { useDispatch, useSelector } from "react-redux";
import { IsLoadingHoc } from "../components/HOCS/IsLoadingHOC";
import { HeaderBar } from "../components/shared/HeaderBar"
import * as RootNavigation from "../navigation/RootNavigation";

interface IDetailsScreenProps {
    navigation: any;
    setLoading: Function
}

const DetailsScreen = (props: IDetailsScreenProps) => {

    const [phrase, setPhrase] = useState(null);

    const dispatch = useDispatch()


    useEffect(() => {

    }, []);

    return (
        <SafeAreaView style={styles.centeredView}>
            <HeaderBar
                title={'Details'}
            />
            <View style={{ flex: 1, flexDirection: "row", paddingHorizontal: normalize(10) }}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => RootNavigation.navigate(AppConstants.routeName.home)}
                        >
                        <Text>Details</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>

    );
}

export default IsLoadingHoc(DetailsScreen);


const styles = StyleSheet.create({
    centeredView: {
        backgroundColor: AppConstants.colors.white,
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
