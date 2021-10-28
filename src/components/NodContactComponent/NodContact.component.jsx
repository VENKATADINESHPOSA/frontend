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
                <div className="form-div">
                  <input
                    type="text"
                    name="first-name"
                    required
                    autoComplete="off"
                  />
                  <label for="first-name" className="label-name">
                    <span className="content-name">First Name</span>
                  </label>
                </div>
              </Grid>
              <Grid xs={12} sm={6} item>
                <div className="form-div">
                  <input
                    type="text"
                    name="last-name"
                    required
                    autoComplete="off"
                  />
                  <label for="last-name" className="label-name">
                    <span className="content-name">Last Name</span>
                  </label>
                </div>
              </Grid>
              <Grid xs={12} item>
                <div className="form-div">
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="off"
                  />
                  <label for="email" className="label-name">
                    <span className="content-name">Email</span>
                  </label>
                </div>
              </Grid>
              <Grid xs={12} item>
                <div className="form-div">
                  <input
                    type="number"
                    name="phone-number"
                    required
                    autoComplete="off"
                  />
                  <label for="phone-number" className="label-name">
                    <span className="content-name">Phone Number</span>
                  </label>
                </div>
              </Grid>
              <Grid xs={12} item>
                <div>
                  <label for="message">Message:</label>
                  <textarea
                    rows="4"
                    name="message"
                    required
                    autoComplete="off"
                    style={{ outlineColor: "#5fa8d3" }}
                  ></textarea>
                </div>
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
