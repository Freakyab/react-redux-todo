import useTodo from "../redux/dispatch/useTodo";
import { useParams } from "react-router-dom";
function TaskDetails({
  darkMode,
  checkStatus,
}: {
  darkMode: boolean;
  checkStatus: (todo: any) => string;
}) {
  const { id } = useParams();
  const { todoDispatch } = useTodo();
  const task = todoDispatch.todos.find((task) => task.id === Number(id));

  return (
    <div
      className={`min-h-screen flex flex-col justify-start md:justify-center items-center ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-b from-pink-500 to-rose-500 text-gray-800"
      }`}>
      <h2 className="text-2xl font-bold mb-4">Task Details</h2>
      {task ? (
        <div className=" border-white border-2 shadow-md rounded-lg p-6 capitalize">
          <p className="mb-2">
            <strong>ID:</strong> {task.id}
          </p>
          {/* status */}
          <p className="mb-2">
            <strong>Status:</strong> {checkStatus(task)}
          </p>
          <p className="mb-2">
            <strong>Task:</strong> {task.text}
          </p>
          <p className="mb-2">
            <strong>Description:</strong> {task.desc}
          </p>
          <p className="mb-2">
            <strong>Due Time:</strong> {task.dueDate}
          </p>
        </div>
      ) : (
        <p className="text-red-500">Task not found</p>
      )}
    </div>
  );
}

export default TaskDetails;
