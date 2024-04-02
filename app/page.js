"use client";
import React, { useState } from "react";

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
    this.titleSrc;
    this.titleName;
  }
}
export default function app() {
  let [grpName, setGrpName] = useState("");
  let [grpUrl, setGrpUrl] = useState("");
  let [createGroupCard, setCreateGroupCard] = useState(false);
  let [chatIndex, setChatIndex] = useState("");
  function handleClickGroup() {
    setCreateGroupCard(!createGroupCard);
  }
  //group class

  //groups useState array
  let [groups, setGroups] = useState([]);
  let [chat, setChat] = useState([]);
  function addContent() {
    //runs when create group button is pressed
    const groupCard = new Group(grpName, grpUrl, "thoms:hi", "2:09");
    setGroups([...groups, groupCard]);
    const groupChat = new Chat(grpName, grpUrl);
    setChat([...chat, groupChat]);

    // create group class object with grpName and grpUrl and add it to groups array
    console.log(chat);
    console.log(groups);
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
                  onClick={(event) => {
                    setChatIndex(event.target.getAttribute("key"));
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
              sx={{ flex: 1, bgcolor: "black", color: "white" }}
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
                    src={chat[chatIndex].titleSrc}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      ml: 5,
                      mb: 1,
                    }}
                  ></Box>
                  <Box sx={{ ml: 2 }}>{chat[chatIndex].titleName}</Box>
                </Toolbar>
              </AppBar>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
