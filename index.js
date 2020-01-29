// Easy to use HTTP request library
const axios = require('axios');

// Get URL to target from an environment variable, using Google as a fallback
const targetURL = process.env.TARGET_URL || "https://google.com/"

async function test() {
  // Add a 30s delay
  if (process.env.SLEEPY) {
    await new Promise(r => setTimeout(r, 30000));
  }
  try {
    console.log(`Testing ${targetURL}...`)
    // Make an HTTP request to the target URL
    await axios.get(targetURL);
    console.log("Test passed!")
    // If we reach this point, we got an OK response and can return 0 (success)
    process.exit(0)
  } catch (err) {
    // The status of the response was not in the OK range (200).
    if (err.response && err.response.status && (err.response.status < 200 || err.response.status > 299)) {
      console.log(`Response code out of expected range: ${err.response.status}`)
    // Something else bad happened...
    } else {
      console.log(err.message)
    }
    console.log('Test failed!')
    // If we reach this point, we did not get an OK response and need to return 1 (failure)
    process.exit(1)
  }
}

// Sleep for 5 minutes if PORT is set
// This will allow the Akkeris release to be successful
if (process.env.PORT) {
  setTimeout(() => console.log('Sleepy'), 300000)
}

// If FAIL is set, immediately fail. 
// This is useful for testing.
if (process.env.FAIL) {
  process.exit(1);
}

test();
