import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebaseConfig";
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineUser, AiOutlineLock, AiOutlineArrowRight } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("User created successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <form className="flex flex-col w-full max-w-sm mt-4 gap-4 p-4 bg-gray-100 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-center mb-4">Register</h1>
        <div className="flex items-center border-2 border-gray-300 rounded-md p-2 transition duration-300 hover:border-blue-500">
          <AiOutlineUser className="text-lg text-gray-500 mr-2" />
          <input
            type="email"
            className="flex-1 outline-none bg-transparent"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center border-2 border-gray-300 rounded-md p-2 transition duration-300 hover:border-blue-500">
          <AiOutlineLock className="text-lg text-gray-500 mr-2" />
          <input
            type="password"
            className="flex-1 outline-none bg-transparent"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center bg-blue-500 text-white p-3 rounded-md mt-4 hover:bg-blue-600 transition duration-300"
        >
          {loading ? <Loader /> : <><span>Sign Up</span> <AiOutlineArrowRight className="text-lg ml-2" /></>}
        </button>
        <p className="text-center text-gray-600 mt-2">
          Already have an account? <Link to="/signin" className="text-blue-500 hover:underline">Login now</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
