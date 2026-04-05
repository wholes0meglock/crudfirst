import { useState } from "react";
import { createSession } from "../services/api";
// type Session = 
// {
//     _id : string,
//     subject : string,
//     duration : string
// }
function CreateSession()
{
    const [subject,setSubject] = useState("");
    const [duration,setDuration] = useState("");
    const [session,setSession] = useState<any>(null);

    async function handleSubmit(e : React.FormEvent)
    {
        e.preventDefault();

        const obj = {
            subject,
            duration: Number(duration)
        };
        const data = await createSession(obj);
        setSession(data);
    }
    return (
        <div>
            <h2> Create session </h2>
            <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
           />

        <input
          type="number"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <button type="submit">Create</button>
        </form>
        {session && (
        <div>
          <h3>Session created:</h3>
          {session.subject} - {session.duration}
        </div>
      )}
        </div>
    )

}


export default CreateSession;