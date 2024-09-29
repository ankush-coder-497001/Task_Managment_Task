import { useEffect, useState } from "react";
import TaskCard from "./taskcard";
import axios from "axios";
import { Link } from "react-router-dom";

const Mytask = ()=>{

const[Alluser ,setAllUser] = useState([]);
const[AllTask , setAlltask] = useState([]);
const[loginUser , setloginUser] = useState([]);
const [filteredTasks, setFilteredTasks] = useState([]);
const [filters, setFilters] = useState({
  name: '',
  status: '',
  priority: ''
});

useEffect(()=>{
const user = JSON.parse(localStorage.getItem('UserData'))
setloginUser(user);
console.log(user)
},[])

useEffect(()=>{
const allUser = ()=>{
    axios.get('http://localhost:5000/User/users').then((res)=>{
        setAllUser(res.data);
        console.log(res.data)
    })
}
allUser();
},[])


useEffect(()=>{
const alltask = ()=>{
    axios.get('http://localhost:5000/Task/All').then((res)=>{
        const filteredTask = res.data.filter((data)=>data.assignedUser.email==loginUser.email);
        setAlltask(filteredTask);
        console.log(res.data)
        console.log(filteredTask)
    })
}
alltask();
},[loginUser])




 // Filter tasks whenever filters change
 useEffect(() => {
    const filteredData = AllTask.filter(task => {
      return (
        (filters.name === '' || task.title.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.status === '' || task.status === filters.status) &&
        (filters.priority === '' || task.priority === filters.priority)
      );
    });
    setFilteredTasks(filteredData);
  }, [filters, AllTask]);


  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return(
    <>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex-shrink-0">
                    <h1 class="text-xl font-bold">{loginUser.email}</h1>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input type="text" placeholder="Search tasks..." class="pl-10 pr-4 py-2 w-64 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="name"
                        value={filters.name}
                        onChange={e=>handleInputChange(e)}
                        />
                    </div>
                    <select class="w-[180px] border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="status" value={filters.status} onChange={handleInputChange}
                    >
                        <option value="">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <select class="w-[180px] border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="priority" value={filters.priority} onChange={handleInputChange}
                    >
                        <option value="">All Priorities</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <Link class="bg-white text-primary px-10 py-2 rounded-full font-medium hover:bg-gray-100" to={'/'} >
                Home
            </Link>
                </div>
            </div>
        </div>
    </nav>
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
            <h2 class="text-2xl font-semibold mb-4">Tasks</h2>
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
          <TaskCard key={task._id} User={loginUser} task={task} />
          ))
        ) : (
          <p>No tasks found</p>
        )}
            </div>
        </div>
    </main>
    </div>

    </>
  )
}

export default Mytask;