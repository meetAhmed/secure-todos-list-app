import * as LocalAuthentication from 'expo-local-authentication';
import { authenticate } from '../src/common/utils/AuthUtils';

// mock entire module
// replace real implementation with fake ones (Jest mock functions)
jest.mock('expo-local-authentication', () => ({
    hasHardwareAsync: jest.fn(),
    isEnrolledAsync: jest.fn(),
    authenticateAsync: jest.fn(),
}));

describe('authenticate', () => {
    // if hasHardwareAsync and isEnrolledAsync is true, and user authenticate successfully,
    // then authenticate() method should return True.
    it('should return true when authentication is successful', async () => {
        // all native calls will return true
        (LocalAuthentication.hasHardwareAsync as jest.Mock).mockResolvedValue(true);
        (LocalAuthentication.isEnrolledAsync as jest.Mock).mockResolvedValue(true);
        (LocalAuthentication.authenticateAsync as jest.Mock).mockResolvedValue({ success: true });

        // perform authentication
        const result = await authenticate();

        // check result, should be true
        expect(result).toBe(true);
    });

    it('should return false if hardware is not available', async () => {
        // if device does not support authentication
        (LocalAuthentication.hasHardwareAsync as jest.Mock).mockResolvedValue(false);

        // perform authentication
        const result = await authenticate();

        // check result, should be false
        expect(result).toBe(false);
    });

    it('should return false if no biometrics enrolled', async () => {
        // if device supports authentication but user has not setup Auth
        (LocalAuthentication.hasHardwareAsync as jest.Mock).mockResolvedValue(true);
        (LocalAuthentication.isEnrolledAsync as jest.Mock).mockResolvedValue(false);

        // perform authentication
        const result = await authenticate();

        // check result, should be false
        expect(result).toBe(false);
    });

    it('should return false if authentication fails', async () => {
        // user is not able to prove authentication
        (LocalAuthentication.hasHardwareAsync as jest.Mock).mockResolvedValue(true);
        (LocalAuthentication.isEnrolledAsync as jest.Mock).mockResolvedValue(true);
        (LocalAuthentication.authenticateAsync as jest.Mock).mockResolvedValue({ success: false });

        // perform authentication
        const result = await authenticate();

        // check result, should be false
        expect(result).toBe(false);
    });
});