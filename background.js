chrome.runtime.onInstalled.addListener(() => {
  console.log("LinkedIn Salary Display Extension Installed");
});

let previousUrl = ""; // Variable to store the previous URL

// Check if the LinkedIn job URL has changed every 1 seconds (for initial load only)
setInterval(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url) { // Check if the tab and URL are defined
          const currentUrl = tabs[0].url;

          // Check if the current URL is a LinkedIn job page and if it has changed
          if (currentUrl.includes("linkedin.com/jobs/") && currentUrl !== previousUrl) {
              previousUrl = currentUrl; // Update previous URL
              // Send a message to the content script to execute the function
              chrome.tabs.sendMessage(tabs[0].id, { action: "captureSalary" });
          }
      }
  });
}, 1000); // Check every 1 seconds
