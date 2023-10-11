use mydb;
Select product.productName , `Order`.`dateAdded`, User.nameUser
from `order`
join Order_has_Product  on `order`.`idOrder`= Order_has_Product.Order_idOrder
join product on product.idProduct = Order_has_Product.product_idProduct
join user on user.idUser = `order`.`User_idUser`
where User.idUser = 100
