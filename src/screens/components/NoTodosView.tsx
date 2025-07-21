import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet } from "react-native";

// local imports
import AppColors from '../../common/colors/AppColors';
import PrimaryButton from './PrimaryButton';

// This view is visible when there are no todos in the database
// accepts a prop 'onPress', a function that is called when the button is tapped
const NoTodosView = ({ onPress }: { onPress: () => void }) => {
    return (
        <View style={styles.container}>
            <Icon name="file-text" size={45} color={AppColors.text} />
            <Text style={styles.title}>Wow! Such Empty</Text>
            <Text style={styles.subTitle}>Add your first todo.</Text>
            <PrimaryButton onPress={onPress} title='Add Todo' buttonStyle={styles.button} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: AppColors.text,
        fontWeight: '700',
        fontSize: 18,
        letterSpacing: 5,
        marginTop: 15,
        marginBottom: 4
    },
    subTitle: {
        color: AppColors.text,
        fontWeight: '700',
        fontSize: 18,
        letterSpacing: 2,
        marginBottom: 25
    },
    button: {
        width: 180
    }
})

export default NoTodosView