# Liminal Network Space Client

## Important Note

Make sure that before running the client side to run the server because the constant for the API will be `const SERVER_URL = 'http://localhost:3000'`

So first download the server repo and make sure to run that.

## Prerequisites

* Node.js (v16.0.0 or newer)
* npm or yarn

## Installation and Setup

### 1. Clone or Download the Repository

```bash
git clone [repository-url]
# or download and extract the ZIP file
```

### 2. Install Dependencies

Navigate to the project directory and install dependencies:

```bash
cd liminal-network-client
npm install
# or
yarn install
```

### 3. Configure Server Connection

Open `components/LiminalNetwork.jsx` and locate the SERVER_URL constant:

```javascript
const SERVER_URL = 'http://localhost:3000'; // Replace with server IP if needed
```

If running the server on a different machine or port, update this URL accordingly.

### 4. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:3001 (or another port if 3001 is in use).

## Usage

1. Open the application in a web browser
2. Click the "Initiate Connection Request" button
3. Observe the cockroach moving in circles during the loading state
4. The server will respond with a random HTTP status after a random delay
5. If auto-retry is enabled, non-success responses will trigger automatic retries
