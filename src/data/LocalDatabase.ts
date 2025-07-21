import SQLite from 'react-native-sqlite-storage'

// local imports
import { TodoModel } from './models/TodoModel'

// enable promise based API for SQLite so we can use async/await
SQLite.enablePromise(true)

// define table and database names
const tableName = 'todos'
const databaseName = 'SecureTodoApp_v1.db'

/*
  getDBConnection(): returns a database connection to the SQLite DB.
 */
export const getDBConnection = async () => {
    return SQLite.openDatabase(
        { name: databaseName, location: 'default' },
        () => {
            // console.log('SecureApp: database connection success')
        },
        (error) => {
            console.log('SecureApp: Error connecting to database', error)
        }
    )
}

/*
  createTable(): creates the 'todos' table if it does not already exist
  Fields:
     - id: TEXT Primary key, not null
     - text: TEXT not null
     - date: TEXT not null
 */
export const createTable = async () => {
    try {
        const db = await getDBConnection()
        const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
        id TEXT PRIMARY KEY NOT NULL,
        text TEXT NOT NULL,
        date TEXT NOT NULL
    )`
        await db.executeSql(query)
        // console.log('SecureApp: createTable success')
    }
    catch (error) {
        console.log('SecureApp: createTable error', error)
    }
}

/*
  fetchTodosFromDB(): fetches all todo records from the database.
 */
export const fetchTodosFromDB = async () => {
    const db = await getDBConnection()
    const results = await db.executeSql(`SELECT * FROM ${tableName}`)
    const todos: TodoModel[] = []

    // loop over the results and extract rows into TodoModel objects
    results.forEach(result => {
        for (let i = 0; i < result.rows.length; i++) {
            const row = result.rows.item(i)
            todos.push({ id: row.id, text: row.text, date: row.date })
        }
    })

    // console.log('SecureApp: fetchTodosFromDB todos', todos)
    return todos
}

/*
  addTodoInDB(): Inserts a new todo record into the database.
 */
export const addTodoInDB = async (todo: TodoModel) => {
    try {
        const db = await getDBConnection()
        const insertQuery = `INSERT INTO ${tableName} (id, text, date) VALUES (?, ?, ?)`
        await db.executeSql(insertQuery, [todo.id, todo.text, todo.date])
    } catch (error) {
        console.log('SecureApp: addTodoInDB error', error)
    }
}

/*
  updateTodoInDB(): update an existing todo by ID.
 */
export const updateTodoInDB = async (todo: TodoModel) => {
    const db = await getDBConnection()
    const updateQuery = `UPDATE ${tableName} SET text = ?, date = ? WHERE id = ?`
    await db.executeSql(updateQuery, [todo.text, todo.date, todo.id])
}

/*
  deleteTodoFromDB(): Delete a todo entry from the database by ID.
 */
export const deleteTodoFromDB = async (id: string) => {
    const db = await getDBConnection()
    const deleteQuery = `DELETE FROM ${tableName} WHERE id = ?`
    await db.executeSql(deleteQuery, [id])
}