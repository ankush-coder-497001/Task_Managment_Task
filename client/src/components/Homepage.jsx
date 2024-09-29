import { Link, useNavigate } from "react-router-dom";
import TaskCard from "./taskcard";
import CreateTask from "./cretetask";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { SiCreatereactapp } from "react-icons/si";
import { FaTasks } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";


const Home = ()=>{


  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [del,setdelete] = useState(false);
  const[Inputref,setInputref] = useState('')
  const[loginUser , setloginUser] = useState([]);



  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('UserData'))
    setloginUser(user);
    console.log(user)
    },[])


  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // If no token, redirect to login
      navigate('/login');
    } else {
      // You can also add more token validation logic here if needed
      setAuthenticated(true);
    }
  }, [navigate]);

  const handleonLogOut = ()=>{
  localStorage.clear();
 navigate('/login');
  }


  const deleteTask = async (taskId) => {
    toast.success('Task Deleted ,please reload!')
    try {
      await axios.delete(`http://localhost:5000/Task/Delete/${taskId}`);
    } catch (err) {
      console.error(err);
    }
  };

       // Fetch all tasks
       const fetchTasks = async () => {
        try {
          const response = await axios.get("http://localhost:5000/Task/All");
          const filteredData = response.data.filter(post => 
            post?.assignedUser?.name?.toLowerCase().includes(Inputref?.toLowerCase()) ||
            post?.assignedUser?.email?.toLowerCase().includes(Inputref?.toLowerCase())
          );
          setTasks(filteredData.reverse());
        } catch (err) {
          console.error(err);
        }
      };

      useEffect(()=>{
        fetchTasks();
      },[del,Inputref])
    

  

  return(
    <>
       {/* <!-- Navbar --> */}
       <nav class="bg-primary bg-sky-400 p-4 flex items-center justify-between">
        <div class="text-white text-xl font-bold ">
        {loginUser.email} </div>
        <div class="flex items-center space-x-4">
            <div class="relative in-div"  >
                <input type="text" placeholder="Search By Email or Name " class="pl-10 pr-4 py-2 rounded-full bg-white text-gray-800 my-in " onChange={e=>setInputref(e.target.value)} />
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
            </div>
            {loginUser.admin && 
            <Link class="bg-white text-primary px-10 py-2 rounded-full font-medium hover:bg-gray-100 nav-but" to={'/createTask'}>
            <SiCreatereactapp />
            Crete Task
            </Link>
}
            <Link class="bg-white text-primary px-10 py-2 rounded-full font-medium hover:bg-gray-100 nav-but" to={'/myTask'} >
            <FaTasks />
            My Tasks
            </Link>
            <button class="bg-white text-primary px-10 py-2 rounded-full font-medium hover:bg-gray-100 nav-but" onClick={handleonLogOut}>
            <IoIosLogOut />
    Logout
            </button>
          
        </div>
    </nav>

    <div class="container mx-auto p-6">
      
        {/* <!-- Task List --> */}
        <h2 class="text-2xl font-bold text-primary mb-4">All Tasks</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {
    tasks.length>0?
    tasks.map((task)=>(
      
      <TaskCard key={task._id} task={task} deleteTask={deleteTask} User = {loginUser} />
    )):<h2>Oops! No Tasks Here</h2>}

        </div>
    </div>
    </>
  )
}

export default Home;