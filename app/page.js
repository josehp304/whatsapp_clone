"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useReducer,
} from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import { auth } from "./firebaseConfig";
import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";
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
  autocompleteClasses,
  Avatar,
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

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setUserId } from "firebase/analytics";
import { stateContext, useStateUser } from "./StateProvider";

export default function app() {
  const authProvider = new GoogleAuthProvider();
  let [grpName, setGrpName] = useState("");
  let [grpUrl, setGrpUrl] = useState("");

  const [{ user }, dispatch] = useStateUser();

  let location = useLocation();

  let isActive = location.pathname === "/test";

  const collectionRef = collection(db, "rooms");
  // changes to the id of the group which was clicked, this index is used to display all the data inside chat
  let [chatIndex, setChatIndex] = useState("");

  // all the chat messages are stored inside this object based their assignned group
  let [chatText, setChatText] = useState({});

  // group class instances are stored inside this array
  let [groups, setGroups] = useState([]);
  let [fireGroups, setFireGroups] = useState([]);

  // let [user, setUser] = useState(auth?.currentUser?.uid);

  // turns a variable into true which causes grpCard component to show up

  const googleSignIn = async () => {
    try {
      await signInWithPopup(auth, authProvider);
      await dispatch({ type: "SET_USER", user: auth.currentUser });
      // console.log(user);
      // console.log(auth.currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchGroups() {
    await onSnapshot(collectionRef, (snapshot) => {
      setFireGroups(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }
  useEffect(() => {
    fetchGroups();
  }, []);
  useEffect(() => {
    console.log(user);
  }, [user]);
  // variablePull- direct variable access required for a section that will be converted to a component,
  //  component- needs to be converted to a component
  return (
    <>
      <CssBaseline />
      {/* authentication component 1 separate */}

      {!user ? (
        <>
          <Box
            sx={{
              display: "flex",
              height: "100vh",
              placeItems: "center",
            }}
          >
            <Container
              maxWidth="sm"
              sx={{
                bgcolor: "yellow",
                height: "50vh",
              }}
            >
              <Typography
                sx={{
                  ml: "auto",
                  mr: "auto",

                  textAlign: "center",
                  fontWeight: "1000",
                }}
                variant="h4"
              >
                {" "}
                Sign in to Whatsappclone
              </Typography>
              <Button
                sx={{
                  mt: "50%",
                  ml: "50%",
                  transform: "translate(-50%,-50%)",
                }}
                variant="contained"
                onClick={googleSignIn}
                // variablePull
              >
                sign in with google
              </Button>
            </Container>
          </Box>
        </>
      ) : (
        <Box sx={{ bgcolor: "secondary.side", overflow: "hidden" }}>
          <Container
            maxWidth="xl"
            sx={{ height: "100vh", position: "relative" }}
          >
            {/* navbar component 2 separate */}
            <AppBar position="relative" sx={{ height: 70, bgcolor: "primary" }}>
              <Toolbar
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: 450,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Avatar src={user.photoURL} />
                  <Typography sx={{ fontWeight: "10px", fontSize: "20px" }}>
                    {user.displayName}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {/* <PeopleAltRounded
                      sx={{
                        fontSize: 30,
                        ml: 5,
                        ":hover": { fontSize: 50 },
                      }}
                    /> */}
                    {/* <SlowMotionVideo
                      sx={{ fontSize: 30, ml: 2, ":hover": { fontSize: 50 } }}
                    /> */}

                    {/* create two NavLink for test and back to root 
                        create a conditional statement to return the appropriate navLink
                        useLocation -done  */}
                    {isActive ? (
                      <NavLink to={"/"}>
                        <GroupAddRounded
                          sx={{
                            fontSize: 30,
                            ml: 2,
                            ":hover": { fontSize: 50 },
                          }}
                        />
                      </NavLink>
                    ) : (
                      <NavLink to={"/test"}>
                        <GroupAddRounded
                          sx={{
                            fontSize: 30,
                            ml: 2,
                            ":hover": { fontSize: 50 },
                            textDecoration: "none",
                            color: "white",
                          }}
                        />
                      </NavLink>
                    )}
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

            {/* main app body starts here */}
            {/* groupCard component where user creates new group by entering name and dp url */}

            {/* group-jsx each group is pulled from the groups array and converted into contactCard components  */}
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
                {fireGroups.map((group, index) => (
                  <div key={index} id={group.id}>
                    <NavLink to={`/chat/${group.id}`}>
                      <ContactCard
                        imgSrc={group.data.src}
                        groupName={group.data.name}
                        lastMsg={group.data.lastMessage}
                        timeStamp={group.data.lastTime}
                      />
                    </NavLink>
                  </div>
                ))}
              </Box>

              {/* chat-jsx commponent 3  */}
              <Outlet />

              {/* __________chat over_________ */}
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
}
