import React, { useState } from "react";
import { motion } from "framer-motion";
import useTodo from ".././redux/dispatch/useTodo"; // Importing custom hook for managing todos
import { IoMdAddCircle, IoIosRemove } from "react-icons/io";
import { MdOpenInFull } from "react-icons/md";
import { FaCircle, FaRegCheckCircle, FaMoon } from "react-icons/fa";
import { RiEdit2Line } from "react-icons/ri";
import { IoSunnyOutline } from "react-icons/io5";
import DeleteModal from "./deleteModel";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoList = ({
  darkMode,
  checkStatus,
  setDarkMode,
}: {
  darkMode: boolean;
  checkStatus: (todo: any) => string;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // custom hook for managing todos
  const { todoDispatch, addTodo, removeTodo, completeTodo, updateTodos } =
    useTodo();

  // Function to redirect to task details
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    newTodoTime: "",
    newTodoText: "",
  });

  // State for filter option
  const [filter, setFilter] = useState("all");

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // State for delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<null | number>(
    null
  );

  // Function to handle adding a new todo
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if both fields are filled
    if (formData.newTodoTime === "" || formData.newTodoText.trim() === "") {
      alert("Please enter both the fields");
      return;
    } else {
      // Add new task
      addTodo({
        text: formData.newTodoText,
        dueDate: formData.newTodoTime,
      });

      // clear form data
      setFormData({ newTodoText: "", newTodoTime: "" });
    }
  };

  // Function to handle removing todo
  const handleRemoveTodo = (id: number) => {
    setIsDeleteModalOpen(id);
  };

  // Function to handle editing todo
  const handleEditTodo = (id: number) => {
    setFormData({
      newTodoText:
        todoDispatch.todos.find((todo) => todo.id === id)?.text || "",
      newTodoTime:
        todoDispatch.todos.find((todo) => todo.id === id)?.dueDate || "",
    });

    removeTodo(id); // Remove original todo after editing
  };

  // Function to handle completing todo
  const handleCompleteTodo = (id: number) => {
    completeTodo(id);
  };

  const handleDragEnd = (result: {
    destination?: { index: number } | null;
    source: { index: number };
  }) => {
    if (!result.destination) {
      return; // Exit if dropped outside the list
    }
    const items = Array.from(todoDispatch.todos); // Clone the array
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateTodos(items); // Update Redux store
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Function to filter todos based on selected filter
  const filteredTodos = todoDispatch.todos.filter((todo) => {
    if (filter === "completed") return todo.complete;
    if (filter === "pending") return !todo.complete;
    if (filter === "overdue")
      return (
        todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.complete
      );
    return true; // "all" case
  });

  // Function to handle search
  const searchedTodos = filteredTodos.filter((todo) =>
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen flex flex-col justify-start md:justify-center items-center ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-b from-pink-500 to-rose-500 text-gray-800"
      }`}>
      {/* Header */}
      <div className="flex items-center justify-center mt-10 gap-3">
        <h1 className="text-4xl font-bold uppercase">Task Manager</h1>
        <motion.button
          onClick={toggleDarkMode}
          animate={{ rotate: darkMode ? 180 : 0 }}>
          {darkMode ? (
            <IoSunnyOutline className="text-2xl text-yellow-500" />
          ) : (
            <FaMoon className="text-2xl text-gray-950" />
          )}
        </motion.button>
      </div>

      {/* Todo input */}

      <div className="w-full md:w-2/3 mt-8 p-3">
        {/* Filters and Search */}
        <div className="flex lg:flex-row flex-col justify-between mt-5 gap-3">
          {/* Filter Options */}
          <div className="flex gap-2 md:text-nowrap text-xs sm:text-base">
            {["all", "completed", "pending", "overdue"].map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-3 py-1 rounded-md font-semibold ${
                  filter === option
                    ? darkMode
                      ? "bg-blue-600 text-white"
                      : "bg-pink-600 text-white"
                    : darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-300 text-gray-700"
                }`}>
                {option.charAt(0).toUpperCase() + option.slice(1)} Tasks
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search tasks"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`p-4 rounded-md outline-none lg:w-1/2 w-full ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          />
        </div>

        <div
          className={`rounded-md shadow-lg p-4 mt-8 ${
            darkMode ? "bg-gray-800" : "bg-white"
          } w-full`}>
          <form onSubmit={handleAddTodo} className="flex items-center">
            <motion.button type="submit" animate={{ rotate: 360 }}>
              <IoMdAddCircle
                className={`text-3xl ${
                  darkMode ? "text-blue-300" : "text-pink-500"
                }`}
              />
            </motion.button>
            <input
              type="text"
              placeholder="Add new todo"
              value={formData.newTodoText}
              onChange={(e) =>
                setFormData({ ...formData, newTodoText: e.target.value })
              }
              className={`p-2 m-3 outline-none flex-grow ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
            />
            <label htmlFor="dueDate">Due Date:</label>
            <input
              type="date"
              value={formData.newTodoTime}
              onChange={(e) =>
                setFormData({ ...formData, newTodoTime: e.target.value })
              }
              className={`p-2 m-3 outline-none ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
            />
          </form>
        </div>

        {/* Todo List */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                className="mt-8 w-full"
                {...provided.droppableProps}
                ref={provided.innerRef}
                // style={getListStyle(snapshot.isDraggingOver)}
              >
                {searchedTodos.map((todo, index) => (
                  <Draggable
                    key={todo.id}
                    draggableId={todo.createdAt}
                    index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div
                          className={`flex relative items-center justify-between gap-3 pt-8 rounded-md shadow-md p-4 mb-4 ${
                            todo.complete ? "line-through" : ""
                          } ${
                            darkMode
                              ? "bg-gray-800 text-white"
                              : "bg-white text-gray-800"
                          }`}>
                          <div
                            className={`${
                              checkStatus(todo) === "Overdue"
                                ? " bg-red-500"
                                : checkStatus(todo) === "Pending"
                                ? "text-black bg-blue-500"
                                : checkStatus(todo) === "Due Today"
                                ? " bg-yellow-500"
                                : checkStatus(todo) === "Upcoming"
                                ? " bg-purple-500"
                                : " bg-green-500"
                            } absolute -top-2 -left-2 p-2 rounded-md`}>
                            <p className="text-sm">{checkStatus(todo)}</p>
                          </div>
                          <button onClick={() => handleCompleteTodo(todo.id)}>
                            {todo.complete ? (
                              <FaRegCheckCircle className="text-green-500 text-2xl" />
                            ) : (
                              <FaCircle className="text-pink-500 text-2xl" />
                            )}
                          </button>
                          <p className="flex-grow px-2">{todo.text}</p>
                          <div className="flex items-center">
                            <button
                              onClick={() => navigate(`/tasks/${todo.id}`)}>
                              <MdOpenInFull className="text-blue-500 text-2xl" />
                            </button>
                            <button onClick={() => handleEditTodo(todo.id)}>
                              <RiEdit2Line className="text-blue-500 text-2xl" />
                            </button>
                            <motion.button
                              onClick={() => handleRemoveTodo(todo.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}>
                              <IoIosRemove className="text-red-500 text-2xl" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <DeleteModal
        key={isDeleteModalOpen}
        show={isDeleteModalOpen !== null}
        handleClose={() => setIsDeleteModalOpen(null)}
        handleDelete={() => {
          if (isDeleteModalOpen !== null) {
            removeTodo(isDeleteModalOpen);
            setIsDeleteModalOpen(null);
          }
        }}
      />
    </div>
  );
};

export default TodoList;
