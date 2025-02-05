"use client";
import React, { useState } from "react";
import { Box, Button, ButtonGroup } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import NextWeekOutlinedIcon from "@mui/icons-material/NextWeekOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import Person2Icon from "@mui/icons-material/Person2";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PublishedWithChangesRoundedIcon from "@mui/icons-material/PublishedWithChangesRounded";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";

const buttons = [
  { label: "Dashboard", icon: <HomeRoundedIcon />, link: "/dashboard" },
  {
    label: "Approver",
    icon: <ManageSearchRoundedIcon />,
    link: "/approver",
  },
  {
    label: "Director",
    icon: <PublishedWithChangesRoundedIcon />,
    link: "/director",
  },
];

const buttons2 = [
  {
    label: "Purchasing work",
    icon: <FileUploadOutlinedIcon />,
    link: "/dashboard",
  },
  {
    label: "Treasury work",
    icon: <NextWeekOutlinedIcon />,
    link: "/dashboard",
  },
  {
    label: "Distribution Unit",
    icon: <WalletOutlinedIcon />,
    link: "/dashboard",
  },
];

const handleSignout = async () => {
  try {
    await fetch("http://localhost:8081/auth/signout", {
      method: "POST",
      credentials: "include",
    });

    window.location.href = "/signin";
  } catch (error) {
    console.error("sign out failed:", error);
  }
};

const SideBar = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handleButtonClick = (buttonLabel: string) => {
    setSelectedButton(buttonLabel);
  };

  return (
    <div className="h-full w-[15rem] bg-white shadow-md p-5 flex flex-col drop-shadow-2xl">
      <div className="mb-8 text-center">
        <img src="/logo66.png" alt="Logo" />
      </div>
      <div className="mb-5 border-b-2 border-gray-400">
        <h3 className="text-lg font-medium text-gray-700 text-start">Menu</h3>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            "& > *": {
              m: 1,
              flex: 1,
            },
          }}
        >
          <ButtonGroup
            orientation="vertical"
            aria-label="Vertical button group"
            variant="text"
            sx={{
              "& .MuiButton-root": {
                justifyContent: "flex-start",
                textAlign: "left",
                width: "100%",
                textTransform: "none",
                color: "inherit",
                "&:hover, &:focus": {
                  backgroundColor: "gray",
                },
              },
              "& .MuiButtonGroup-grouped": {
                border: "none",
              },
            }}
          >
            {buttons.map((button) => (
              <Button
                key={button.label}
                className={`w-full text-start ${
                  selectedButton === button.label ? "bg-gray-200" : ""
                }`}
                variant="text"
                href={button.link}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  position: "relative",
                }}
                onClick={() => handleButtonClick(button.label)}
              >
                {button.icon}
                {button.label}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-medium text-gray-700 text-start">Recent</h3>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            "& > *": {
              m: 1,
              flex: 1,
            },
          }}
        >
          <ButtonGroup
            orientation="vertical"
            aria-label="Vertical button group"
            variant="text"
            sx={{
              "& .MuiButton-root": {
                justifyContent: "flex-start",
                textAlign: "left",
                width: "100%",
                textTransform: "none",
                color: "inherit",
                "&:hover, &:focus": {
                  backgroundColor: "gray",
                },
              },
              "& .MuiButtonGroup-grouped": {
                border: "none",
              },
            }}
          >
            {buttons2.map((button) => (
              <Button
                key={button.label}
                className={`w-full text-start ${
                  selectedButton === button.label ? "bg-gray-200" : ""
                }`}
                variant="text"
                href={button.link}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  position: "relative",
                }}
                onClick={() => handleButtonClick(button.label)}
              >
                {button.icon}
                {button.label}
                <EastOutlinedIcon sx={{ position: "absolute", right: 0 }} />
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </div>

      <div className="p-4 border-t border-gray-200 mt-auto">
        <Button
          key="profile"
          className="w-full text-start text-red-600 hover:bg-red-100 gap-2"
          variant="text"
          color="error"
          onClick={handleSignout}
        >
          <Person2Icon className="mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
