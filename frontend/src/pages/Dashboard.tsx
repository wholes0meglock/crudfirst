import { useState } from "react"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getSessions } from "../services/api";
import { Route } from "react-router-dom";
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
    // const [loading, setLoading] = useState(true);
    // useEffect(()=>
    //     {
    //         getCurrentUser().then((data) =>
    //         {
    //             setLoading(false);
    //         }).catch(() =>
    //         {
    //             navigate("/login");
    //         });
    //     },[]);
    useEffect(() =>
    {
        async function loadSessions()
        {
            try
            {
                const data = await getSessions();
                setSessions(data);
            }
            catch(e)
            {
                console.error("Error loading sessions", e);
            }
        }
        loadSessions();
    },[]);
    console.log(sessions);
    return (
        <div>
            <h2> Dashboard </h2>
            {/* <div>
               <button onClick={sessions.map(session => (
              <div key={session._id} onClick={() => handleClick(session._id)}>
                  {session.subject} - {session.duration}
              </div>
          ))}>Show all sessions</button> 
            </div> */}

            {sessions.map(session => (
              <div key={session._id} onClick={() => handleClick(session._id)}>
                  {session.subject} - {session.duration}
              </div>
          ))}
           <button onClick={() =>navigate("/dashboard/create") }>Create a session</button>
        </div>
    );
}

export default Dashboard;