import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// local
import FloatingButton from "./components/FloatingButton";
import { RootStackParamList } from "../navigation/RootNavigator";
import { LocalRoute } from "../common/utils/Constants";
import NoTodosView from "./components/NoTodosView";
import { useAppSelector } from "../redux/store";
import SingleTodoView from "./components/SingleTodoView";
import { TodoModel } from "../data/models/TodoModel";
import AppColors from "../common/colors/AppColors";

// navigation type
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/*
    TodoListScreen: Fetch todos from database and display in list
*/
const TodoListScreen = () => {
    // fetch list of todos from Redux store
    const todos = useAppSelector(state => state.todos.todos)

    // navigation object typed with NavigationProp for type safety
    const navigation = useNavigation<NavigationProp>();

    // If there are no todos, show a placeholder view
    if (todos.length == 0) {
        return (
            <View style={styles.container}>
                 {/* Custom view that shows "No Todos" message and a button to add new */}
                <NoTodosView onPress={() => { navigation.navigate(LocalRoute.todoDetail) }} />
            </View>
        )
    }

    // navigate to detail screen when a todo is tapped, passing the todo object as a parameter
    const handleTodoTap = (todo: TodoModel) => {
        navigation.navigate(LocalRoute.todoDetail, { todo: todo })
    }

    return (
        <View style={styles.container}>
            {/* FlatList renders list of todos */}
            <FlatList
                data={todos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <SingleTodoView todo={item} key={item.id} onTap={handleTodoTap} />}
                contentContainerStyle={styles.container}
            />
            {/* Floating button to add a new todo */}
            <FloatingButton onPress={() => { navigation.navigate(LocalRoute.todoDetail) }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: AppColors.background
    }
})

export default TodoListScreen;