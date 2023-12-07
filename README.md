# Founders List Application

## Introduction

The 'founders_list' application is designed to automate the process of gathering information about the newest startups from Y Combinator's company list. It retrieves the latest two batches of companies, uses the Hunter.io API to find email information for each company, and saves the collected data into a CSV file for easy access and analysis.

## Setup Instructions

### Prerequisites

- Node.js (v10.0 or higher)
- npm (v6.0 or higher)
- An API key from Hunter.io

### Installation

1. Clone the repository to your local machine:

    ```
    git clone https://github.com/example/founders_list.git
    ```

2. Navigate to the cloned directory:

    ```
    cd founders_list
    ```

3. Install the necessary npm packages:

    ```
    npm install
    ```

4. Create and configure your `.env` file in the root directory with your Hunter.io API key:

    ```
    HUNTER_API_KEY=your_api_key_here // INPUT_REQUIRED {Provide your actual Hunter.io API key}
    ```

### Running the Application

To start the application, run the following command:

```
npm start
```

This will initiate a cron job which executes the data retrieval and email lookup process at scheduled intervals.

## Usage Guide with Examples

This application runs autonomously once started. However, you can trigger the scraping and email retrieval process manually by running the `main.js` script:

```
node src/main.js
```

Upon execution, the script will:

- Scrape the latest two batches of companies from Y Combinator.
- Retrieve email information for each company using Hunter.io's API.
- Save the acquired data into a CSV file named `companies.csv` in the current directory.

**Example of the CSV output:**

```csv
Batch,Name,Description,Email,First Name,Last Name
W24,Retell AI,Helping AI speak like humans,neville.bird@retell.co.uk,Neville,Bird
...
```

## Application Functionality

The 'founders_list' application consists of the following modules:

- A scraper (`src/scrapeWithPuppeteer.js`) that navigates to the specified Y Combinator URL, retrieves company data, and parses it using Cheerio and Puppeteer.
- An email finder (`src/hunterApi.js`) that queries the Hunter.io API to find email contact information for each company.
- A CSV writer (`src/utils/csvUtils.js`) that formats the retrieved information into a CSV file.

For advanced usage and understanding of the internal mechanisms of the application, developers may refer to the following files:

- `src/cronScheduler.js`: To understand how the application's tasks are scheduled.
- `src/scrapeWithPuppeteer.js` and `src/scraper.js`: To dive into the web scraping logic.
- `src/hunterApi.js`: For email retrieval process.
- `src/utils/csvUtils.js`: For CSV file generation logic.

## Troubleshooting

Refer to the [Troubleshooting section](#troubleshooting) for guidance on common issues.

## Contributing

Contributions to the 'founders_list' application are welcome. Please refer to the individual files mentioned in the application functionality section for the related code. Ensure you follow the project's coding standards and guidelines.

---

### Troubleshooting

In case of encountering errors during the use of the application, please refer to the application logs located at `logs/app.log`. Common errors might include:

- **HTTP Errors when accessing the Hunter.io API**: These can be due to rate limiting, incorrect API key, or connectivity issues. Check your `.env` file for correct credentials and ensure you are within API usage limits.

- **Web Scraping Errors**: Incorrect or updated DOM structures on the Y Combinator website may cause the scraper to fail. Check the selectors used in `src/scrapeWithPuppeteer.js` for accuracy.

Refer to `src/utils/logger.js` for the logging mechanism and `logs/app.log` for a record of errors and operations.
