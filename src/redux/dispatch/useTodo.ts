'use client';

// Importing custom hook for managing todos
import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';

// Importing todo reducer
import { Todo } from '../todoReducer';

const useTodo = () => {

    // Destructuring todo state and dispatch from redux store
    const todoDispatch = useSelector((state: RootState) => state.todos);

    // Destructuring dispatch function from redux store
    const dispatch = useDispatch<AppDispatch>();


    // Function to add new todo
    const addTodo = ({
        text,   
        dueDate,

    }:{
        text: string;
        dueDate: string;
    }) => {
        dispatch(Todo.addTodo({
            id: Date.now(),
            createdAt: new Date().toISOString(),
            text,
            dueDate
        }));
    };

    // Function to remove todo
    const removeTodo = (id: number) => {
        dispatch(Todo.removeTodo(id));
    };


    // Function to complete todo
    const completeTodo = (id: number) => {
        dispatch(Todo.completeTodo(id));
    }

    const updateTodos = (todos: any) => {
        dispatch(Todo.updateAllTodos(todos));
    }

    return {
        todoDispatch,
        addTodo,
        removeTodo,
        completeTodo,
        updateTodos
    };
}

export default useTodo;
