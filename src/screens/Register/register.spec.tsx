import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import Theme from '../../global/theme';
import { Register } from '.'

import * as mockAsyncStorage from '@react-native-async-storage/async-storage';
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('@react-navigation/native', () => {
    return {
        useNavigation: jest.fn(),
    }
});


const Providers: React.FC = ({ children }) => (
    <ThemeProvider theme={Theme}>
        { children }
    </ThemeProvider>
);

describe('Register Screen', () => {
    it('should be open category modal when user click on button', () => {
        const { getByTestId } = render(
            <Register />,
            {
                wrapper: Providers
            }
        );

        const categoryModal = getByTestId('modal-category');
        const buttonCategory = getByTestId('button-category');
        fireEvent.press(buttonCategory);

        waitFor(() => {
            expect(categoryModal.props.visible).toBeTruthy();
        });
    });
});