import * as React from "react";
import logo2 from "./img/favicon_2.ico";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import prettyjson from "prettyjson";

function App() {
  const [input, setInput] = React.useState("");
  const [jsonObject, setJSONObject] = React.useState("");
  const [validationError, setValidationError] = React.useState("");
  const [output, setOutput] = React.useState("");

  const handleChange = (event) => {
    event.preventDefault();
    const inputJSON = event.target.value;
    setInput(inputJSON);
    parse(inputJSON);
  };

  const parse = () => {
    if (!validateJSON(input)) {
      // show error message
      return;
    }
    setOutput('{node: "flow connector"}');
  };

  const validateJSON = (input) => {
    try {
      const inputJSONObject = JSON.parse(input);
      setJSONObject(inputJSONObject);
      console.log(inputJSONObject);
    } catch (e) {
      setValidationError(e);
      console.log(e);
      return false;
    }
    return true;
  };

  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid container item xs={12} justifyContent="center">
          <Avatar alt="PingOne DaVinci" src={logo2} />
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          <Typography variant="h1" component="div" gutterBottom>
            PingOne DaVinci Flows
          </Typography>
          <Typography variant="h3" component="div" gutterBottom>
            JSON Export Visualizer
          </Typography>
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          <TextField
            id="outlined-textfield-input"
            label="JSON Input"
            variant="outlined"
            multiline
            fullWidth
            rowsMax={4}
            value={input}
            onChange={handleChange}
          />
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          <Button variant="contained" onClick={parse} size="large">
            Parse!!!
          </Button>
        </Grid>
        if(output)
        {
          <Grid container item xs={12} justifyContent="center">
            <Grid item xs={6}>
              <TextField
                id="outlined-textfield-flowid"
                label="flowid"
                variant="outlined"
                value={output.flowid}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-textfield-customerid"
                label="customerid"
                variant="outlined"
                fullWidth
                value={output.customerid}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-textfield-currentVersion"
                label="currentVersion"
                variant="outlined"
                fullWidth
                value={output.currentVersion}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-textfield-publishedVersion"
                label="publishedVersion"
                variant="outlined"
                fullWidth
                value={output.publishedVersion}
              />
            </Grid>
          </Grid>
        }
      </Grid>
    </Container>
  );
}

export default App;
