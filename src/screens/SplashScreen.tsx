import { useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

// local imports 
import { getDBConnection, createTable } from '../data/LocalDatabase'
import { useAppDispatch } from "../redux/store"
import { fetchTodos } from "../redux/slices/todoSlice"
import AppColors from "../common/colors/AppColors"

type props = {
    children: React.ReactNode
}

/*
SplashScreen is a startup screen responsible for:
  - Initializing SQLite Database
  - Creating todos table if not exists
  - Fetching todos from DB into Redux store
  
While initialization is in progress, it shows a loading spinner.
 */
const SplashScreen = ({ children }: props) => {
    // redux dispatch function
    const dispatch = useAppDispatch()

    // loading state
    const [loading, setLoading] = useState(true)

    /*
      initialize app:
        - setup local SQLite Database
        - dispatch redux action to load todos
    */
    useEffect(() => {
        const initialize = async () => {
            try {
                await getDBConnection()
                await createTable()
                await dispatch(fetchTodos())
            } catch (error) {
                console.error('SplashScreen: initialize error', error)
            } finally {
                setLoading(false)
            }
        }
        initialize();
    }, [dispatch])

    // while loading is true, show a spinner
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    // once ready, render the child components
    return <>{children}</>
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.background
    },
});

export default SplashScreen