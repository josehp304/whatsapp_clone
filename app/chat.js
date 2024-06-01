import { StayPrimaryLandscape } from "@mui/icons-material";
import { Typography, Box } from "@mui/material";
import React from "react";
export default function chatComponent({ text, timeStamp }) {
  let timeStampDate = new Date(timeStamp);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          pt: 1,
          pr: 1,
        }}
      >
        <Box
          sx={{
            p: 2,
            pt: 1,
            bgcolor: "secondary.side",
            color: "white",
            borderRadius: 5,
            maxWidth: "500px",
          }}
        >
          <Typography variant="h6" sx={{ wordWrap: "break-word" }}>
            {text}
          </Typography>
          <Typography sx={{ textAlign: "right" }}>
            {timeStampDate.toLocaleString("default", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: "true",
            })}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
