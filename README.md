# Job Application Helper - Fight Against Ghost Jobs

### Introduction

Applying for jobs on platforms like LinkedIn can be frustrating and inefficient. Often, you’re left wondering if you’ll ever hear back. The process becomes even more painful with job postings that lack transparency—listings without salaries, outdated postings that are months old, or even positions that have already been filled.

To address this, we’ve developed a browser extension that simplifies your job search experience. Available now on the [Chrome Web Store](https://chromewebstore.google.com/detail/common-resolve/hemkacfkmhldlhpfndjfibkalfphiibf), our tool helps you assess if a job is worth applying to by showing the likelihood that it’s a "ghost job" (an inactive or filler post). The plugin calculates a "ghost job" likelihood percentage based on different metrics so you can quickly see if it’s a genuine opportunity.

Our mission with this repository is to provide a collaborative foundation where contributors can implement their own ghost job identification metrics and work together to make it illegal for companies to post misleading job listings.

**Together, We Win!**

---

### Implemented Metrics for Ghost Job Identification:

- **Mention of Salary in Job Posting** – A transparent salary range helps determine if a listing is credible.
- **Age of the Job Posting** – Older listings may indicate a filled position or a lack of urgency from the hiring company.
- **Reposted Frequency** – Tracks if the job has been reposted multiple times, which could signal an inactive or ghost listing.

### Current Status:
- [x] **Buzzword detection** ✅
- [ ] **Vague job description** ⏳

### Future Plans

- **Extend the Extension to Different Browsers**
  - Support for Firefox
  - Support for Safari

- **Add New Ghost Job Identification Metrics**
  - Check if the job is available on the company’s official website.
  - Evaluate the company’s reputation and credibility.
  - Review the hiring history of the company.
  - Monitor recent layoffs within the company.
  - Collect employee reviews from platforms like Glassdoor.

---
### Bug Reports and Feedback

To report any bugs, please **raise an issue on GitHub**.  
For suggestions or feedback, feel free to reach out to us at **[hello@wearecommonresolve.com](mailto:hello@wearecommonresolve.com)**.

### Getting Started with Local Development

To run this extension locally, follow these steps:

1. **Clone the Repository**  
   Clone this GitHub repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/job-application-helper.git
2. **Navigate to the Extension Folder**
   Go into the extension’s directory:
   ```bash
   cd job-application-helper
3. **Install Dependencies (if applicable)**
   If the project has dependencies, install them (otherwise, skip this step):
   ```bash
   npm install
4. **Load the Extension in Chrome**
    1. Open Chrome and go to `chrome://extensions/`.
    2. Enable **Developer mode** (toggle in the top-right corner).
    3. Click **Load unpacked** and select the cloned repository folder.
5. **Run the Extension**
   The extension should now be loaded in Chrome and ready to test.
6. **Make Changes and Reload**
   During development, make changes to the code and refresh the extension from `chrome://extensions/` to see updates.

### Demo of the Extension

https://github.com/user-attachments/assets/5ff8c96e-a497-4613-9ae7-3b0e47d4755e










   
