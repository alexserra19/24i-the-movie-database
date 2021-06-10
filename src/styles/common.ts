import { StyleProp } from 'react-native';
import { normalize } from 'react-native-elements';

export const commonStyles: StyleProp<any> = {

    title:{
        fontSize: normalize(22),
        fontWeight: 'bold',
    },

    sectionTitleMargin:{
        marginBottom: normalize(10)
    },

    row:{
        flexDirection: 'row',
    },

    column:{
        flexDirection: 'column',
    },
    shadows:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },

}
