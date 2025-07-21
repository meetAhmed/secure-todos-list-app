import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '../src/navigation/RootNavigator';

// mocking screen components used in RootNavigator, so we do not need to render the full implementation of this screen.
jest.mock('../src/screens/TodoListScreen', () => () => {
    // We inline a simple React component that just returns a text element
    const React = require('react');
    const { Text } = require('react-native');
    return <Text>Todo List Screen</Text>;
});

// mocking screen components used in RootNavigator, so we do not need to render the full implementation of this screen.
jest.mock('../src/screens/TodoDetailScreen', () => () => {
    const React = require('react');
    const { Text } = require('react-native');
    return <Text>Todo Detail Screen</Text>;
});

describe('RootNavigator', () => {
    it('renders the initial screen (TodoListScreen)', () => {
        // wrap the navigator in NavigationContainer to provide routing context, like a real app.
        const { getByText } = render(
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        );

        // assert that the mocked screen's text appears in the output,
        // which confirms that the initial route in the navigator was rendered.
        expect(getByText('Todo List Screen')).toBeTruthy();
    });
});