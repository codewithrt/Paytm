// import { useRecoilValue } from "recoil";
import { UserSelector,InputUserAtom } from "../atoms/atom";
import {useRecoilValue,useSetRecoilState} from "recoil"

const Test = ()=>{
    const user = useRecoilValue(UserSelector);
  console.log(user);
  console.log("I am Rendered");
  const inputuser = useSetRecoilState(InputUserAtom);
//   const Users = useRecoilValue(UserSelector);
//   console.log(Users);
//   const OurUsers = Users.data;
//   console.log(OurUsers);
    return (
        <>
        <div>
          {user.users.map((use)=>{
            <div>
                IT is {use.firstName}
            </div>
          })}
          </div>
          <div>
            <button onClick={()=>inputuser("Rahul")}>click me</button>
          </div>
        </>
    )
}

export default Test;