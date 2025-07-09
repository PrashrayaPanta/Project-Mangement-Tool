import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [projectTasks, setProjectTasks] = useState([{ title: "", status: "Todo", deadline: "" }]);


  const navigate = useNavigate()



  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...projectTasks];
    updatedTasks[index][field] = value;
    setProjectTasks(updatedTasks);
  };

  const addTask = () => {
    setProjectTasks([...projectTasks, { title: "", status: "Todo", deadline: "" }]);
  };

  const removeTask = (index) => {
    const updatedTasks = projectTasks.filter((_, i) => i !== index);
    setProjectTasks(updatedTasks);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/projects", {
        title: projectTitle,
        deadline: projectDeadline,
        tasks: projectTasks,
      });
      setProjectTitle("");
      setProjectDeadline("");
      setProjectTasks([{ title: "", status: "Todo", deadline: "" }]);
      navigate("/projects");
      
    } catch (err) {
      console.log(err.message);
    }
  };




  return (
    <form>
      <div className="space-y-12">
        {/* Project Section */}
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-md font-bold text-gray-900">Create Project</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-900"
              >
                Project Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(e) => setProjectTitle(e.target.value)}
                value={projectTitle}
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-900"
              >
                Project Deadline
              </label>
              <input
                id="deadline"
                name="deadline"
                type="date"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(e) => setProjectDeadline(e.target.value)}
                value={projectDeadline}
              />
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-md font-bold text-gray-900">Tasks</h2>
          {projectTasks.map((task, index) => (
            <div key={index} className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor={`task-title-${index}`}
                  className="block text-sm font-medium text-gray-900"
                >
                  Task Title
                </label>
                <input
                  id={`task-title-${index}`}
                  name={`task-title-${index}`}
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => handleTaskChange(index, "title", e.target.value)}
                  value={task.title}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor={`task-status-${index}`}
                  className="block text-sm font-medium text-gray-900"
                >
                  Status
                </label>
                <select
                  id={`task-status-${index}`}
                  name={`task-status-${index}`}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => handleTaskChange(index, "status", e.target.value)}
                  value={task.status}
                >
                  <option value="Todo">Todo</option>
                  <option value="Doing">Doing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor={`task-deadline-${index}`}
                  className="block text-sm font-medium text-gray-900"
                >
                  Task Deadline
                </label>
                <input
                  id={`task-deadline-${index}`}
                  name={`task-deadline-${index}`}
                  type="date"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => handleTaskChange(index, "deadline", e.target.value)}
                  value={task.deadline}
                />
              </div>
              <div className="sm:col-span-1 flex items-center">
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeTask(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </form>
  );
}
