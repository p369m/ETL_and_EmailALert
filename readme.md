## Getting Started

To use the EzyMetrics API, you need to have the following prerequisites:

1. **Node.js**: Ensure that you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
2. **MongoDB**: Have a MongoDB instance running. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud solution or run it locally.
3. **SendGrid Account**: Sign up for a [SendGrid](https://sendgrid.com/) account for email notifications.

### Installation

1. Clone the repository:

   ```bash
   https://github.com/p369m/ETL_and_EmailALert.git
   ```

````

2. Navigate to the project directory:

   ```bash
   cd ETL_and_EmailALert
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables (see [Environment Variables](#environment-variables)).

5. Start the server:

   ```bash
   npm run start
   ```

The server will start, and you can access the API at `http://localhost:3000`.

## API Endpoints

### Leads

#### GET /api/v1/leads/all

Retrieve all leads.

**Response:**

- 200 OK
- 404 Not Found (if no leads are found)

#### POST /api/v1/leads/feed

Create a new lead.

**Request Body:**

```json
{
    "name": "Melissa Munoz",
    "email": "lisaterrell@murphy-dorsey.com",
    "phone": "1234567890",
    "status": "Lost",
    "source": "Instagram"
}
```

**Response:**

- 201 Created
- 400 Bad Request (if validation fails)

### Reports

#### GET /api/v1/leads/elt

Generate a ETL report

#### GET /api/v1/leads/report/csv

Generate a report in CSV format.

#### GET /api/v1/leads/report/pdf

Generate a report in PDF format.

**Response:**

- 200 OK (with report file)

### Email Notifications

For now if more than 3 leads are lost than Email Notification is sent

## Error Handling

All API responses will include an appropriate status code and a message. Common error codes include:

- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Environment Variables

To run the application, you need to set the following environment variables in your `.env` file:

```plaintext
MONGO_URI=mongodb://localhost:27017/ezyMetrics
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_RECEIVER=your_email@example.com
```

## Testing the API

You can use tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to test the API endpoints.

````
