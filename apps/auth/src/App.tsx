import React from "react";
import { AppShell } from "ui";
import HomeIcon from "@mui/icons-material/Home";

function App() {
  return (
    <AppShell
      title="Playlist"
      colorScheme="dark"
      routes={[
        {
          path: "/",
          element: () => <div>Home</div>,
        },
        {
          path: "/playlist",
          element: () => <div>Playlist</div>,
        },
      ]}
      navLinks={[
        {
          label: "Home",
          path: "/",
          icon: <HomeIcon />,
        },
      ]}
    />
  );
}

export default App;
