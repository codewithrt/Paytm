// import ModalComp from "./ModalComp";

import { useState } from "react";
import Modal from "./Modal";


const UserComp = ({firstName,lastName}) => {
    const [isOpen,setisOpen] = useState(false);
    return (
        <>
            <div className="grid grid-cols-2 h-9 place-content-end py-6">
                <div className="flex">
                    <div className="bg-gray-200 w-8 h-8 rounded-full text-center p-1">{firstName.charAt(0).toUpperCase()}</div>
                    <div className="p-1 px-3 font-bold">{firstName} {lastName}</div>
                </div>
                <div className="flex justify-end ">
                    <button className="bg-black text-white rounded-lg p-2 px-4" onClick={()=>setisOpen(true)}>
                        Send Money
                    </button>
                </div>
            </div>
            <div >
               {isOpen && <Modal setisOpen = {setisOpen}/>} 
            </div>
        </>
    )
}

export default UserComp;