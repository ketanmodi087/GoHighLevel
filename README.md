# GHL Integration API

Node.js,Express, MongoDB and API integration with Go High Level (GHL) services.

## Table of Contents
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
  - [Authentication Endpoints](#authentication-endpoints)
  - [API Endpoints](#api-endpoints-1)
- [Testing the API](#testing-the-api)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Go High Level API credentials

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GoHighLevel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a .env file**
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/ghl-integration
   GHL_CLIENT_ID=your_ghl_client_id
   GHL_CLIENT_SECRET=your_ghl_client_secret
   GHL_REDIRECT_URI=http://localhost:3000/auth/callback
   ```
   .env.example file is added for reference

4. **Start the server**

  For development with auto-restart:
   ```bash
   npm run dev
   ```

   For the prodcution version


   ```bash
   npm run build
   ```
   ```bash
   npm run start
   ```
   
  

5. **Verify the server is running**
   Open your browser and navigate to `http://localhost:3000`. You should see the message "GHL Integration API is running".

## API Endpoints

### Authentication Endpoints

These endpoints handle authentication with the Go High Level API.

#### 1. Initiate OAuth Flow
- **Endpoint**: `GET /auth/authorize`
- **Description**: Redirects to GHL authorization page
- **URL for Browser**:
  ```bash
  http://localhost:3000/auth/authorize
  ```
  Please copy paste this url in browser and it will redirect to **GHL authorization page** and after approved it will recirect us to callback page with token


#### 2. OAuth Callback
- **Endpoint**: `GET /auth/callback`
- **Description**: Handles the callback from GHL after authorization and it will show respose something like below
{
  "message": "Authorization successful",
  "tokenId": "tokenId string",
  "expiresAt": "expire date",
  "userId": "user is string"
}
- **Note**: This is automatically called by GHL after authorization 

#### 3. Refresh Token
- **Endpoint**: `POST /tokens/:userId/refresh`
- **Description**: Refreshes an expired access token
- **Test Command**:
  ```bash
  curl --location --request POST 'http://localhost:3000/api/tokens/:userId/refresh' 
  --header 'Content-Type: application/json'
   ```

### API Endpoints

These endpoints interact with the Go High Level API.

#### 1. Get Contacts
- **Endpoint**: `GET /api/contacts/:userId`
- **Description**: Retrieves contacts from GHL
- **Test Command**:
  ```bash
  curl --location 'http://localhost:3000/api/contacts/:userId'
  ```

#### 2. Get Opportunities
- **Endpoint**: `GET /api/opportunities/:userId`
- **Description**: Retrieves opportunities from GHL
- **Test Command**:
  ```bash
  curl --location 'http://localhost:3000/api/opportunities/:userId'
  ```

#### 3. Get Users
- **Endpoint**: `GET /api/users/:userId`
- **Description**: Retrieves users from GHL
- **Curl**:
  ```bash
  curl --location 'http://localhost:3000/api/users/:userId'
  ```

#### 4. Get Calendars
- **Endpoint**: `GET /api/calendars/:userId`
- **Description**: Retrieves calendars from GHL
- **Curl**:
  ```bash
  curl --location 'http://localhost:3000/api/calendars/:userId'
  ```

#### 5. Get Associations
- **Endpoint**: `GET /api/associations/:userId`
- **Description**: Retrieves associations from GHL
- **Curl**:
  ```bash
  curl --location 'http://localhost:3000/api/associations/:userId'
  ```

## Project Structure 
```
├── src/
│ ├── index.ts # Entry point
│ ├── routes/
│ │ ├── auth.ts # Authentication routes
│ │ └── api.ts # API routes
│ ├── services/
│ │ ├── ghlService.ts # GHL API service
│ │ └── apiService.ts # Internal API service
│ ├── utils/
│ │ ├── dbconnection.ts # Database
│ │ ├── middleware.ts # Express middleware
│ │ └── constants.ts # Constants and config
│ └── models/
│ └── Token.ts # Token model
├── .env # Environment variables
├── package.json # Dependencies
└── tsconfig.json # TypeScript configuration

```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Port for the Express server | 3000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/ghl-integration |
| GHL_CLIENT_ID | GHL OAuth client ID | your_client_id |
| GHL_CLIENT_SECRET | GHL OAuth client secret | your_client_secret |
| GHL_REDIRECT_URI | OAuth callback URL | http://localhost:3000/auth/callback |
