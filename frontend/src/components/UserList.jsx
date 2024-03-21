import {useRecoilValue} from "recoil"
import {UserSelector} from "../atoms/atom";
import UserComp from "./Usercomponent";

const UserList = ()=>{
    const Users = useRecoilValue(UserSelector);
    // console.log(Users);
    const OurUsers = Users;
    // console.log(OurUsers);
    return (
        <>
         {OurUsers.map((user)=>{
                     return <UserComp key={user._id} user={user}/>
                 })}
        </>
    )
}

export default UserList;