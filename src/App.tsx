import TodoList from "./components/todoList";
import Home from "./components/home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TaskDetails from "./components/taskDetails";
import { useState } from "react";

function App() {
  // State for dark mode
  const [darkMode, setDarkMode] = useState(true);

  const checkStatus = (todo: any) => {
    if (todo.complete) return "Completed";
    if (
      todo.dueDate &&
      new Date(todo.dueDate).setHours(0, 0, 0, 0) ==
        new Date().setHours(0, 0, 0, 0)
    )
      return "Due Today";
    if (todo.dueDate && new Date(todo.dueDate) < new Date()) return "Overdue";
    if (todo.dueDate && new Date(todo.dueDate) > new Date()) return "Upcoming";
    return "Pending";
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/tasks"
          element={
            <TodoList
              darkMode={darkMode}
              checkStatus={checkStatus}
              setDarkMode={setDarkMode}
            />
          }
        />
        <Route
          path="/tasks/:id"
          element={
            <TaskDetails checkStatus={checkStatus} darkMode={darkMode} />
          }
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
