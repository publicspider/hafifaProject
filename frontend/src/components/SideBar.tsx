import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
// import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CarCtx } from "./context/carCtx.ts";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isLoggedIn,setIsLoggedIn]=React.useState(false);
  const { isLogged,handleLogin ,handleLogOut} = useContext(CarCtx);
  const navigate = useNavigate();
  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const response = await fetch("http://localhost:5000/api/users/isLoggedIn", {
          method: "GET",
          credentials: "include", // Include cookies for authentication
        });
        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          setIsLoggedIn(data.message === "authenticated");
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    }
    checkLoginStatus();
  }, []);
  const handleLogout = async () => {
    handleLogin(false, "", "0", "");
    await handleLogOut();
    navigate("/");
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
// React.useEffect(()=>{
//   fetch("http://localhost:5000/api/cars/isLoggedIn")
//   .then(response = > {
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return ;
//   })
// })
  return (
    <>
    {isLoggedIn&&(
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"

            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap component="div">
            עמוד ראשי
          </Typography> */}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <List>
          <NavLink to="/dashboard">
            <ListItem key={2} disablePadding>
              <ListItemButton
                sx={{
                  backgroundColor: "white",
                  border: "1px solid blue",
                  borderRadius: "5px",
                  margin: "5px",
                }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    style: {
                      color: "black",
                      fontSize: "1.2rem",
                      textDecoration: "none",
                      alignContent: "center",
                    },
                  }}
                  primary="עמוד ראשי"
                />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to="/tzadik">
            <ListItem key={2} disablePadding>
              <ListItemButton
                sx={{
                  backgroundColor: "white",
                  border: "1px solid blue",
                  borderRadius: "5px",
                  margin: "5px",
                }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    style: {
                      color: "black",
                      fontSize: "1.2rem",
                      textDecoration: "none",
                    },
                  }}
                  primary="הוספת צ"
                />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <ListItem key={2} disablePadding>
              <ListItemButton
              onClick={handleLogout}
                sx={{
                  backgroundColor: "white",
                  border: "1px solid blue",
                  borderRadius: "5px",
                  margin: "5px",
                  size:"large",
                  color:"logoutB",
                  variant:"contained",
                  
                }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    style: {
                      color: "black",
                      fontSize: "1.2rem",
                      textDecoration: "none",
                      alignContent: "center",
                    },
                  }}
                  primary="התנתקות"
                />
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
    )}
    </>
  );
  
}
