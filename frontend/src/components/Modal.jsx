import { useRef } from "react";
import {useForm} from "react-hook-form"


const Modal = ({setisOpen}) => {
     const modelref = useRef();
     const CloseModal = (e)=>{
        if(modelref.current === e.target){
            setisOpen(false);
        }
     }

     const {register,handleSubmit} = useForm();
     const onsubmit = (e)=>{
        console.log(e);
     }

    return (
        <>
            <div ref={modelref} onClick={CloseModal} className=" fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg w-96">
                    <div className="flex justify-center text-3xl font-bold">
                        Send Money
                    </div>
                    <div className="flex text-gray-500  pt-10 text-center gap-4">
                        <div className="bg-black w-11 rounded-full p-2 text-white ">
                            R
                        </div>
                        <div className="py-2 text-black font-bold text-xl">
                            Rahul Tembhurne
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <div className="py-2">
                            <div className="py-1">
                                <label className="font-medium">
                                   Amount (in Rs)
                                </label>
                            </div>
                            <div className=" py-1">
                                <input type="number" placeholder="Enter Amount" className="p-2 w-full border border-slate-300 rounded-lg" {...register("amount")}  required min={0} />
                            </div>
                        </div>
                        <div className="py-2">
                            <button className="text-center bg-green-500 w-full text-white p-2 rounded-lg font-bold" type="submit">
                                Initiate Transfer
                            </button>
                        </div>
                        <div className="text-center py-1">
                            <button className="font-bold" onClick={()=>setisOpen(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Modal;