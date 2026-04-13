import { useState } from "react";
import { createSession } from "../services/api";
type Session = 
{
    _id : string,
    subject : string,
    duration : string
}
function CreateSession()
{
    const [subject,setSubject] = useState("");
    const [duration,setDuration] = useState("");
    const [session,setSession] = useState<any>(null);

    async function handleSubmit(e : React.FormEvent)
    {
        e.preventDefault();

        try {
        const obj = {
            subject,
            duration: Number(duration)
        };

        const data = await createSession(obj);
        setSession(data);
    } catch (err) {
        console.error("Create session failed:", err);
    }
    }
    return (
        <div className="min-h-screen flex justify-center flex-col items-center">
            <h2 className="absolute top-10 left-100"> Create session </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 border p-4 rounded-lg">
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

        <button type="submit" className="mt-2 p-1 border rounded-xl hover:bg-yellow-500 hover:text-black transition">Create</button>
        </form>
        {session && (
        <div className="flex flex-col">
          <h3 className="bg-gray-800 p-3 rounded hover:bg-gray-700 transition mt-6 mb-6">Session created:</h3>
          <h2 className="bg-yellow-700 rounded"> {session.subject} / {session.duration} </h2>
          
        </div>
      )}
        </div>
    )

}


export default CreateSession;