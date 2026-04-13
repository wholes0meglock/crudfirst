const API_URL = "http://localhost:3000";

type SessionData = {
    subject: string
    duration: number
}
export async function getCurrentUser()
{
    const response = await fetch(`${API_URL}/auth/me`,
        {
            method:"GET",
            credentials:"include"
        }
    );
    if(!response.ok)
    {
        throw new Error("Not Authenticated");
    }
    return response.json();
}
export async function logout() {
    await fetch("/auth/logout", {
        method: "POST",
        credentials: "include"
    });
}
export async function login(username : string, password : string)
{
    const response = await fetch(`${API_URL}/auth/login`,
        {
            method: "POST",
            credentials:"include",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        }
    );
    const data = await response.json();
    return {response,data};
}
export async function register(username : string, password : string)
{
    const response = await fetch(`${API_URL}/auth/register`,
        {
            method: "POST",
            credentials:"include",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        }
    );
    const data = await response.json();
    return{ response, data };
}

export async function getSessions()
{
    // const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/sessions`,
        {
            method: "GET",
            credentials : "include"        
        }
    );
    if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch sessions");
  }

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

