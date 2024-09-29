import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const CreateTask = ()=>{

    const [createTask,SetcreateTask] = useState({});
const[error,seterror] = useState({});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("Pending");
    const [assignedEmail, setAssignedEmail] = useState("");
    const [priority, setPriority] = useState("Medium");
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const taskData = { title, description, dueDate, status, assignedEmail, priority };
      SetcreateTask(taskData);
      // Optionally clear the form after task creation
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("Pending");
      setAssignedEmail("");
      setPriority("Medium");
    };
  


     // Create a new task
  const HandleOnCreate = async (taskData) => {
    try {
      const response = await axios.post("http://localhost:5000/Task/Create", taskData);
      navigate('/')
      toast.success('Task added!')
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(()=>{
     HandleOnCreate(createTask);
  },[handleSubmit])





  


  return(
    <>
      {/* <!-- Task Creation Form --> */}
      <div class="bg-sky-50 rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-2xl font-bold text-primary mb-4">Create New Task</h2>
            <form>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input type="text" id="title" name="title"  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                         value={title}
                         onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea id="description" name="description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary" 
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <label for="dueDate" class="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                        <input type="date" id="dueDate" name="dueDate" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select id="status" name="status" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                         value={status} onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div>
                        <label for="assignedUser" class="block text-sm font-medium text-gray-700 mb-1">Assigned User</label>
                        <input type="text" id="assignedUser" name="assignedUser" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                           value={assignedEmail}
                           onChange={(e) => setAssignedEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label for="priority" class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <select id="priority" name="priority" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                         value={priority} onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>
                <div class="mt-6">
                    <button type="submit" class="px-4 py-2 bg-sky-400 text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    onClick={handleSubmit}
                    >
                        Add Task
                    </button>
                </div>
            </form>
        </div>
    </>
  )
}

export default CreateTask;