import { createNativeStackNavigator } from '@react-navigation/native-stack';

// local files
import { LocalRoute } from '../common/utils/Constants';
import TodoListScreen from '../screens/TodoListScreen';
import TodoDetailScreen from '../screens/TodoDetailScreen';
import AppColors from '../common/colors/AppColors';
import { TodoModel } from '../data/models/TodoModel';

// This defines the types of parameters each screen in the stack can receive.
// The 'todoList' screen does not expect any params.
// The 'todoDetail' screen may receive a 'todo' object or be undefined (when adding a new todo).
export type RootStackParamList = {
    [LocalRoute.todoList]: undefined;
    [LocalRoute.todoDetail]: { todo: TodoModel } | undefined;
}

// create a typed native stack navigator using the defined RootStackParamList
const Stack = createNativeStackNavigator<RootStackParamList>()

// RootNavigator is the main stack navigator for the app.
// It controls navigation between screens
export default function RootNavigator() {
    return (
        // Set the default screen to 'todoList'
        // Change header color
        // Only show back arrow without text
        <Stack.Navigator initialRouteName={LocalRoute.todoList} screenOptions={{
            headerStyle: {
                backgroundColor: AppColors.background,
            },
            headerTintColor: AppColors.text,
            headerBackButtonDisplayMode: 'minimal'
        }}>
            {/* Todo List screen configuration */}
            <Stack.Screen name={LocalRoute.todoList} component={TodoListScreen} options={{ title: "Secure Todo App" }} />

            {/* Todo Detail screen configuration */}
            <Stack.Screen
                name={LocalRoute.todoDetail}
                component={TodoDetailScreen}
                options={({ route }) => ({
                    title: route.params?.todo ? 'Update Todo' : 'Add Todo',
                })}
            />
        </Stack.Navigator>
    )
}