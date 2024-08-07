import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import { AiOutlineUser, AiOutlineLock, AiOutlineArrowRight } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

/**
 * Sign-in component for user authentication.
 * Handles user sign-in with Firebase authentication.
 */
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Effect hook to check if user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Redirect user to dashboard if already signed in
        navigate("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Handle form submission for signing in
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and password
    if (!email || !password) return;

    setLoading(true);
    try {
      // Sign in user with email and password using Firebase
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Signed In Successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <form className="flex flex-col w-full max-w-sm mt-20 gap-4 p-4 bg-gray-100 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-center mb-4">Sign In</h1>
        {/* Email input field */}
        <div className="flex items-center border-2 border-gray-300 rounded-md p-2 transition duration-300 hover:border-blue-500">
          <AiOutlineUser className="text-lg text-gray-500 mr-2" />
          <input
            type="email"
            className="flex-1 outline-none bg-transparent"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='email'
          />
        </div>
        {/* Password input field */}
        <div className="flex items-center border-2 border-gray-300 rounded-md p-2 transition duration-300 hover:border-blue-500">
          <AiOutlineLock className="text-lg text-gray-500 mr-2" />
          <input
            type="password"
            className="flex-1 outline-none bg-transparent"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='current-password'
          />
        </div>
        {/* Sign In button */}
        <button
          type="submit"
          className="flex items-center justify-center bg-blue-500 text-white p-3 rounded-md mt-4 hover:bg-blue-600 transition duration-300"
        >
          {loading ? <Loader /> : <><span>Sign In</span> <AiOutlineArrowRight className="text-lg ml-2" /></>}
        </button>
        {/* Link to sign up */}
        <p className="text-center text-gray-600 mt-2">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Register now</Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
