import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
function userLogin()
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    async function handleSubmit(e : React.FormEvent)
    {
        e.preventDefault();
        try
        {
            const data = await login(username,password);
            navigate("/dashboard");
        }
        catch(error)
        {
            console.error("Login failed ", error);
        }

    }
    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
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

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default userLogin;