const API_URL = "http://localhost:3000";

export async function login(username : string, password : string)
{
    const response = fetch(`${API_URL}/auth/login`,
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        }
    );
    return (await response).json();
}
export async function register(username : string, password : string)
{
    const response = fetch(`${API_URL}/auth/register`,
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        }
    );
    return (await response).json();
}

export async function getSessions()
{
    const token = localStorage.getItem("token");
    const response = fetch(`API_URL/sessions`,
        {
            method: "GET",
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": "token"
            }        
        }
    );
    return (await response).json();
}