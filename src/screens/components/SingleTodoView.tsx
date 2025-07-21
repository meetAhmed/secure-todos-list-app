import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'

// local imports
import { TodoModel } from "../../data/models/TodoModel"
import AppColors from "../../common/colors/AppColors"

// properties for the component
type props = {
    todo: TodoModel, // todo item to display
    onTap: (todo: TodoModel) => void // callback when user taps on the item
}

const SingleTodoView = ({ todo, onTap }: props) => (
    <View style={styles.container}>
        {/* text and date */}
        <View style={styles.content}>
            <Text style={styles.text}>{todo.text}</Text>
            <Text style={styles.date}>{todo.date}</Text>
        </View>
        {/* button to trigger detail view or edit */}
        <View>
            <TouchableOpacity onPress={() => onTap(todo)} style={styles.iconButton}>
                <Icon name="chevron-right" size={14} color={AppColors.text} />
            </TouchableOpacity>
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.card,
        marginBottom: 10,
        padding: 5,
        borderRadius: 6,
        flexDirection: 'row'
    },
    content: {
        flex: 1,
    },
    text: {
        fontSize: 18,
        color: AppColors.text,
    },
    date: {
        fontSize: 12,
        color: AppColors.textSecondary,
        marginTop: 10
    },
    iconButton: {
        marginLeft: 12,
        backgroundColor: AppColors.background,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
    }
})

export default SingleTodoView