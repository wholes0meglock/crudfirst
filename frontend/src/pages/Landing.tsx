import { useNavigate } from "react-router-dom";


function Landing()
{
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex justify-center flex-col gap-5 items-center">
            <div className="p-1">
                <h3 className="text-red-500 text-2xl "> Stay on Track.</h3>
            </div>

            <div className="flex gap-6" >
                <button onClick={() => navigate("/login")} className="p-5 border rounded-xl hover:bg-yellow-500 hover:text-black transition min-w-24" >
            Login
            </button>
            </div>
            
            <div className="flex gap-6">
                <button onClick={() => navigate("/register")} className="p-5 border rounded-xl hover:bg-red-500 hover:text-black transition min-w-24">
            Register
            </button>
            </div>
            
        </div>
    );
}
export default Landing;