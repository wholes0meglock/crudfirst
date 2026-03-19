const API_URL = "http://localhost:3000";

type SessionData = {
    subject: string
    duration: number
}

export async function login(username : string, password : string)
{
    const response = await fetch(`${API_URL}/auth/login`,
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        }
    );
    return response.json();
}
export async function register(username : string, password : string)
{
    const response = await fetch(`${API_URL}/auth/register`,
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        }
    );
    return response.json();
}

export async function getSessions()
{
    // const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/sessions`,
        {
            method: "GET",
            headers:
            {
                "Content-Type": "application/json"
            },
            credentials : "include"        
        }
    );
    return response.json();
}
export async function getSessionByID(id : string)
{
    const response = await fetch(`${API_URL}/sessions/${id}`,
        {
            method: "GET",
            headers:
            {
                "Content-Type": "application/json"
            },
            credentials : "include"
        }
    )
    return response.json();
}
export async function createSession(data: SessionData)
{
    // const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/sessions`,
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            credentials : "include",
            body : JSON.stringify(data)
        }
    );
    return response.json();
}
export async function updateSession(id : string, data : SessionData)
{
    // const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/sessions/${id}`,
        {
            method: "PUT",
            headers:
            {
                "Content-Type": "application/json"
            },
            credentials : "include",
            body : JSON.stringify(data)
        }
    );
    return response.json();
}

export async function deleteSession(id : string)
{
    // const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/sessions/${id}`,
        {
            method: "DELETE",
            credentials : "include"
        }
    );
    return response.json();
}

