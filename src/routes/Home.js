import React, { useEffect, useState } from "react";
import { dbService, storageService } from "../fbase";
import Nweet from "../components/Nweet";

import NweetFactory from "../components/NweetFactory";
import "../routes/route.css";

function Home({ userObj }) {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    //onSnapShot은 CRUD 기능을 활성화 시키기 위한 리스너임
    //이렇게 해야 실시간으로 입력 데이터가 뜸
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setNweets(nweetArray);
    });
  }, []);

  return (
    <div>
      <NweetFactory userObj={userObj} />
      <div className="home_nweet">
        {nweets.map((nweet) => {
          return <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} userObj={userObj} />;
        })}
      </div>
    </div>
  );
}

export default Home;
