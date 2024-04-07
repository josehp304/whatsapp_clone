"use client";
import React, { useState, useRef } from "react";

import {
  Toolbar,
  AppBar,
  CssBaseline,
  Typography,
  Button,
  Container,
  Box,
  Card,
  Input,
} from "@mui/material";
import {
  AccountCircleRounded,
  SearchRounded,
  PeopleAltRounded,
  SlowMotionVideo,
  GroupAdd,
  GroupAddRounded,
  Translate,
} from "@mui/icons-material";
import ContactCard from "./contact";
import GrpCard from "./grpCard";
import ChatComponent from "./chat";
class Group {
  constructor(grpName, grpUrl, grpLastMsg, grpTimeStamp) {
    this.grpName = grpName;
    this.grpUrl = grpUrl;
    this.grpLastMsg = grpLastMsg;
    this.grpTimeStamp = grpTimeStamp;
  }
}
class Chat {
  constructor(titleName, titleSrc) {
    this.titleName = titleName;
    this.titleSrc = titleSrc;
    this.chatArray = [];
  }
}
class ChatClass {
  constructor(text, timeStamp, timeStampMin) {
    this.text = text;
    this.timeStamp = timeStamp;
    this.timeStampMin = timeStampMin;
  }
}
export default function app() {
  let [grpName, setGrpName] = useState("");
  let [grpUrl, setGrpUrl] = useState("");
  let [createGroupCard, setCreateGroupCard] = useState(false);
  let [chatIndex, setChatIndex] = useState("");
  let [chatText, setChatText] = useState({});

  // chat input goes here
  let [chatInput, setChatInput] = useState("");
  function handleClickGroup() {
    setCreateGroupCard(!createGroupCard);
  }
  const buttonRef = useRef(null);
  function handleEnterPress(event) {
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  }
  let [groups, setGroups] = useState([]);
  let [chat, setChat] = useState([]);
  //runs when create group button is pressed
  function addContent() {
    const groupCard = new Group(grpName, grpUrl, "thoms:hi", "2:09");
    setGroups([...groups, groupCard]);
    const groupChat = new Chat(grpName, grpUrl);
    setChat([...chat, groupChat]);
    const tempChat = chatText;
    tempChat[groups.length] = [];
    setChatText(tempChat);
  }

  return (
    <>
      <CssBaseline />

      <Box sx={{ bgcolor: "secondary.side", overflow: "hidden" }}>
        <Container maxWidth="xl" sx={{ height: "100vh", position: "relative" }}>
          <AppBar position="relative" sx={{ height: 70, bgcolor: "primary" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box
                sx={{
                  display: "flex",
                  width: 450,
                  justifyContent: "space-between",
                  alignItems: "center",
                  // bgcolor: "red",
                }}
              >
                <AccountCircleRounded
                  sx={{ fontSize: 40, ":hover": { fontSize: 50 } }}
                />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PeopleAltRounded
                    sx={{
                      fontSize: 30,
                      ml: 5,
                      ":hover": { fontSize: 50 },
                    }}
                  />
                  <SlowMotionVideo
                    sx={{ fontSize: 30, ml: 2, ":hover": { fontSize: 50 } }}
                  />
                  <GroupAddRounded
                    sx={{ fontSize: 30, ml: 2, ":hover": { fontSize: 50 } }}
                    onClick={handleClickGroup}
                  />
                </Box>
              </Box>

              <Button
                variant="contained"
                sx={{
                  // mx: 10,
                  fontWeight: 600,
                  color: "primary.main",
                  bgcolor: "secondary.main",
                  ":hover": { color: "black" },
                }}
              >
                <SearchRounded />
              </Button>
            </Toolbar>
          </AppBar>
          {createGroupCard && (
            <GrpCard
              setGrpName={setGrpName}
              setGrpUrl={setGrpUrl}
              setCreateGroupCard={setCreateGroupCard}
              addContent={addContent}
            />
          )}
          <Box sx={{ display: "flex", height: "100%" }}>
            <Box
              className="contact-cards"
              sx={{
                width: { lg: 500, md: 400, sm: 300 },
                height: "100%",
                bgcolor: "secondary.side2",
                color: "white",
              }}
            >
              {groups.map((group, index) => (
                <div
                  key={index}
                  id={index}
                  onClick={(event) => {
                    setChatIndex(event.currentTarget.getAttribute("id"));
                  }}
                >
                  <ContactCard
                    imgSrc={group.grpUrl}
                    groupName={group.grpName}
                    lastMsg={group.grpLastMsg}
                    timeStamp={group.grpTimeStamp}
                  />
                </div>
              ))}
            </Box>
            <Box
              className="chat"
              sx={{
                flex: 1,
                bgcolor: "black",
                color: "white",
                display: chatText[chatIndex] ? " " : "none",
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
                  <Box
                    component="img"
                    src={chat[chatIndex]?.titleSrc || " "}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      ml: 5,
                      mb: 1,
                    }}
                  ></Box>
                  <Box sx={{ ml: 2 }}>{chat[chatIndex]?.titleName || " "}</Box>
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
                {/* chat rendering here */}

                {/* <ChatComponent text="hello" timeStamp="-1" timeStampMin="69" />
                <ChatComponent
                  text="how are youuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu"
                  timeStamp="12"
                  timeStampMin="69"
                /> */}
                {chatText[chatIndex]
                  ? chatText[chatIndex].map((chatObject, index) => (
                      <div key={index}>
                        <ChatComponent
                          text={chatObject.text}
                          timeStamp={chatObject.timeStamp}
                          timeStampMin={chatObject.timeStampMin}
                        />
                      </div>
                    ))
                  : null}
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
                      setChatInput(event.target.value);
                    }}
                    placeholder="enter your msg here  "
                    onKeyDown={handleEnterPress}
                    // on change send the data to a useState hook var
                  ></Input>
                  <Button
                    ref={buttonRef}
                    variant="contained"
                    onClick={() => {
                      const tempDate = new Date();
                      let timeHour = tempDate.getHours();
                      timeHour -= 12;
                      const timeMin = tempDate.getMinutes();
                      // const time= tempDate.get
                      const tempChatClass = new ChatClass(
                        chatInput,
                        timeHour,
                        timeMin
                      );
                      const tempChat = chatText;
                      tempChat[chatIndex] = [
                        ...tempChat[chatIndex],
                        tempChatClass,
                      ];
                      setChatText(tempChat);
                      setChatInput("");
                    }}
                  >
                    {/* new chat object should be added to char.array with chatInput and currentTime as time stamp */}
                    enter
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
