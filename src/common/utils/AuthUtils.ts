import * as LocalAuthentication from 'expo-local-authentication';

/*
Prompts the user for biometric authentication (e.g. Face ID, Touch ID, fingerprint).
Returns `true` if authentication is successful, otherwise `false`.
 */
export async function authenticate(): Promise<boolean> {
    // check if device has necessary biometric hardware (fingerprint scanner)
    const isAvailable = await LocalAuthentication.hasHardwareAsync();

    // check if user has set up biometrics on the device (enrolled fingerprint or face)
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    // if hardware is not available or no biometrics are enrolled, return false
    if (!isAvailable || !isEnrolled) return false;

    // show auth prompt to user
    const result = await LocalAuthentication.authenticateAsync({
        // custom message 
        promptMessage: 'Authenticate to use Secure Todos App',

        // label for the fallback button (passcode or PIN)
        fallbackLabel: 'Enter device PIN to continue',
    });

    // return whether authentication was successful
    return result.success;
}