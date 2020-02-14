import {StyleSheet} from 'react-native';
import { bold } from 'ansi-colors';

export const globalStyles = StyleSheet.create({
    container: {
        flex:1,
        padding: 20,
    },
    titleText: {
        fontSize: 18,
        color: 'black',
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: "center"
        
    }
});
