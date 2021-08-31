import React,{useState,useEffect} from "react"
import AppRouter from "./AppRouter"
import {authService} from "../fbase";


function App() {

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj,setUserObj] = useState(null);

  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        //setUserObj(user); 객체가 너무 커서 유저 프로필을 업데이트 할려고 할때 리액트가 못 알아먹음
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile: (args) => user.updateProfile(args)
        })
        setIsLoggedIn(true)
      }else{
        setIsLoggedIn(false)
        setUserObj(null)
      }
      setInit(true)
    })
  },[])
 
  const refreshUser = ()=>{
    //유저가 프로필 이름을 바뀌었을때 돔을 refresh해주기 위한 함수 
    //setUserObj(authService.currentUser) userObj는 매우 큰 객체로 이를 전부 리프레쉬 한다면 리액트는 그많은 것들중 
    //무엇이 바뀌었는지 감지하기가 힘들다. 그러므로 업데이트된 객체를 축소해서 리프레시 해야된다

    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid:user.uid,
      updateProfile:(args) => user.updateProfile(args)
    })

  }

  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..." }
  
 
   
    </>
  );
}

export default App;
