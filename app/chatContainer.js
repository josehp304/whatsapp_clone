import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, AppBar, Toolbar, Input, Button } from "@mui/material";
import ChatComponent from "./chat";
import { useParams } from "react-router-dom";
import { db } from "./firebaseConfig";
import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { useStateUser } from "./StateProvider";
export default function chatContainer() {
  const [{ user }, dispatch] = useStateUser();
  // chat input goes here
  let [chatInput, setChatInput] = useState("");
  const buttonRef = useRef(null);
  let { contactId } = useParams();
  let [tempRoom, setTempRoom] = useState("");
  let [tempChat, setTempChat] = useState("");
  let collectionRef = collection(db, "rooms");
  let timeStampDate = new Date();

  let docRef = doc(db, "rooms", contactId);
  let chatCollectionRef = collection(docRef, "chat");
  let q = query(chatCollectionRef, orderBy("timeStamp", "asc"));
  useEffect(() => {
    onSnapshot(docRef, (snapshot) => {
      setTempRoom({
        id: snapshot.id,
        data: snapshot.data(),
      });
    });
    onSnapshot(q, (snapshot) => {
      setTempChat(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [contactId]);
  function handleEnterPress(event) {
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  }

  return (
    <Box
      className="chat"
      sx={{
        flex: 1,
        bgcolor: "black",
        color: "white",
      }}
    >
      <AppBar
        position="relative"
        sx={{ height: 50, bgcolor: "secondary.side3" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* use params roomId to get the group details directly from database */}
          <Box
            component="img"
            src={tempRoom?.data?.src} // access grpUrl from firebase using roomid
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              ml: 5,
              mb: 1,
            }}
          ></Box>
          <Box sx={{ ml: 2 }}>
            {/* access grpName from firebase using roomId */}
            {tempRoom?.data?.name}
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          bgcolor: "beige",
          height: "100%",
          width: "100%",
          position: "relative",
          color: "black",
        }}
      >
        <Box
          sx={{
            height: "90%",
            overflow: "auto",
          }}
        >
          {/* access all chat components from roomId. */}
          {tempChat
            ? tempChat.map((chatObject) => (
                <div key={chatObject.id}>
                  <ChatComponent
                    text={chatObject.data.text}
                    timeStamp={chatObject.data.timeStamp}
                    displayName={chatObject.data.displayName}
                    // user name later
                  />
                </div>
              ))
            : null}
        </Box>

        {/* //input box */}
        <Box
          className="text-input"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 150,

            height: 50,

            width: "100%",
          }}
        >
          <Input
            type="text"
            value={chatInput}
            sx={{
              color: "white",
              justifyContent: "center",
              borderRadius: 2,
              bgcolor: "black",
              width: "50%",
              pl: 2,
            }}
            onChange={(event) => {
              setChatInput(event.target.value); // variablePull
            }}
            placeholder="enter your msg here  "
            onKeyDown={handleEnterPress} // variablePull
          ></Input>
          <Button
            ref={buttonRef} // variablePull
            variant="contained"
            onClick={() => {
              // add new chat document to chat collection - done
              // live time
              addDoc(chatCollectionRef, {
                text: chatInput,
                timeStamp: timeStampDate.getTime(),
                displayName: user.displayName,
              });

              setChatInput(""); // variablepull
            }}
          >
            enter
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
