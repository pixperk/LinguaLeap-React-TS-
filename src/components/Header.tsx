import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const styles={
  color:"white",
  margin:"0.5rem",
  textDecoration:"none",
}

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            LinguaLeap
          </Link>
        </Typography>
        <Button component={Link} to="/" style={styles}>
          Home
        </Button>
        <Button component={Link} to="/login" style={styles}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
