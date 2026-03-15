import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
function userLogin()
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    async function handleSubmit(e:)
    {
        e.preventDefault();
        try
        {
            const data = await login(username,password);


        }

    }
}