# user spec api

## register user

- POST /user/register

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

## login user

- POST /user/

requset body

```json
{
  "email": "john@example.com",
  "password": "rahasia"
}
```

response success

```json
{
  "status": "success",
  "message": "User successfully login.",
  "data": {
    "token": "abcd12345"
  }
}
```

response error

```json
{
  "status": "error",
  "message": "login failed. Invalid email format."
}
```

## logout user

- PUT /user/

- authorization

response success

```json
{
  "status": "success",
  "message": "User successfully logout."
}
```

response error

```json
{
  "status": "error",
  "message": "logout failed. unauthorized"
}
```

## get user

- GET /user/current

- authorization

response success

```json
{
  "status": "success",
  "message": "User successfully registered.",
  "data": {
    "username": "john_doe",
    "email": "john@example.com",
    "full_name": "John Doe",
    "phone_number": "123-456-7890",
    "address": "123 Main Street, City, Country"
  }
}
```

response error

```json
{
  "status": "error",
  "message": "user is not found"
}
```

## update user

- unauthorized

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
  "message": "User successfully update.",
  "data": {
    "id": 10001,
    "username": "jon",
    "email": "john@example.com",
    "full_name": "John Doe",
    "phone_number": "123-456-7890",
    "address": "123 Main Street, City, Country"
  }
}
```

response error

```json
{
  "status": "error",
  "message": "update failed. Invalid email format."
}
```
