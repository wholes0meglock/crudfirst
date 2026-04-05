import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getSessionByID, updateSession } from "../services/api";
import { useParams } from "react-router-dom";


type Session = {
  _id: string;
  subject: string;
  duration: number;
};

function EditSession()
{
    const [session,setSession] = useState<Session | null >(null);
    const { id } = useParams<{id : string}>(); //to avoid warnings with undefined data types, ts for sure

    const [subject, setSubject] = useState("");
    const [duration, setDuration] = useState(0);
    const navigate = useNavigate();

    useEffect(() =>
    {
        async function loadSessionCard()
        {
            if (!id) {
            navigate("/");
            return;
        }
            const data = await getSessionByID(id); //a bit risky with the !
            setSession(data);
            setSubject(data.subject);
            setDuration(data.duration);

        }
        loadSessionCard();
    },[id]);

    const updateSessionCard = async () =>
    {
        if(!id) return;
        const updatedData = 
        {
            subject,
            duration
        }
        await updateSession(id, updatedData);
    }

    if(!session)
    return <div> Loading... </div> ;

    return (
        <div>
            <input 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            />
            <input 
            value = {duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            />
            <button onClick={updateSessionCard} >Update</button>
        </div>
    )

}


export default EditSession;