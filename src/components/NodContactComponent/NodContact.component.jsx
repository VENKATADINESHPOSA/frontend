import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import React from "react";
import "./NodContact.styles.scss";

const NodContactComponent = () => {
  return (
    <div style={{ marginTop: "180px" }}>
      <Typography
        gutterBottom
        variant="h4"
        align="center"
        style={{ paddingTop: "20px", color: "#0c629f", fontWeight: "bold" }}
      >
        Contact Us
      </Typography>
      <Card
        style={{ maxWidth: "500px", margin: "20px auto", padding: "20px 5px" }}
      >
        <CardContent>
          <form>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <TextField
                  label="First Name"
                  placeholder="Enter your first name"
                  variant="outlined"
                  fullWidth
                  required
                  classes={{ borderBottom: "0px" }}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField
                  label="Last Name"
                  placeholder="Enter your Last Name"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  label="Phone Number"
                  type="number"
                  placeholder="Enter your phone number"
                  variant="outlined"
                  fullWidth
                  required
                  disableUnderline={true}
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  label="Message"
                  placeholder="Type your message here."
                  variant="outlined"
                  fullWidth
                  required
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid xs={12} item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NodContactComponent;
