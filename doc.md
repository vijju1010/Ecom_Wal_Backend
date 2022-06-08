**\*\*\*\***Categories**\*\*\*\***
[] - /api/categories GET - Get all categories **_all_**

[] - /api/categories POST - Create a new category **_admin_**
[] ----category

**\*\*\*\***Products**\*\*\*\***
[] - /api/product/:productId GET Get single product **_all_**

[] - /api/products/:id GET - Get products by categoryId

[] - /api/products POST - Create a new product **_admin_**
[] ----product
[] ----productname
[] ----price
[] ----categoryid

[] - /api/products/:productId/disable PUT disable Product **_*admin*_**
[] ----authorization : bearer {token}

**\*\*\*\***Cart**\*\*\*\***
[] - /api/cart GET get cart for **_user_**
[] -----authorization: Bearer {token}

[] - /api/addtocart POST addtocart for **_user_**
[] -----authorization: Bearer {token}
[] -----productId

[] - /api/cart/:productId DElETE delete from Cart for **_user_**
[] -----authorization: Bearer {token}

**\*\*\*\***Orders**\*\*\*\***
[] - /api/placedorders GET get placedorders for **_user_**
[] -----authorization: Bearer {token}

[] - /api/placeorder POST place order for **_user_**
[] -----authorization: Bearer {token}
[] -----productId

[] - /api/receivedorders GET ger Received orders for **_admin_**
[] -----authorization: Bearer {token}

[] - /api/setorderstatus/:orderId PUT setOrdersStatus by **_admin_**
[] -----authorization: Bearer {token}
[] -----status

[] - /api/cancelorder/:orderId DELETE delete cancel order for **_user_**
[] -----authorization : Bearer {token}

**_\_Authentication & Register_**

[] - /api/register POST register **_all_**
[] ----- { name, email, password, phonenumber, role }

[] - /api/login POST login **_all_**
[] -----{ email, password }

[] - /api/checkauth GET checkAuth for **all**
[] -----authorization : Bearer {token}


