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

import * as _ from "lodash";

hljs.registerLanguage("JSON", json);

function App() {
  const [input, setInput] = React.useState("");
  const [jsonObject, setJSONObject] = React.useState("");
  const [validationError, setValidationError] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [nodes, setNodes] = React.useState("");
  const [numOfNodes, setNumOfNodes] = React.useState("");
  const [edges, setEdges] = React.useState("");
  const [numOfEdges, setNumOfEdges] = React.useState("");
  const [nodeTypesCount, setNodeTypesCount] = React.useState(0);
  const [nodeStatusCount, setNodeStatusCount] = React.useState({});
  const [nodeCapabilities, setNodeCapabilities] = React.useState({});
  const [nodeTypes, setNodeTypes] = React.useState({});
  const [types, setTypes] = React.useState({});

  const handleChange = (event) => {
    event.preventDefault();
    const inputJSON = event.target.value;
    setInput(inputJSON);
  };

  const parse = () => {
    const parsedJSON = validateJSON(input);
    if (!parsedJSON) {
      // show error message
      console.log("Invalid JSON");
      return;
    }

    const parsedNodes = gatherNodes(parsedJSON);
    setNodes(parsedNodes);

    const parsedEdges = gatherEdges(parsedJSON);
    setNodes(parsedEdges);

    getNodeInfo(parsedNodes, parsedEdges);
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
      const parsedJSON = JSON.parse(input);
      setOutput("parsedJSON");
      setOutput(parsedJSON);
      console.log(parsedJSON);
      return parsedJSON;
    } catch (e) {
      setValidationError(e);
      console.log(e);
      return null;
    }
  };

  const gatherNodes = (parsedJSON) => {
    const graphData = parsedJSON.graphData;
    const elements = graphData.elements;
    const parsedNodes = elements.nodes;

    const numberOfNodes = parsedNodes.length;
    setNumOfNodes(numberOfNodes);

    setNodes(parsedNodes);
    return parsedNodes;
  };

  const getNodeInfo = (nodes, edges) => {
    const nodeTypeCount = {};
    const nodeStatusCount = {};
    const nodeCapability = {};

    nodes.forEach((node) => {
      // Count number of node types
      const nodeType = node.data.nodeType;
      if (!nodeTypeCount[nodeType]) {
        nodeTypeCount[nodeType] = 1;
      } else {
        nodeTypeCount[nodeType] = ++nodeTypeCount[nodeType];
      }
      if (nodeType === "CONNECTION") {
      }
      setNodeTypes(nodeTypeCount);

      // Count number of configured nodes
      const status = node.data.status;
      if (!nodeStatusCount[status]) {
        nodeStatusCount[status] = 1;
      } else {
        nodeStatusCount[status] = ++nodeStatusCount[status];
      }
      setNodeStatusCount(nodeStatusCount);

      // Count number of capabilities
      const cap = node.data.capabilityName;
      if (!nodeCapability[cap]) {
        nodeCapability[cap] = 1;
      } else {
        nodeCapability[cap] = ++nodeCapability[cap];
      }
      setNodeCapabilities(nodeCapability);
    });
  };

  const gatherEdges = (parsedJSON) => {
    const graphData = parsedJSON.graphData;
    const elements = graphData.elements;
    const parsedEdges = elements.edges;

    const numberOfEdges = parsedEdges.length;
    setNumOfEdges(numberOfEdges);
    return parsedEdges;
  };

  const nodeStatusesElement = () => {
    if (nodeStatusCount && Object.entries(nodeStatusCount).length > 0) {
      const statuses = [];

      for (const [key, value] of Object.entries(nodeStatusCount)) {
        statuses.push(
          <Grid
            item
            id={"grid-status-" + _.lowerCase(key)}
            key={_.lowerCase(key)}
          >
            <TextField
              id={"outlined-textfield-node-statuses-" + +_.lowerCase(key)}
              label={"Status-" + _.capitalize(key)}
              variant="outlined"
              value={value}
              fullWidth
            />
          </Grid>
        );
      }

      return (
        <Grid container item xs={12} spacing={3}>
          {statuses}
        </Grid>
      );
    }
    return <></>;
  };

  const nodeTypesElement = () => {
    if (nodeTypes && Object.entries(nodeTypes).length > 0) {
      const types = [];

      for (const [key, value] of Object.entries(nodeTypes)) {
        types.push(
          <Grid
            item
            id={"grid-type-" + _.lowerCase(key)}
            key={_.lowerCase(key)}
          >
            <TextField
              id={"outlined-textfield-node-types-" + _.lowerCase(key)}
              label={"Types-" + _.capitalize(key)}
              variant="outlined"
              value={value}
              fullWidth
            />
          </Grid>
        );
      }

      return (
        <Grid container item xs={12} spacing={3}>
          {types}
        </Grid>
      );
    }

    return <></>;
  };

  const nodeCapabilitiesElement = () => {
    if (nodeCapabilities && Object.entries(nodeCapabilities).length > 0) {
      const caps = [];

      for (const [key, value] of Object.entries(nodeCapabilities)) {
        caps.push(
          <Grid
            item
            id={"grid-type-" + _.lowerCase(key)}
            key={_.lowerCase(key)}
          >
            <TextField
              id={"outlined-textfield-node-capabilities-" + _.lowerCase(key)}
              label={"Capability-" + _.capitalize(key)}
              variant="outlined"
              value={value}
              fullWidth
            />
          </Grid>
        );
      }

      return (
        <Grid container item xs={12} spacing={3}>
          {caps}
        </Grid>
      );
    }

    return <></>;
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

          <Grid container item xs={12} spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="outlined-textfield-connectorIds"
                label="Connector-IDs"
                variant="outlined"
                value={output.connectorIds.join(", ")}
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container item xs={12} spacing={3}>
            <Grid item xs="6" s="4" m="3">
              <TextField
                id="outlined-textfield-flowid"
                label="Flow-ID"
                variant="outlined"
                value={output.flowId}
                fullWidth
              />
            </Grid>
            <Grid item xs="6" s="4" m="3">
              <TextField
                id="outlined-textfield-customerid"
                label="Customer-ID"
                variant="outlined"
                value={output.customerId}
                fullWidth
              />
            </Grid>
            <Grid item xs="6" s="4" m="3">
              <TextField
                id="outlined-textfield-currentVersion"
                label="Current-Version"
                variant="outlined"
                value={output.currentVersion}
                fullWidth
              />
            </Grid>
            <Grid item xs="6" s="4" m="3">
              <TextField
                id="outlined-textfield-publishedVersion"
                label="Published-Version"
                variant="outlined"
                value={output.publishedVersion || "null"}
                fullWidth
              />
            </Grid>
            <Grid item xs="6" s="4" m="3">
              <TextField
                id="outlined-textfield-publishedVersion"
                label="Input-Schema"
                variant="outlined"
                value={output.inputSchema || "null"}
                fullWidth
              />
            </Grid>

            {nodeCapabilitiesElement()}

            {nodeTypesElement()}

            {nodeStatusesElement()}
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
        pb="10vh"
      >
        <Grid container item xs={12} justifyContent="center">
          <Avatar alt="PingOne DaVinci" src={logo2} />
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          <Grid container item xs={12} justifyContent="center">
            <Typography variant="h6" component="div" gutterBottom>
              PingOne DaVinci Flowz
            </Typography>
          </Grid>

          <Grid container item xs={12} justifyContent="center">
            <Typography variant="subtitle1" component="div" gutterBottom>
              JSON Export Visualizer
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          <TextField
            id="outlined-textfield-input"
            label="JSON Input"
            variant="outlined"
            multiline
            fullWidth
            maxRows={6}
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
