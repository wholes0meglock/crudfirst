import { useState } from "react"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getSessions } from "../services/api";
import { Route } from "react-router-dom";
import { logout } from "../services/api";
// import  CreateSession  from "../pages/CreateSession";
type Session = {
  _id: string;
  subject: string;
  duration: number;
};


function Dashboard()
{
    const navigate = useNavigate();
    const [sessions,setSessions] = useState<Session[]>([]); //useState<Type>(initialValue)
    const handleClick = (id: string) => {
    navigate(`/session/${id}`);
    };
    const [loading, setLoading] = useState(true);
    useEffect(() =>
    {
        async function init()
        {
            try
            {
                await getCurrentUser();
                const data = await getSessions();
                setSessions(data);
                setLoading(false);
            }
            catch(err)
            {
                navigate("/login");
            }
        }
        init();
    },[]);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h2> Dashboard </h2>
            {sessions.map(session => (
              <div key={session._id} onClick={() => handleClick(session._id)}>
                  {session.subject} - {session.duration}
              </div>
          ))}
           <button onClick={() =>navigate("/dashboard/create") }>Create a session</button>
           <button onClick={async () => {
           await logout();
           navigate("/login");
           }}>
           Logout
           </button>
        </div>
    );
}

export default Dashboard;