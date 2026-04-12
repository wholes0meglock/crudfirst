    import { useEffect } from "react";
    import { useState } from "react";
    import { getSessionByID } from "../services/api";
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
        <div>
            <h2> Session details </h2>
            <div key={session._id}>
                {session.subject} - {session.duration}

                <button onClick={() => navigate(`/dashboard/edit/${session._id}`)}>Edit</button>

                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
        )
    }



    export default SessionCard;