import { lazy, useState ,Suspense} from "react";
import UserComp from "./UserComp";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { InputUserAtom, UserSelector } from "../atoms/atom";
import Test from "./Test";
// const {InputUserAtom,UserSelector} = lazy(()=>import("../atoms/atom"))
import InputComp from "./InputComp";
import UserList from "./UserList";

const Dashboard = ()=>{

    
   
    
    return(
        <>
        {/* <Suspense fallback={<div>Loading ...</div>}> */}
           <div className="bg-white h-full">
             <div className="grid grid-cols-2 gap-4 place-content-end px-8 bg-white py-2 border-b-2 border-gray-200">
                <div className="p-2 font-bold text-xl">
                    Payments App
                </div>
                <div className="justify-end  flex">
                    <div className="p-2">Hello,User</div>
                    <div className="p-2 bg-gray-200 rounded-full w-9 h-9 flex justify-center algin-center">
                        <span>U</span>
                    </div>
                </div>
             </div>
             <div className="bg-white">
                <div className="p-2 px-9 py-4 font-bold text-lg">
                Your Balance  $5000
                </div>
                <div className="p-2 px-9 py-3 font-bold text-lg">
                Users
                </div>
                <div className="p-2 px-9 py-3">
                   <InputComp/>
                </div>
             </div>
            
             <div className="p-2 px-9 py-8" >
             <Suspense fallback={<div>Loading ..</div>}>
                <UserList/>
                 {/* <Test/> */}
                 </Suspense>
             </div>
             
           </div>
           {/* </Suspense> */}
        </>
    )
}

export default Dashboard;