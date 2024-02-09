# user spec api

## register user

request body

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "full_name": "John Doe",
  "phone_number": "123-456-7890",
  "address": "123 Main Street, City, Country"
}
```

response success

```json
{
  "status": "success",
  "message": "User successfully registered.",
  "data": {
    "id": 10001,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

response error

```json
{
  "status": "error",
  "message": "Registration failed. Invalid email format."
}
```
