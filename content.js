// Function to capture salary details from the button element
function captureSalaryDetails() {
    analyzeJobPostings();
}

// Function to check if the job contains a dollar sign ($)
function containsSalary(text) {
    return text.includes('$');
}

function analyzeJobPostings() {
    // Select the <p> tag that contains the job details
    let jobDetailsElement = document.querySelector('.jobs-description-content__text p');
    let jobDetailsText = jobDetailsElement ? (jobDetailsElement.innerText || jobDetailsElement.textContent) : '';

    // Select the job age information
    let jobAgeElement = document.querySelector('.job-details-jobs-unified-top-card__primary-description-container .t-black--light');
    let jobAgeText = jobAgeElement ? (jobAgeElement.innerText || jobAgeElement.textContent) : '';

    let salaryButtonElement = document.querySelector('.job-details-preferences-and-skills');
    let salaryText = salaryButtonElement ? salaryButtonElement.innerText || salaryButtonElement.textContent : "";
    console.log('salaryText: ', salaryText);

    // Check if job has a salary
    const hasSalary = containsSalary(jobDetailsText) || containsSalary(salaryText);

    // Check for "Reposted" in all <div> elements inside the primary description container
    let isReposted = false;
    const descriptionContainer = document.querySelector('.job-details-jobs-unified-top-card__primary-description-container');
    if (descriptionContainer) {
        const allDivs = descriptionContainer.querySelectorAll('div');
        allDivs.forEach(div => {
            const divText = div.innerText || div.textContent;
            if (divText && divText.includes('Reposted')) {
                isReposted = true;
            }
        });
    }

    if (isReposted) {
        console.log("Job has been reposted - Flagging as ghost job.");
    }

    // Check job age and calculate final score
    const ageScore = evaluateJobAge(jobAgeText);
    const score = calculateScore(hasSalary, isReposted, ageScore);
    addGhostJobButton(score);
}

// Function to evaluate job age
function evaluateJobAge(jobAgeText) {
    const regex = /(\d+)\s+(years?|months?|weeks?|days?)/;
    const match = jobAgeText.match(regex);

    if (match) {
        const num = parseInt(match[1], 10);
        const unit = match[2].toLowerCase();

        // Check for years
        if (unit.startsWith('year') && num > 0) {
            return 30; // More than 1 year (considering any number of years as over 2 months)
        } else if (unit.startsWith('month') && num > 2) {
            return 30; // More than 2 months
        } else if (unit.startsWith('week') && num >= 8) {
            return 30; // 8 weeks is approximately 2 months
        }
    }
    return 0; // Not older than 2 months
}

// Function to calculate the final score based on weighted conditions
function calculateScore(hasSalary, isReposted, ageScore) {
    let score = 0;

    // Define weights
    const salaryWeight = 0.6;
    const repostedWeight = 0.3;
    const ageWeight = 0.1;

    // If no salary, assign a score between 55 and 69, then apply weight
    if (!hasSalary) {
        const noSalaryScore = Math.floor(Math.random() * (69 - 55 + 1)) + 55;
        score += noSalaryScore * salaryWeight;
    }

    // If reposted, assign a score between 15 and 19, then apply weight
    if (isReposted) {
        const repostedScore = Math.floor(Math.random() * (19 - 15 + 1)) + 15;
        score += repostedScore * repostedWeight;
    }

    // If job age is greater than 2 months, assign a score between 25 and 29, then apply weight
    if (ageScore > 0) {
        const ageScoreValue = Math.floor(Math.random() * (29 - 25 + 1)) + 25;
        score += ageScoreValue * ageWeight;
    }

    // Round score to one decimal place
    return Math.round(score * 10) / 10;
}


// Add ghost job button function
function addGhostJobButton(score) {
    // Remove existing ghost job button if it exists
    const existingButton = document.querySelector('.ghost-button');
    if (existingButton) {
        existingButton.remove();
    }

    if (score == 0) {
        return;
    }

    // Create a new button element with score
    let ghostJobButton = document.createElement('button');
    ghostJobButton.textContent = `Ghost Job (${score}%)`;
    ghostJobButton.style.backgroundColor = 'red';
    ghostJobButton.style.color = 'white';
    ghostJobButton.style.marginLeft = '10px';
    ghostJobButton.className = 'ghost-button artdeco-button artdeco-button--primary';

    // Append button to the job details section
    const targetDiv = document.querySelector('.t-24.job-details-jobs-unified-top-card__job-title');
    if (targetDiv) {
        targetDiv.appendChild(ghostJobButton);
    }
}

// Listen for changes in the job details section
const jobDetailsContainer = document.querySelector('.job-details-jobs-unified-top-card__primary-description-container');
if (jobDetailsContainer) {
    const observer = new MutationObserver(() => {
        // Re-evaluate job posting when changes are detected
        analyzeJobPostings();
    });
    observer.observe(jobDetailsContainer, { childList: true, subtree: true });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "captureSalary") {
        captureSalaryDetails();
        sendResponse({ salary: true });
    }
});
