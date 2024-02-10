# admin spec api

## register admin

request body

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "password"
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

## login

- POST /admin

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


## logout

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
