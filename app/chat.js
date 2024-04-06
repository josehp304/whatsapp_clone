import { StayPrimaryLandscape } from "@mui/icons-material";
import { Typography, Box } from "@mui/material";
import React from "react";
export default function chatComponent({ text, timeStamp, timeStampMin }) {
  let timeHour;
  if (timeStamp > 0) {
    timeHour = `${timeStamp}:${timeStampMin}pm`;
  } else if (timeStamp == -12) {
    timeHour = `12:${timeStampMin}am`;
  } else {
    const tempTime = timeStamp + 12;
    timeHour = `${tempTime}:${timeStampMin}am`;
  }
  return (
    <>
      -
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
          <Typography sx={{ textAlign: "right" }}>{timeHour}</Typography>
        </Box>
      </Box>
    </>
  );
}
