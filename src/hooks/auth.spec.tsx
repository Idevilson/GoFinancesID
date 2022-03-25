import fetch from 'jest-fetch-mock';

import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './auth';
import { startAsync } from 'expo-auth-session';
import fetchMock from 'jest-fetch-mock';
import { mocked } from 'jest-mock';
fetchMock.enableMocks();
import * as mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('expo-auth-session');
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);



describe('Auth Hook', () => {
    it('should be able to sign in with Gogle accoung existing', async () => {
        const googleMocked = mocked(startAsync as any);

        googleMocked.mockReturnValueOnce({
            type: 'success',
            params: {
                access_token: 'any_token',
            }
        });

        fetch.mockResponseOnce(JSON.stringify(
            {
                id: 'any_id',
                email: 'idevilsonjunior@outlook.com',
                name: 'Idevilson',
                photo: 'any_photo.png'
            }
        ));

        const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        act(async () => await result.current.signInWithGoogle());
        await waitForNextUpdate();

        expect(result.current.user.email)
        .toBe('idevilsonjunior@outlook.com');
    });

    // it('user should not connect if cancel authenticcation with Google', async () => {
    //     const googleMocked = mocked(startAsync as any);

    //     googleMocked.mockReturnValueOnce({
    //         type: 'cancel',
    //     });

    //     const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
    //         wrapper: AuthProvider
    //     });

    //     act(async () => await result.current.signInWithGoogle());
    //     await waitForNextUpdate();

    //     expect(result.current.user).toHaveProperty('id');
    // });
});