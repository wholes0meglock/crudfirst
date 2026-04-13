import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";

function UserRegister()
{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    async function handleSubmit(e : React.FormEvent)
    {
        e.preventDefault();
        try
        {
            const {response,data} = await register(username, password);
            // const data = await response.json();
            if(!response.ok)
            {
                setError(data.message);
                return;
            }
            setError("");
            navigate("/login");
        }
        catch(error)
        {
            console.error("Registration failed: ", error);
            setError("Something went wrong");
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
                {error && (
                <p className="text-red-500">{error}</p>
                )}
            </form>
        </div>
    );
}
export default UserRegister;