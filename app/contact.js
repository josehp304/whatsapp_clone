"use client";
import { Box, Typography } from "@mui/material";
import React from "react";

export default function contactCard({ imgSrc, groupName, lastMsg, timeStamp }) {
  return (
    // add link to
    <>
      <Box
        sx={{
          display: "flex",
          //   bgcolor: "red",
          alignItems: "center",
          height: 100,
          borderBottom: "1px solid white",
          justifyContent: "space-between",
          ":hover": { bgcolor: "black" },
          textDecoration: "none!important",
          color: "white",
        }}
      >
        <Box
          sx={{ ml: 2, borderRadius: "50%", height: 50 }}
          component="img"
          src={imgSrc}
        ></Box>
        <Box sx={{ width: 200 }}>
          <Typography variant="h5" sx={{ textDecoration: "none!important" }}>
            {groupName}
          </Typography>
          {/* <Typography variant="h8">{lastMsg}</Typography> */}
        </Box>
        {/* <Box sx={{ mr: 5 }}>{timeStamp}</Box> */}
      </Box>
    </>
  );
}
