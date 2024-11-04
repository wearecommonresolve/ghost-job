document.getElementById('captureButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "captureSalary" }, (response) => {
            document.getElementById('salaryDetails').textContent = response.salary || "No Salary Details Found";
        });
    });
});
