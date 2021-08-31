import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//import Nweet from "../components/Nweet";
import { authService, dbService } from "../fbase";

export default ({ userObj, refreshUser }) => {
  const history = useHistory();

  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyNweets = async () => {
    //where do the filtering
    const nweets = await dbService.collection("nweets").where("creatorId", "==", userObj.uid).orderBy("createdAt", "asec").get();
    //console.log(nweets.docs.map(doc=>doc.data()));
  };

  useEffect(() => {
    getMyNweets();
    return function cleanup(){
      getMyNweets()
    }
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (userObj.displayName !== newDisplayName) {
      //When user change the name => update the name

      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser(); //App에 있는 userObj 스테이트를 refreash 해줘야 새로 입력된 데이터가 화면에 보여진다
    }
    setNewDisplayName("");
  };

  const onChange = (event) => {
    setNewDisplayName(event.target.value);
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input onChange={onChange} type="text" autoFocus placeholder="Display name" value={newDisplayName} className="formInput" />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <button className="Logout" onClick={onLogOutClick}>
        Log Out
      </button>
    </div>
  );
};
