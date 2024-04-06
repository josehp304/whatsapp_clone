import React, { useRef } from "react";
import { Card, Box, Input, Button } from "@mui/material";

export default function grpCard({
  setGrpUrl,
  setGrpName,
  setCreateGroupCard,
  addContent,
}) {
  const buttonRef = useRef(null);
  function handleEnterPress(event) {
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  }
  return (
    <Card
      sx={{
        minHeight: 300,
        width: 500,
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "Translate(-50%,-50%)",
        p: 5,
        bgcolor: "secondary.main",
        display: "flex",
        flexDirection: "column",
        zIndex: 9000,
      }}
    >
      <form onKeyDown={handleEnterPress}>
        Enter Group name:
        <Input
          type="text"
          placeholder="enter name of the group"
          aria-label="group name"
          sx={{ ml: 5 }}
          onChange={(event) => {
            setGrpName(event.target.value);
          }}
        ></Input>
        Profile pic url:
        <Input
          type="text"
          placeholder="enter name of the group"
          aria-label="group name"
          sx={{ ml: 10 }}
          onChange={(event) => {
            setGrpUrl(event.target.value);
          }}
        ></Input>
        <Button
          ref={buttonRef}
          variant="contained"
          sx={{ mt: 5 }}
          onClick={() => {
            addContent();
            setCreateGroupCard(false);
          }}
        >
          Create Group
        </Button>
      </form>
    </Card>
  );
}
