# menu spec api

## create menu

- POST /menu

- authorization admin

request body

```json
{
  "name": "example",
  "price": "150.000",
  "category": 1,
  "description": "blabla" //optional
}
```

request file

- image

response success

```json
{
  "status": "success",
  "message": "Menu created",
  "data": {
    "id": 1,
    "name": "example",
    "price": "150.000",
    "description": "blabla",
    "image": "/public/img/example.jpg",
    "category": {
      "id": 1,
      "name": "makanan"
    }
  }
}
```

response error

```json
{
  "status": "error",
  "message": "cant create menu"
}
```

## update menu

- PUT /menu/:idMenu

- authorization admin

request body

```json
{
  "name": "example",
  "price": "150.000",
  "category": 1,
  "description": "blabla" //optional
}
```

request file

- image

response success

```json
{
  "status": "success",
  "message": "Menu created",
  "data": {
    "id": 1,
    "name": "example",
    "price": "150.000",
    "description": "blabla",
    "image": "/public/img/example.jpg",
    "category": {
      "id": 1,
      "name": "makanan"
    }
  }
}
```

response error

```json
{
  "status": "error",
  "message": "cant update menu"
}
```

## delete menu

- DELETE /menu/:idMenu

- authorization admin

response success

```json
{
  "status": "success",
  "message": "Menu deleted"
}
```

response error

```json
{
  "status": "error",
  "message": "cant delete menu"
}
```

## read menu

- GET /menu/:idMenu

response success

```json
{
  "status": "success",
  "message": "get menu by id",
  "data": {
    "id": 1,
    "name": "example",
    "price": "150.000",
    "description": "blabla",
    "image": "/public/img/example.jpg",
    "category": {
      "id": 1,
      "name": "makanan"
    }
  }
}
```

response error

```json
{
  "status": "error",
  "message": "cant find menu"
}
```

## search menu

- GET /menu
  - query
    - name
    - price

response success

```json
{
  "status": "success",
  "message": "get menu by id",
  "data": [
    {
      "id": 1,
      "name": "example",
      "price": "150.000",
      "description": "blabla",
      "image": "/public/img/example.jpg",
      "category": {
        "id": 1,
        "name": "makanan"
      }
    },
    { "": "" }
  ]
}
```

response error

```json
{
  "status": "error",
  "message": "cant find menu"
}
```
