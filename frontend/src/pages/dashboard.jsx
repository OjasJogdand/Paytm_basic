import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard()
{
    const [users,setUsers]=useState([]);
    let token=localStorage.getItem("token");
    const [balance,setBalance]=useState(0);
    async function funcbalance()
    {
        const response=await axios.get("http://localhost:3000/api/v1/account/balance",{headers:{
            Authorization:"Bearer "+token
         }});
          setBalance(response.data.balance);
    }
    useEffect(function(){
        funcbalance();
    },[]);
    return(
        <div className="w-screen min-h-screen">
         <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    U
                </div>
            </div>
        </div>
    </div>
        <div className="m-8">
        <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
    <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" onChange={async function(e){
                const response= await axios.get("http://localhost:3000/api/v1/user/bulk?filter="+e.target.value);
                setUsers(response.data.user);
            }} placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
         <Users users={users}></Users>
        </div>
        </div>
        </div>
    )
}
function Users({users})
{
    const navigate=useNavigate();
    return(
    <div>
    {users.map(function(user){
      return(
        <div className="flex justify-between" key={user._id}>
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center h-full">
            <button onClick={function()
                {
                    navigate("/send?id="+user._id+"&name="+user.firstName);
                }
            }>Send Money</button>
        </div>
        </div>
      )
    })}
    </div>
    )
}
export default Dashboard;