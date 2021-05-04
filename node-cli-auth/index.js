const axios = require("axios").default;
const { machineIdSync } = require("node-machine-id");
const hwid = machineIdSync();

const API_KEY = "";

// Update metadata
const update = async (license) => {
  axios({
    method: "PATCH",
    url: `https://api.hyper.co/v4/licenses/${license}`,
    data: JSON.stringify({
      metadata: { hwid: hwid },
    }),
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  })
    .then(() => console.log("metadata updated"))
    .catch(() => console.log("error updating metadata"));
};

// Login (binds to machine)
const login = (license) => {
  axios({
    method: "GET",
    url: `https://api.hyper.co/v4/licenses/${license}`,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  })
    .then((response) => {
      let licenseData = response.data;
      if (
        licenseData.metadata?.hwid !== hwid &&
        licenseData.metadata?.hwid !== void 0
      ) {
        console.log("active on another machine");
      } else {
        licenseData.metadata?.hwid ?? update(license);
        console.log("successful login");
      }
    })
    .catch(() => console.log("invalid license"));
};

// Logout (unbinds from machine)
const logout = (license) => {
  axios({
    method: "PATCH",
    url: `https://api.hyper.co/v4/licenses/${license}`,
    data: {
      metadata: null,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  })
    .then(() => console.log("logged out"))
    .catch(() => console.log("error resetting metadata"));
};

// API_KEY required line: 5

// login("ABCD-ABCD-ABCD-ABCD");
// logout("ABCD-ABCD-ABCD-ABCD");
