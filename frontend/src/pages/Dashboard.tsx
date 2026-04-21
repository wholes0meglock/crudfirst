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
                console.log("error caught gng");
                navigate("/login");
            }
        }
        init();
    },[]);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="min-h-screen flex justify-center flex-col items-center">
            <h2 className="absolute top-10 left-100"> Dashboard </h2>

            <div className="flex flex-row">
                {sessions.map(session => (
              <div key={session._id} onClick={() => handleClick(session._id)} className="bg-gray-800 p-3 rounded cursor-pointer hover:bg-gray-700 transition mr-2">
                  {session.subject} - {session.duration}
              </div>
          ))}
            </div>
            
           <button onClick={() =>navigate("/dashboard/create")} className="bg-gray-800 p-3 mt-5 rounded cursor-pointer hover:bg-gray-700 transition">Create a session</button>



           <button onClick={async () => {
           await logout();
           navigate("/login");
           }} className="mt-4 bg-gray-800 p-2 mt-5 rounded cursor-pointer hover:bg-gray-700 transition">
           Logout
           </button>
        </div>
    );
}

export default Dashboard;