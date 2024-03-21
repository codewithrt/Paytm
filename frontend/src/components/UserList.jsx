import {useRecoilValue} from "recoil"
import {UserSelector} from "../atoms/atom";
import UserComp from "./UserComp";

const UserList = ()=>{
    const Users = useRecoilValue(UserSelector);
    // console.log(Users);
    const OurUsers = Users.users;
    // console.log(OurUsers);
    return (
        <>
         {OurUsers.map((user)=>{
                     return <UserComp key={user._id} firstName = {user.firstName} lastName = {user.lastName}/>
                 })}
        </>
    )
}

export default UserList;