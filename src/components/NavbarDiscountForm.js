import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { IoIosHome, IoIosLogOut } from "react-icons/io";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 3
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function NavbarDiscountForm(props) {
  const classes = useStyles();
  return (
    <div className="mb-3">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Distribuidora Trocadero
          </Typography>

          <Button
            id="menu-principal"
            color="inherit"
            onClick={() => {
              window.location.reload();
              props.backMainPage();
            }}
          >
            Menu Principal
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              window.location.reload();
              props.backMainPage();
            }}
          >
            <IoIosHome id="casa-icon" size={22} />
          </Button>
          <Button
            id="cerrar-sesion"
            color="inherit"
            onClick={props.handleLogout}
          >
            Cerrar Sesion
          </Button>
          <Button color="inherit">
            <IoIosLogOut
              id="logout-icon"
              onClick={props.handleLogout}
              size={22}
            />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default NavbarDiscountForm;
