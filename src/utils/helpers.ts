import { Alert, Dimensions } from "react-native";

export default {
    reduceText,
    isLandscape,
    handleNetworkError
}

function reduceText(text: string, length: number) {
    return text.slice(0, length) + (text.length > length ? '...' : '')
}

function isLandscape(){
    const {height, width } = Dimensions.get('window')
    return width >= height;
}

function handleNetworkError() {
    Alert.alert(
        "Error",
        "There has been an error, please try again",
        [
            { text: "Ok" }
        ],
        { cancelable: false }
    )
}