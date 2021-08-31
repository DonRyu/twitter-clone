import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

function NweetFactory({ userObj }) {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";

    if (attachment !== "") {
      //파이어베이스 storage의 ref을 통해 연결함
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`); // 트윗을 db에 입력
      const response = await fileRef.putString(attachment, "data_url"); // 이미지를 storage에 입력
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
      userName:userObj.displayName
    };
    await dbService.collection("nweets").add(nweetObj);
    setNweet("");
    setAttachment("");
    
  };

  const onChange = (event) => {
    setNweet(event.target.value);
  };

  const onFileChange = (event) => {
    const theFile = event.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(theFile);
    reader.onloadend = (finishedEvent) => {
      // 리더에 이벤트 리스너 onloadend를 추가
      setAttachment(finishedEvent.currentTarget.result);
    };
  };

  const onClearAttachment = () => {
    setAttachment(null);
  };

  return (
    <form onSubmit={onSubmit} className="factory_input_form">
      
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        
      </div>

      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>

      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />

      {attachment && (
      <div className="factoryForm__attachment">
      <img
        src={attachment}
        style={{
          backgroundImage: attachment
        }}
      />
      <div className="factoryForm__clear" onClick={onClearAttachment}>
        <span>Remove</span>
        <FontAwesomeIcon icon={faTimes} />
      </div>
    </div>
  )}
    </form>
  );
}

export default NweetFactory;
