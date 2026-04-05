import { useEffect } from "react";
import { useState } from "react";
import { getSessionByID } from "../services/api";
import { useParams } from "react-router-dom";
// import { updateSession } from "../services/api";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();


type Session = {
  _id: string;
  subject: string;
  duration: number;
};

function SessionCard()
{
    const [session,setSession] = useState<Session | null>(null);
    const { id } = useParams<{id : string}>();
    // if (!id) {
    //    return <Navigate to="/dashboard" />;
    //     }
    useEffect(() =>
    {
        async function loadSessionCard()
        {
            const data = await getSessionByID(id!); //a bit risky with the !
            setSession(data);
        }
        loadSessionCard();
    },[]);
    
    if(!session)
    return <div> Loading... </div> ;

    return (
       <div>
        <h2> Session details </h2>
        <div key={session._id}>
            {session.subject} - {session.duration}

            <button onClick={() => navigate(`/edit/${session._id}`)}>Edit</button>
        </div>
       </div>
    )
}


export default SessionCard;