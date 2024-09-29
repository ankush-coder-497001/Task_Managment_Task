import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Login = ()=>{

    const[admin,setadmin] = useState(false)
console.log(admin)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        admin:''
      });
    
      const navigate = useNavigate();
    
      const { email, password } = formData;
    
      // Handle input change
      const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      // Handle form submission
      const onSubmit = async e => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/User/login', formData);
    
          // Save the JWT token to local storage
          localStorage.setItem('token', response.data.token);
          formData.admin = admin==='on'?true:false;
          localStorage.setItem('UserData', JSON.stringify(formData));
          toast.success('Logged In')
          // Redirect to homepage
          navigate('/');
        } catch (err) {
            toast.error('Somthing Went Wrong!')
          console.error(err);
        }
      };

  return(
    <>
    <div className="min-h-screen bg-sky-200 flex items-center justify-center">

    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-sky-400">TaskMaster</h1>
            <p class="text-gray-600 mt-2">Log in to manage your tasks</p>
        </div>
        <form>
            <div class="mb-6">
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" id="email" name="email" required
                value={email}
                onChange={onChange}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="you@example.com"/>
            </div>
            <div class="mb-6">
                <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input type="password" id="password" name="password" required
                value={password}
                onChange={onChange}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="••••••••"/>
            </div>
            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center">
                    <input type="checkbox" id="remember" name="remember" onChange={e=>setadmin(e.target.value)}
                        class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"/>
                    <label for="remember" class="ml-2 block text-sm text-gray-700">As Admin</label>
                </div>
                <a href="#" class="text-sm text-sky-400 hover:underline">Forgot password?</a>
            </div>
            <button type="submit"
            onClick={onSubmit}
                class="w-full bg-sky-400 text-white py-2 px-4 rounded-md hover:bg-sky-400-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400">
                Log In
            </button>
        </form>
        <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
                Don't have an account? 
                <Link to={'/register'} class="text-sky-400 hover:underline">Sign up</Link>
            </p>
        </div>
    </div>
    </div>

    </>
  )
}

export default Login;