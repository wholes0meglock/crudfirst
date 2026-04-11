import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";

function UserRegister()
{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    async function handleSubmit(e : React.FormEvent)
    {
        e.preventDefault();
        try
        {
            const response = await register(username, password);
            navigate("/dashboard");
        }
        catch(error)
        {
            console.error("Registration failed: ", error);
        }
    }
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h3 className="absolute top-10 left-100"> Register  </h3>
            <form onSubmit={handleSubmit} className="flex flex-col p-4 gap-4 justify-center border rounded-lg">
                <input
                type = "text"
                placeholder = "Username"
                value = {username}
                onChange = {(e) => setUsername(e.target.value)}
                />
                <input
                type = "password"
                placeholder="Password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                />
                <button
                    type = "submit" className="p-1 border rounded-xl hover:bg-red-500 hover:text-black transition">
                    Submit
                </button>
            </form>
        </div>
    );
}
export default UserRegister;