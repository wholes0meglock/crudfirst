    import { useEffect } from "react";
    import { useState } from "react";
    import { getCurrentUser, getSessionByID } from "../services/api";
    import { useParams } from "react-router-dom";
    // import { updateSession } from "../services/api";
    import { useNavigate } from "react-router-dom";

    import { deleteSession } from "../services/api";

    type Session = {
    _id: string;
    subject: string;
    duration: number;
    };

    function SessionCard()
    {
        const [session,setSession] = useState<Session | null>(null);
        const { id } = useParams<{id : string}>();
        const navigate = useNavigate();
        const [loading,setLoading] = useState(true);
        // if (!id) {
        //    return <Navigate to="/dashboard" />;
        //     }
        useEffect(()=>
        {
            async function getUserAndLoadSessionCard()
            {
                try{
                    await getCurrentUser();
                    const data = await getSessionByID(id!);
                    setSession(data);
                }
                catch(err)
                {
                    navigate("/login");
                }
                finally{
                    setLoading(false);
                }
            }
            getUserAndLoadSessionCard();
        },[])
        // useEffect(() =>
        // {
        //     async function loadSessionCard()
        //     {
        //         const data = await getSessionByID(id!); //a bit risky with the !
        //         setSession(data);
        //     }
        //     loadSessionCard();
        // },[]);
        const handleDelete = async () =>
        {
            if(!id) return;
            if (!window.confirm("Are you sure you want to delete this session?")) return;
            try{
                await deleteSession(id);
                navigate("/dashboard");
            }
            catch (e) {
        console.error("Delete failed", e);
        }
        };
        if(!session)
        return <div> Loading... </div> ;

        return (
        <div className="min-h-screen flex justify-center flex-col items-center">
            <h2 className="absolute top-10 left-100"> Session details </h2>
            <div key={session._id} className="flex flex-col">
                <h2 className="mb-5">{session.subject} / {session.duration}</h2>
                <button onClick={() => navigate(`/dashboard/edit/${session._id}`)} className="p-1 border rounded-xl hover:bg-yellow-500 hover:text-black transition">Edit</button>

                <button onClick={handleDelete} className="p-1 border rounded-xl hover:bg-red-500 hover:text-black transition">Delete</button>
            </div>
        </div>
        )
    }



    export default SessionCard;