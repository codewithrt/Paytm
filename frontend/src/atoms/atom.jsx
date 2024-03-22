import {atom,atomFamily,selector} from "recoil"
import axios from "axios"
import { Navigate } from "react-router-dom";

// Input user Atom
export const InputUserAtom = atom({
        key:"InputUserAtom",
        default: ""
})

export const UserSelector = selector({
    key:"UserSelector",
    get : async({get})=>{
        const input = get(InputUserAtom);
        // console.log(input);
        const user = await axios.get("http://localhost:3000/api/v1/user/bulk",{params:{firstName:input,lastName:input}});
        // console.log(user.data.users);
        const Me = get(IsLogAtom);
        const final  = user.data.users.filter((usere)=>{
            // console.log(usere);
            return usere._id !== Me.data.user._id
        })
        // console.log(final);
        return final;
    }
})
// If Person present atom
export const IsLogAtom = atom({
    key:"IsLogAtom",
    default: selector({
        key:"IsLogAtomSelector",
        get:async()=>{
            const token = localStorage.getItem("token");
            if(token === null){
                return null;
            }else{
                const User = await axios.get("http://localhost:3000/api/v1/user/IsValidToken",{headers:{Authorization:token}});
                // console.log(User);
                // <Navigate to="/dashboard"/>
                return User;
            }
        }
    })
})
// Amount Selector
export const TellAmount = atom({
    key:"TellAmount",
    default:selector({
        key:"TellAmountSelector",
        get:async()=>{
            const token = localStorage.getItem("token");
            const amount = await axios.get("http://localhost:3000/api/v1/account/balance",{headers:{Authorization:token}});
            // console.log(amount);
            return amount;
        }
    })
    
})

