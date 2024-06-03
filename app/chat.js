import { StayPrimaryLandscape } from "@mui/icons-material";
import { Typography, Box } from "@mui/material";
import React, { useContext } from "react";
import { stateContext } from "./StateProvider";
export default function chatComponent({ text, timeStamp, displayName }) {
  let timeStampDate = new Date(timeStamp);
  const [{ user }, dispatch] = useContext(stateContext);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent:
            displayName === user.displayName ? "flex-end" : "flex-start", // change this to start for other user mssg
          pt: 1,
          pr: 1,
        }}
      >
        <Box
          sx={{
            p: 2,
            pt: 1,
            bgcolor:
              displayName === user.displayName ? "black" : "secondary.side",
            color: "white",
            borderRadius: 5,
            maxWidth: "500px",
          }}
        >
          <Box sx={{ width: "100%", textAlign: "end" }}>
            <Typography
              variant="h9"
              sx={{
                color: "primary.main",
              }}
            >
              {displayName}
            </Typography>
          </Box>
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
