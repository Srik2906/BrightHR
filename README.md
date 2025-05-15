# BrightHR Playwright E2E Tests

This project contains end-to-end (E2E) tests for the BrightHR application, built using Playwright.

## Overview

The tests cover key functionalities of the BrightHR application, focusing on the employee management module. They utilize the Page Object Model for better organization and maintainability.

## Project Structure

```
├── .github/workflows/main.yml     # GitHub Actions workflow for CI/CD
├── page-objects/                  # Page Object Model for modular test structure
│   ├── BasePage.js                # Base class with common page interactions
│   ├── EmployeePage.js            # Page object for the Employee section
│   └── LoginPage.js               # Page object for the Login page
├── tests/
│   └── employee.spec.js           # Test suite for employee management features
├── utils/
│   ├── datePicker.js              # Utility function for date selection
│   └── logger.js                  # Utility functions for logging test steps
├── .env.sample                    # Example environment variable file
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.js           # Playwright configuration file
└── README.md                      # This file
```


## Technologies Used

* **Playwright:** A Node.js library by Microsoft for reliable cross-browser end-to-end testing.
* **Node.js:** JavaScript runtime environment.
* **npm:** Node Package Manager for managing project dependencies.
* **dotenv:** A zero-dependency module that loads environment variables from a `.env` file.
* **@faker-js/faker:** A library to generate fake data for testing purposes.
* **GitHub Actions:** A CI/CD platform to automate the testing workflow.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install Node.js dependencies:**
    Ensure you have Node.js and npm installed on your system. Then run:
    ```bash
    npm ci
    ```

3.  **Install Playwright browsers:**
    ```bash
    npx playwright install --with-deps
    ```

4.  **Configure environment variables:**
    Create a `.env` file in the root directory based on the `.env.sample` file and provide your BrightHR login credentials:
    ```
    EMAIL=your_email@example.com
    PASSWORD=your_password
    ```

## Running Tests Locally

You can run the tests using the following npm script:

```bash
npm test
```

## Manually Triggering the CI Workflow (for Reviewers)

The Continuous Integration (CI) workflow is configured in `.github/workflows/main.yml`. Here's how you can manually trigger it for review purposes:

1.  **Navigate to the GitHub repository:** Open the BrightHR Playwright E2E Tests repository in your web browser.

2.  **Go to the "Actions" tab:** Click on the "Actions" tab located at the top of the repository page (between "Pull requests" and "Projects").

3.  **Find the "Playwright Tests" workflow:** In the left sidebar, under the "Workflows" section, you should see a workflow named "Playwright Tests". Click on it.

4.  **Trigger the workflow manually:** On the right side of the page, you will see a button labeled "Run workflow". Click this button.

5.  **Confirm and run:** A dropdown might appear asking you to confirm the branch to run the workflow on. Typically, you'll want to select the `main` branch (or the specific branch you are reviewing). Click the green "Run workflow" button to start the CI process.

6.  **Monitor the workflow:** You will be redirected to the workflow run page where you can see the progress of each job (e.g., "Checkout code", "Run Playwright tests"). You can click on each job to view its detailed output and logs.

7.  **Review the results:** Once the workflow completes, you can check if all the tests passed or if there were any failures. If the "Upload Playwright Report" step was successful, you will find the test report as an artifact on the workflow run page, which you can download and inspect.

This manual trigger allows reviewers to independently verify the test suite and its results without needing to push new code to the repository.

```
```