import { Dimensions } from "react-native";

export default {
    reduceText,
    isLandscape
}

function reduceText(text: string, length: number) {
    
    return text.slice(0, length) + (text.length > length ? '...' : '')
}

function isLandscape(){
    const {height, width } = Dimensions.get('window')
    return width >= height;
}