import { Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from "react-native";

// local imports
import AppColors from '../../common/colors/AppColors';

// define the expected properties for the PrimaryButton component
type Props = {
    title?: string; // title to display on the button
    buttonStyle?: ViewStyle; // styles for button container
    textStyle?: TextStyle; // styles for text
    onPress: () => void; // function to be called when button is pressed
};

const PrimaryButton = ({
    title,
    buttonStyle,
    textStyle,
    onPress,
}: Props) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.floatingButton, buttonStyle]}>
            <Text style={[styles.title, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    floatingButton: {
        backgroundColor: AppColors.primary,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: AppColors.primaryBtnText,
        fontSize: 16,
        fontWeight: '600',
    },
});

export default PrimaryButton;
