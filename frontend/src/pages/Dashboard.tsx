import { useState } from "react"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSessions } from "../services/api";
type Session = {
  _id: string;
  subject: string;
  duration: number;
};
const navigate = useNavigate();

function handleClick(id: string) {
  navigate(`/session/${id}`);
}
function Dashboard()
{
    const [sessions,setSessions] = useState<Session[]>([]); //useState<Type>(initialValue)
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

    return (
        <div>
            <h2> Dashboard </h2>
            {sessions.map(session => (
              <div key={session._id} onClick={() => handleClick(session._id)}>
                  {session.subject} - {session.duration}
              </div>
          ))}
        </div>
    );
}

export default Dashboard;