# order spec api

## create order

- POST /orders

- authorization

request body

```json
{
  "createdAt": "yyyy-mm-dd",
  "totalAmount": 12,
  "quantity": 12,
  "menuItemId": 1
}
```

response success

```json
{
  "status": "success",
  "message": "order successfully.",
  "data": {
    "id": 1,
    "createdAt": "yyyy-mm-dd",
    "totalAmount": 1,
    "items": [
      {
        "id": 1,
        "quantity": 2,
        "menuItemId": 1,
        "orderId": 1
      }
    ]
  }
}
```

response error

```json
{
  "status": "error",
  "message": "order cant ...."
}
```

## update order

- PUT /orders/:id
- authorization

request body

```json
{
  "createdAt": "yyyy-mm-dd",
  "totalAmount": 12,
  "quantity": 12,
  "menuItemId": 1
}
```

response success

```json
{
  "status": "success",
  "message": "order successfully.",
  "data": {
    "id": 1,
    "createdAt": "yyyy-mm-dd",
    "totalAmount": 1,
    "items": [
      {
        "id": 1,
        "quantity": 2,
        "menuItemId": 1,
        "orderId": 1
      }
    ]
  }
}
```

response error

```json
{
  "status": "error",
  "message": "order cant ...."
}
```

## delete order

- DELETE /orders/:id
- authorization

response success

```json
{
  "status": "success",
  "message": "order successfully removed"
}
```

response error

```json
{
  "status": "error",
  "message": "order cant removed"
}
```

## get order

- GET /orders/:id
- authorization

response success

```json
{
  "status": "success",
  "message": "order successfully.",
  "data": [
    {
      "id": 1,
      "createdAt": "yyyy-mm-dd",
      "totalAmount": 1,
      "items": [
        {
          "id": 1,
          "quantity": 2,
          "menuItemId": 1,
          "orderId": 1
        }
      ]
    },
    { "": "" }
  ]
}
```

response error

```json
{
  "status": "error",
  "message": "order cant ...."
}
```

## search order

- GET /orders
  - query
    - id
    - createdAt
- authorization admin

response success

```json
{
  "status": "success",
  "message": "order successfully.",
  "data": [
    {
      "id": 1,
      "createdAt": "yyyy-mm-dd",
      "totalAmount": 1,
      "items": [
        {
          "id": 1,
          "quantity": 2,
          "menuItemId": 1,
          "orderId": 1
        }
      ]
    },
    { "": "" }
  ]
}
```

response error

```json
{
  "status": "error",
  "message": "order cant ...."
}
```
