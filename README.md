# Payment Engine

## Overview

This project implements a payment engine for processing transaction statuses in a financial application. It handles various transaction states, provides real-time updates, and ensures data integrity and security.

## Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/payment-engine.git
```

2. Install dependencies:

```bash
cd payment-engine
npm install
```

3. Rename the `.env.example` file to `.env` and update the environment variables:

4. Start the server:

```bash
npm start
```

## Usage

Create a transaction:
Send a POST request to /transactions endpoint with transaction data in the request body.

Update transaction status:
Use the provided endpoints or services to update transaction status and trigger real-time updates via webhooks.

## Testing

To run unit tests, execute the following command:

```bash
npm test
```
