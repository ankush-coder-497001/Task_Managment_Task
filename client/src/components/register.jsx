import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios  from "axios";
import toast from "react-hot-toast";

const Register = ()=>{


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
      });
      
      const navigate = useNavigate();
    
      const { name, email, password } = formData;
    
      // Handle input change
      const onChange =(e)=> {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      // Handle form submission
      const onSubmit = async e => {
        e.preventDefault();
        
        try {
          const response = await axios.post('http://localhost:5000/User/register', formData);
          
          // Save the JWT token to local storage
          localStorage.setItem('token', response.data.token);
         toast.success('Registed!')
          // Redirect to homepage
          navigate('/login');
        } catch (err) {
          console.error(err);
        }
      };
    


  return(
    <>
    <div class="min-h-screen bg-sky-200 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-sky-400">TaskMaster</h1>
            <p class="text-gray-600 mt-2">Create your account</p>
        </div>
        <form>
            <div class="mb-6">
                <label for="fullname" class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" id="fullname" name="name" required
                value={name}
                onChange={onChange}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sky-400 focus:border-sky-400"
                    placeholder="Enter Name.."/>
            </div>
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
                onChange={e =>onChange(e)}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sky-400 focus:border-sky-400"
                    placeholder="••••••••"/>
            </div>
            <div class="mb-6">
                <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input type="password" id="confirm-password" name="confirm-password" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sky-400 focus:border-sky-400"
                    placeholder="••••••••"/>
            </div>
            <div class="flex items-center mb-6">
                <input type="checkbox" id="terms" name="terms" required
                    class="h-4 w-4 text-sky-400 focus:ring-sky-400 border-gray-300 rounded"/>
                <label for="terms" class="ml-2 block text-sm text-gray-700">
                    I agree to the <a href="#" class="text-sky-400 hover:underline">Terms and Conditions</a>
                </label>
            </div>
            <button type="submit"
            onClick={onSubmit}
                class="w-full bg-sky-400 text-white py-2 px-4 rounded-md hover:bg-sky-400-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400">
                Create Account
            </button>
        </form>
        <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
                Already have an account? 
                <Link to={'/login'} class="text-sky-400 hover:underline">Log in</Link>
            </p>
        </div>
    </div>
</div>

  </>
  )
}

export default Register