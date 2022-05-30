import logo2 from "./img/favicon_2.ico";

import * as React from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";

hljs.registerLanguage("JSON", json);

function App() {
  const [input, setInput] = React.useState("");
  const [jsonObject, setJSONObject] = React.useState("");
  const [validationError, setValidationError] = React.useState("");
  const [output, setOutput] = React.useState("");

  const handleChange = (event) => {
    event.preventDefault();
    const inputJSON = event.target.value;
    setInput(inputJSON);
  };

  const parse = () => {
    if (!validateJSON(input)) {
      // show error message
      console.log("Invalid JSON`");
      return;
    }
    const parsedJSON = JSON.parse(input);
    setOutput(parsedJSON);
    console.log(parsedJSON);
  };

  const jsonSyntaxHighlighting = (code) => {
    const ignoreIllegals = true;
    const highlightJSON = json(code, {
      language: "json",
      ignoreIllegals: ignoreIllegals,
    });
    return highlightJSON.value;
  };

  const validateJSON = (input) => {
    try {
      JSON.parse(input);
    } catch (e) {
      setValidationError(e);
      console.log(e);
      return false;
    }
    return true;
  };

  const parsedOutput = () => {
    if (output) {
      
      return (
        <Grid container item xs={12} justifyContent="center" spacing={3}>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <TextField
                id="outlined-textfield-flow-name"
                label="Flow-Name"
                variant="outlined"
                value={output.name}
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container item xs={12}>
            <Grid item xs={12}>
              <TextField
                id="outlined-textfield-description"
                label="Flow-Description"
                variant="outlined"
                value={output.description}
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container item xs={12}>
            <Grid item>
              <TextField
                id="outlined-textfield-connectorIds"
                label="Connector-IDs"
                variant="outlined"
                value={output.connectorIds.join(", ")}
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                id="outlined-textfield-flowid"
                label="Flow-ID"
                variant="outlined"
                value={output.flowId}
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-textfield-customerid"
                label="Customer-ID"
                variant="outlined"
                value={output.customerId}
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-textfield-currentVersion"
                label="currentVersion"
                variant="outlined"
                value={output.currentVersion}
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-textfield-publishedVersion"
                label="publishedVersion"
                variant="outlined"
                value={output.publishedVersion}
              />
            </Grid>
          </Grid>
        </Grid>
      );
    }
    return <></>;
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
            maxRows={8}
            value={input}
            onChange={handleChange}
          />
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          <Button variant="contained" onClick={parse} size="large">
            Parse!!!
          </Button>
        </Grid>
        {parsedOutput()}
      </Grid>
    </Container>
  );
}

export default App;
