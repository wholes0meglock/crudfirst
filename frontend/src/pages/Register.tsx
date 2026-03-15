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
        <div>
            <h2> Register </h2>
            <form onSubmit={handleSubmit}>
                <input
                type = "text"
                placeholder = "Username"
                value = {username}
                onChange = {(e) => setUsername(e.target.value)}
                />
                <input
                type = "text"
                placeholder="Password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                />
                <button
                    type = "submit">
                    Register
                </button>
            </form>
        </div>
    );
}
export default UserRegister;