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
            console.log("success-1")
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
        console.log("success-2")
        await updateSession(id, updatedData);
        console.log("success-3")
    }

    if(!session)
    return <div> Loading... </div> ;

    return (
        <div className="min-h-screen flex justify-center flex-col items-center">
            <h3 className="absolute top-10 left-100">Update session</h3>
            <input 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border p-2 rounded bg-gray-800 text-white outline-none"
            />
            <input 
            value = {duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="border p-2 mt-2 rounded bg-gray-800 text-white outline-none"
            />
            <button onClick={updateSessionCard} className="mt-6 p-1 border rounded-xl hover:bg-yellow-500 hover:text-black transition">Update</button>
        </div>
    )

}


export default EditSession;