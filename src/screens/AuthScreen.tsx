import { StyleSheet, Text, View } from "react-native";
import { Alert } from 'react-native';

// local imports
import { useAppDispatch } from '../redux/store';
import { setAuthState } from '../redux/slices/authSlice';
import AppColors from "../common/colors/AppColors";
import PrimaryButton from './components/PrimaryButton';
import { authenticate } from '../common/utils/AuthUtils';

/*
AuthScreen is the first screen displayed on screen. 
This screen asks users to perform authentication to use the app.
 */
export default function AuthScreen() {
    // redux dispatch function
    const dispatch = useAppDispatch()

    // called when user taps the auth button.
    // It initiates biometric authentication.
    // If successful, it updates the auth state in redux.
    // If failed, it shows an alert.
    const handleAuthBtnTap = async () => {
        const isAuthenticated = await authenticate();
        if (!isAuthenticated) return Alert.alert("Authentication Failed", "Please use correct credentials or try again.");

        // update state to reflect successful authentication
        dispatch(setAuthState(true))
    }

    return (
        <View style={styles.container}>
            {/* App Title */}
            <Text style={styles.title}>Secure Todos App</Text>

            {/* Reason why we need authentication */}
            <View style={styles.descriptionBox}>
                <Text style={styles.description}>
                    We keep your todos secure on your device. We use Face ID or Fingerprint to make sure only you can access your data.
                </Text>
            </View>

            {/* auth button */}
            <PrimaryButton title='Authenticate Now' onPress={handleAuthBtnTap} buttonStyle={{ width: 200 }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.background,
        padding: 20
    },
    title: {
        color: AppColors.text,
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 8,
    },
    descriptionBox: {
        backgroundColor: AppColors.card,
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    description: {
        color: AppColors.text,
        fontSize: 14,
        textAlign: 'center'
    }
})