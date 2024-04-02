import React from "react";
import { Card, Box, Input, Button } from "@mui/material";
export default function grpCard({ setGrpUrl, setGrpName, addContent }) {
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
      }}
    >
      <Box>
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
      </Box>

      <Box>
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
      </Box>
      <Button variant="contained" sx={{ mt: 5 }} onClick={addContent}>
        Create Group
      </Button>
    </Card>
  );
}
