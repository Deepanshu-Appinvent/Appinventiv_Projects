# Bus_Management_System

KoaJS API Documentation
This document provides detailed documentation for the APIs provided by the Bus Management System. These APIs are designed for efficient management and monitoring of bus routes, buses, and user interactions. The system is designed to be accessed by two main user roles Admin and Driver


Table of Contents

Authentication

Base URL

Error Handling

Admin API Endpoints
Admin Sign-Up API
Choose Login Method API
Admin Login API
Generate OTP for Admin API
Check OTP for Admin Password Reset API
Admin Logout API

Driver API Endpoints
Add Driver API
Driver Login API
Get List of Drivers API
Delete Driver API
Driver Logout API

Bus API Endpoints
Add Bus API
Assign Bus to Driver API
Assign Bus to Route API
Get List of Buses API
Get Bus Details API
Get Assigned Bus Details API
Delete Bus API

Route API Endpoints
Add Route API
Get List of Routes API
Get Route Details API
Delete Route API

Journey API Endpoints
Start Journey API
End Journey API
Mark Stoppage API
Get Journey Details API
Delete Journey API

Google API Endpoints
Calculate Distance API
Fetch Weather API

Authentication
Authentication is required for accessing protected routes. The following methods are available for authentication:
Admin Authentication
Method: Token-Based Authentication
How to Authenticate
To authenticate as an admin, you need to include a valid JWT (JSON Web Token) in the Authorization header of your HTTP request. The token should be in the format: Bearer token, where the token is the JWT token.
ome-protected-endpoint
Token Verification
The server verifies the token's authenticity using the provided secret key and checks if the token is valid. If the token is valid and the role is set to "admin," you will be granted access to protected admin endpoints.
Session Management
Additionally, the system manages admin sessions using Redis. If the session is still active, the request proceeds. Otherwise, you will receive a "Session expired / Admin logged out" message.
Base URL
The base URL for all API endpoints is: http://localhost:3005

Authorization:
 Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c


https://api.example.com/v1

Error Handling
In case of errors, the API will respond with an appropriate HTTP status code and a JSON response containing error details. Common HTTP status codes include:
200 OK: The request was successful.
400 Bad Request: The request needed to be corrected or validated.
401 Unauthorized: Authentication failed or is missing.
403 Forbidden: The request is valid, but the user does not have permission.
404 Not Found: The requested resource does not exist.
500 Internal Server Error: An unexpected error occurred on the server.


Admin API Endpoints:
1. Admin Sign-Up API
Endpoint URL: /admin/signup
Description: Allows the creation of a new admin account.
[Details about request parameters, request body, and responses as provided in the API documentation]
2. Choose Login Method API
Endpoint URL: /choice
Description: Allows choosing the login method for an admin (mail or authenticator app).
[Details about request parameters, request body, and responses as provided in the API documentation]
3. Admin Login API
Endpoint URL: /admin/login
Description: Allows admins to log in using their credentials and OTP.
[Details about request parameters, request body, and responses as provided in the API documentation]
4. Generate OTP for Admin API
Endpoint URL: /admin/generateOtp
Description: Generates an OTP for admin password reset.
[Details about request parameters, request body, and responses as provided in the API documentation]
5. Check OTP for Admin Password Reset API
Endpoint URL: /admin/checkOtp
Description: Validates the OTP for admin password reset.
[Details about request parameters, request body, and responses as provided in the API documentation]
6. Admin Logout API
Endpoint URL: /logout/:adminId
Description: Allows the admin to log out of their account.
[Details about request parameters, request body, and responses as provided in the API documentation]

Driver API Endpoints
1. Add Driver API
Endpoint URL: /driver/adddriver
Description: Allows the addition of a new driver.
[Details about request parameters, request body, and responses as provided in the API documentation]
2. Driver Login API
Endpoint URL: /driver/driverlogin
Description: Allows drivers to log in using their credentials.
[Details about request parameters, request body, and responses as provided in the API documentation]
3. Get List of Drivers API
Endpoint URL: /admin/driverlist
Description: Retrieves a list of drivers associated with the logged-in admin.
[Details about request parameters, request body, and responses as provided in the API documentation]
4. Delete Driver API
Endpoint URL: /driver/delete
Description: Deletes a driver.
[Details about request parameters, request body, and responses as provided in the API documentation]
5. Driver Logout API
Endpoint URL: /driver/logout/:driverId
Description: Allows the driver to log out of their account.
[Details about request parameters, request body, and responses as provided in the API documentation]

Bus API Endpoints
1. Add Bus API
Endpoint URL: /admin/addbus
Description: Allows the addition of a new bus.
[Details about request parameters, request body, and responses as provided in the API documentation]
2. Assign Bus to Driver API
Endpoint URL: /admin/assignbus
Description: Assigns a bus to a driver.
[Details about request parameters, request body, and responses as provided in the API documentation]
3. Assign Bus to Route API
Endpoint URL: /admin/assignroute
Description: Assigns a bus to a route.
[Details about request parameters, request body, and responses as provided in the API documentation]
4. Get List of Buses API
Endpoint URL: /admin/buslist
Description: Retrieves a list of buses associated with the logged-in admin.
[Details about request parameters, request body, and responses as provided in the API documentation]
Get Bus Details API
Endpoint URL: /admin/buses/:busId
Description: Retrieves details of a specific bus.
[Details about request parameters, request body, and responses as provided in the API documentation]
5. Get Assigned Bus Details API
Endpoint URL: /driver/driverbus/:driverId
Description: Retrieves details of the bus assigned to a driver.
[Details about request parameters, request body, and responses as provided in the API documentation]
6. Delete Bus API
Endpoint URL: /bus/delete/:busId
Description: Deletes a bus.
[Details about request parameters, request body, and responses as provided in the API documentation]

Journey API Endpoints
1. Start Journey API
Endpoint URL: /driver/startJourney
Description: Allows the start of a new journey.
Request Method: POST
Request Body:
busID (Number): The ID of the bus associated with the journey.
direction (String): The direction of the journey, either "forward" or "backward".
Response:
Status: 201 Created
Body: JSON response with a message and journey details.
2. End Journey API
Endpoint URL: /driver/endJourney
Description: Marks a journey as complete.
Request Method: POST
Request Body:
journeyID (Number): The ID of the journey to mark as complete.
direction (String): The direction of the journey, either "forward" or "backward".
Response:
Status: 200 OK
Body: JSON response with a message and journey details.
3. Mark Stoppage API
Endpoint URL: /driver/markStoppage
Description: Marks a stoppage during a journey.
Request Method: POST
Request Body:
journeyID (Number): The ID of the journey where the stoppage is being marked.
stoppageName (String): The name of the stoppage to mark.
Response:
Status: Varies (e.g., 200 OK or 401 Unauthorized)
Body: JSON response with a message indicating the success or failure of stoppage marking.
4. Get Journey Details API
Endpoint URL: /driver/journey
Description: Retrieves details of a specific journey.
Request Method: POST
Request Body:
journeyId (Number): The ID of the journey to retrieve details for.
Response:
Status: Varies (e.g., 200 OK or 404 Not Found)
Body: JSON response with journey details if found, or an error message if not found.
5. Delete Journey API
Endpoint URL: /journey/delete/:journeyID
Description: Deletes a journey.
Request Method: DELETE
Request Parameter:
journeyID (Number): The ID of the journey to delete.

Route API Endpoints
1. Add Route API
Endpoint URL: /admin/addroute
Description: Allows administrators to add a new route.
Request Method: POST
Request Body:
routeName (String): The name of the route.
startingStation (String): The starting station of the route.
endingStation (String): The ending station of the route.
distance (Number): The distance covered by the route in kilometers.
farecalc (Number): The fare calculation for the route.
estimatedDuration (Number): The estimated duration of the route in hours.
stops (Array of Strings): The list of stoppages along the route.
Response:
Status: Varies (e.g., 200 OK or 400 Bad Request)
Body: JSON response with a message indicating the success or failure of route addition and route details if successful.
2. Route List API
Endpoint URL: /admin/routelist
Description: Retrieves a list of routes for the logged-in administrator.
Request Method: GET
Response:
Status: Varies (e.g., 200 OK or 403 Forbidden)
Body: JSON response with a message and an array of route details if authorized.
3. Route Details API
Endpoint URL: /admin/routes/:routeId
Description: Retrieves details of a specific route by route ID.
Request Method: GET
Request Parameter:
routeId (Number): The ID of the route to retrieve details for.
Response:
Status: Varies (e.g., 200 OK or 404 Not Found)
Body: JSON response with route details if found or an error message if not found.
4. Delete Route API
Endpoint URL: /route/delete/:routeId
Description: Deletes a route by route ID.
Request Method: DELETE
Request Parameter:
routeId (Number): The ID of the route to delete

Google API Endpoints
1. Calculate Distance API
Endpoint URL: /distance
Description: Calculate the distance, duration, and fare between two cities.
Request Parameters:
city1 (string): The name of the first city.
city2 (string): The name of the second city.
Response:
distance (string): The distance between the two cities in kilometers.
duration (string): The duration of the journey in hours.
fare (number): The fare for the journey.
2. Fetch Weather API
Endpoint URL: /get-weather
Description: Get the current weather for a city.
Request Parameters:
city (string): The name of the city for which weather information is requested.
Response:
weather (string): A description of the current weather conditions.

