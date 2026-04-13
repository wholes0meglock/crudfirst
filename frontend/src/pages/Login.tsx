import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

function UserLogin()
{
    const [username, setUsername] = useState("");
    const [error,setError] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    async function handleSubmit(e : React.FormEvent)
    {
        e.preventDefault();
        try
        {
            const {response, data} = await login(username,password);
            if(!response.ok)
            {
                setError(data.message);
                return;
            }
            setError("");
            navigate("/dashboard");
        }
        catch(error)
        {
            console.error("Login failed ", error);
            setError("Something went wrong");
        }

    }
    return (
        <div className="min-h-screen flex justify-center flex-col items-center">
            <h3 className="absolute top-10 left-100">Login</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 border p-4 rounded-lg">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="p-1 border rounded-xl hover:bg-yellow-500 hover:text-black transition">Submit</button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
}

export default UserLogin;