
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SignupImage from '../../assets/signup.jpg';
import { empty } from "../../utils/empty";
import axiosInstance from "../../API";

function Signup() {

    const [username, setusername] = useState('');
    // const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setconfirm_password] = useState('');
    const [isFarmer, setIsFarmer] = useState(false);
    const [isBuyer, setIsBuyer] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if(empty(username) || empty(email) || empty(password) || empty(confirm_password)) {
            setError('Fields cannot be empty');
            return;
        }

        if (password !== confirm_password ) {
            setError('Passwords do not match');
            return;
        }
        setError(null);
        setSuccess(null);

        try {
            const response = await axiosInstance.post('/register/', {
                username,
                email,
                password,
                confirm_password,
                is_farmer: isFarmer,
                is_buyer: isBuyer
            });
            setSuccess('Signup successful!');
            navigate('/login')
        } catch (err) {
            setError(err.response?.data?.detail || 'An error occurred during signup');
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg">
                    
                    <div className="hidden lg:flex flex-1">
                        <img 
                            src={SignupImage} 
                            alt="ShambaFusion illustration" 
                            className="w-full h-full object-cover rounded-l-lg" 
                        />
                    </div>
                    {/* Form Section */}
                    <div className="flex-1 p-8">
                        <h2 className="text-3xl font-bold text-center mb-6">Welcome ;) </h2>
                        <form action="" method="" className="space-y-4">
                            <div>
                                <input 
                                    type="text" 
                                    name="username" 
                                    label="Full Name"
                                    placeholder="Full Name" 
                                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                    required 
                                    value={username}
                                    onChange={e => setusername(e.target.value)}
                                />
                            </div>
                            {/* <div>
                                <input 
                                    type="tel" 
                                    name="phoneNumber" 
                                    placeholder="PhoneNumber" 
                                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                    required
                                    value={phoneNumber}
                                    onChange={e => setPhoneNumber(e.target.value)}
                                />
                            </div> */}
                            <div>
                                <input 
                                    type="email" 
                                    name="email" 
                                    label="Email"
                                    placeholder="Email address..." 
                                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                    required 
                                    value={email}
                                    onChange={e => setemail(e.target.value)}
                                />
                            </div>
                            <div>
                                <input 
                                    type="password" 
                                    name="password" 
                                    label="Password"
                                    placeholder="Password..." 
                                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                    required 
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <input 
                                    type="password" 
                                    name="confirm_password" 
                                    label="Confirm Password"
                                    placeholder="Confirm Password..." 
                                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                    required 
                                    value={confirm_password}
                                    onChange={e => setconfirm_password(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={isFarmer}
                                        onChange={() => setIsFarmer((prev) => !prev)}
                                    />
                                    Is Farmer
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={isBuyer}
                                        onChange={() => setIsBuyer((prev) => !prev)}
                                    />
                                    Is Buyer
                                </label>
                            </div>
                            <div>
                                <button 
                                    type="submit" 
                                    className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-300"
                                    onClick={handleSignup}
                                >
                                    Sign Up
                                </button>
                            </div>
                            
                            <div className="text-center">
                                <span>Already have an account? </span>
                                <Link to="/login" className="text-indigo-600 hover:underline">
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>    
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
            </div>   
        </>  
    ); 
}


export default Signup;