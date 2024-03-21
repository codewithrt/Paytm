import {atom,atomFamily,selector} from "recoil"
import axios from "axios"

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
        return user.data;
    }
})
