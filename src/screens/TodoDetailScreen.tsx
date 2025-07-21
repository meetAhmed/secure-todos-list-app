import {
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from "react-native"
import { useState } from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

// local imports
import AppColors from "../common/colors/AppColors"
import { addTodo, deleteTodo, updateTodo } from "../redux/slices/todoSlice"
import DateFormatter from "../common/utils/DateFormatter"
import { LocalRoute } from "../common/utils/Constants";
import PrimaryButton from "./components/PrimaryButton"
import { RootStackParamList } from "../navigation/RootNavigator";
import { useAppDispatch, useAppSelector } from "../redux/store"
import { authenticate } from "../common/utils/AuthUtils";
import { setAuthState } from "../redux/slices/authSlice";

// Type safe access to navigation route params
// make sure that 'route.params.todo' matches the structure defined in our navigation types
type TodoDetailRouteProp = RouteProp<RootStackParamList, typeof LocalRoute.todoDetail>;

/*
    TodoDetailScreen: Display existing todo or allow user to add new todo
*/
const TodoDetailScreen = () => {
    // current route
    const route = useRoute<TodoDetailRouteProp>()

    // extract the todo object passed through navigation (it can be undefined for new todo)
    const todo = route.params?.todo

    // retrieve the authentication state from the redux store
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

    // local state for the text input
    const [todoText, setTodoText] = useState(todo?.text || '')

    // redux dispatch function to trigger actions like add/update/delete todo
    const dispatch = useAppDispatch()

    // access navigation object to allow navigating back to previous screen
    const navigation = useNavigation()

    /*
      Ensure that user is authenticated before allowing secure operations.
         - If the user is already authenticated, return true
         - Otherwise, call authenticate() function
         - If authentication fails, show alert and return false
         - If successful, update the redux store
     */
    const checkAuthState = async (): Promise<boolean> => {
        if (!isAuthenticated) {
            const success = await authenticate();
            if (!success) {
                Alert.alert("Authentication Failed", "Please use correct credentials or try again.");
                return false;
            }
            dispatch(setAuthState(true));
        }
        return true;
    };
    
    /*
      Handle adding a new todo or updating an existing one
         - Trim and validate input
         - Check if user is authenticated
         - Check if todo is present then update else create new todo
         - If editing: dispatches updateTodo with updated text and current date
         - If creating: dispatches addTodo with a new ID and current date
         - Clear text input and navigate back
     */
    const handleAddOrUpdateTodoTap = async () => {
        // revent empty todo from being saved
        if (todoText.trim().length === 0) {
            return
        }

        const isAuthenticated = await checkAuthState()
        if (!isAuthenticated) return;

        if (todo) {
            // update existing todo
            dispatch(updateTodo({
                id: todo.id,
                text: todoText.trim(),
                date: DateFormatter.formatDate(new Date())
            }))
        } else {
            // add new todo
            dispatch(addTodo({
                id: Date.now().toString(),
                text: todoText.trim(),
                date: DateFormatter.formatDate(new Date())
            }))
        }

        // reset input field
        setTodoText('')

        // go back to home
        navigation.goBack()
    }

    /*
      Handle deletion of the current todo after confirming user authentication.
         - Displays a confirmation dialog
         - If confirmed and todo exists, dispatch deleteTodo action.
         - Navigates back after deletion.
     */
    const handleDeleteBtnTap = async () => {
        const isAuthenticated = await checkAuthState()
        if (!isAuthenticated) return;

        Alert.alert(
            'Delete',
            'Are you sure you want to delete this todo?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        if (todo) {
                            dispatch(deleteTodo(todo.id))
                        }
                        navigation.goBack()
                    }
                }
            ]
        )
    }

    return (
        <View style={styles.container}>
            {/* Make sure UI adjusts properly when the keyboard appears */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20}
            >
                {/* dismiss keyboard when the user taps anywhere outside the TextInput */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>

                        {/* top portion of the screen */}
                        <View style={{ flex: 1 }}>
                            <Text style={styles.label}>What's on your mind?</Text>
                            <TextInput
                                placeholder="Type..."
                                placeholderTextColor={AppColors.textSecondary}
                                multiline
                                onChangeText={setTodoText}
                                value={todoText}
                                style={styles.input}
                            />
                        </View>

                        {/* bottom portion of the screen with action buttons */}
                        <View style={styles.buttonContainer}>
                            <PrimaryButton title={todo ? 'Update todo' : 'Add todo'} buttonStyle={{ width: '100%' }} onPress={handleAddOrUpdateTodoTap} />
                            {
                                todo && <PrimaryButton title='Delete' buttonStyle={{ width: '100%', marginTop: 10, backgroundColor: 'red' }} onPress={handleDeleteBtnTap} />
                            }
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20
    },
    label: {
        marginBottom: 6,
        fontSize: 16,
        fontWeight: '600',
        color: AppColors.text
    },
    input: {
        minHeight: 45,
        backgroundColor: AppColors.inputFieldBackground,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: AppColors.inputFieldText,
        marginTop: 2,
        paddingTop: 10
    },
    buttonContainer: {
        padding: 20
    },
})

export default TodoDetailScreen;
