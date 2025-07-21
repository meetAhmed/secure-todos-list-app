import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, TouchableOpacity } from "react-native";

// local imports
import AppColors from '../../common/colors/AppColors';

// FloatingButton
// accepts a prop 'onPress', a function that is called when the button is tapped
const FloatingButton = ({ onPress }: { onPress: () => void }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.floatingButton}>
            <Icon name="plus" size={20} color={AppColors.floatingButtonIcon} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    floatingButton: {
        backgroundColor: AppColors.primary,
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FloatingButton