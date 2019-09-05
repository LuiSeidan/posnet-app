import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { FaPercentage } from "react-icons/fa";
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

function NavbarBank(props) {
  const classes = useStyles();
  return (
    <div className="mb-3">
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => {
              props.discount();
            }}
          >
            Distribuidora Trocadero
          </Typography>
          {props.data && (
            <Button
              color="inherit"
              id="descuentos"
              onClick={() => {
                props.discount();
                props.fetchDiscount();
              }}
            >
              Descuentos
            </Button>
          )}
          {props.data && (
            <Button
              color="inherit"
              onClick={() => {
                props.discount();
                props.fetchDiscount();
              }}
            >
              <FaPercentage id="descuentos-icon" size={22} />
            </Button>
          )}
          <Button
            color="inherit"
            id="menu-principal"
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
            color="inherit"
            id="cerrar-sesion"
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
export default NavbarBank;
