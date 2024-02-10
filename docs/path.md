<!-- admin -->

POST /admin/register
POST /admin
PUT /admin

<!-- user -->

POST /user/register
POST /user/
PUT /user/
GET /user/current
PUT /user/current

<!-- menu -->

GET /menu
GET /menu/:idMenu
POST /menu
PUT /menu/:idMenu
DELETE /menu/:idMenu

<!-- orders -->

GET /orders Mendapatkan daftar semua pesanan yang telah ditempatkan.
GET /orders/:id Mendapatkan detail sebuah pesanan berdasarkan ID.
POST /orders Membuat pesanan baru.
PUT /orders/:id Memperbarui pesanan yang ada berdasarkan ID.
DELETE /orders/:id Menghapus sebuah pesanan berdasarkan ID.

GET /orders/:id/items Mendapatkan daftar item yang termasuk dalam sebuah pesanan.
POST /orders/:id/items Menambahkan item baru ke dalam sebuah pesanan.
PUT /orders/:id/items/:itemId Memperbarui item tertentu dalam sebuah pesanan.
DELETE /orders/:id/items/:itemId Menghapus item tertentu dari sebuah pesanan.
