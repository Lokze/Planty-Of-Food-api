Planty Of Food api

Hi this is an API that will enable purchasing groups to be managed in the company's Planty Of Food platform, using Node.js and MySQL.

**REMEMBER TO USE THIS API YOU NEED TO USE A PROGRAM TO MANAGE THE REQUEST LIKE [POSTMAN](https://www.postman.com) OR THE [THUNDER CLIENT](https://www.thunderclient.com) ON VSC** <br />
This is how the databased is structured. <br />
There are 4 tables:<br />
User;<br />
Product;<br />
Order;<br />
Order_has_Product.<br />

![image](https://github.com/Lokze/Planty-Of-Food-api/assets/51636003/6233eba6-9e80-49bc-bce7-aebad89da874=100)<br />

User has a 1:n relationship with Order, while Producuct has a m:n relationship with Order so i created a new table Orer_has_Product.<br />

Here the fileds of the tables

User       |  Order |  Product |  Order_Has_Product
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
idUser INT PK<br />nameUser VARCHAR(45)<br />surnameUser VARCHAR(45)<br /> emailUser VARCHAR(45) | idOrder INT PK<br />dateAdded DATE<br /> User_idUser INT FK | idProduct INT PK <br /> productName VARCHAR(45)| Order_idOrder INT FK <br /> Product_idPorduct INT FK <br /> idOhp INT PK
<br /> 

The API uses the MySQL driver for node.js to establish the connection <br /> 
![image](https://github.com/Lokze/Planty-Of-Food-api/assets/51636003/e2113b61-057b-4154-9a4e-36a556733960)<br /> 
<br /> 
Once the connection is established, it is sent as a module to other modules for use in sorting.<br /> 

There are 5 sorting modules.<br /> 
The first 4 are  used for the sorting of the databes tables, the last one is used for sorting based on the date and product name.<br /> 
This modules then get exported to App.js where using Expres it stars a local server and uses URI to print, add, modify or delete data.<br /> 
for the first 4 i will show only user because they are work exactly the same.<br /> 

The first two function are used to get the data from database, the first one shows the full table while the second one show only the data by a specific id<br /> 
user.js| App.js
:-------------------------:|:-------------------------:|
![image](https://github.com/Lokze/Planty-Of-Food-api/assets/51636003/c856e3f0-001a-4381-9309-039fa172b68f)| ![image](https://github.com/Lokze/Planty-Of-Food-api/assets/51636003/e77f4913-62d3-4446-9fe6-e187e4c39f46)

Here the list of GET request for every module<br /> 
-User : http://localhost:3000/user ,  http://localhost:3000/user/{id} (the user id start from 100)<br />
-Product : http://localhost:3000/product,  http://localhost:3000/product/{id} (the user id start from 1)<br />
-Order : http://localhost:3000/order,  http://localhost:3000/order/{id} (the user id start from 10)<br />
-Order_has_product : http://localhost:3000/ohp,  http://localhost:3000/ohp/{id} (the user id start from 1)<br />


This is the function to add data to the table<br />
user.js| App.js
:-------------------------:|:-------------------------:|
![image](https://github.com/Lokze/Planty-Of-Food-api/assets/51636003/06764968-d127-4572-bb00-68becdeae52b)|![image](https://github.com/Lokze/Planty-Of-Food-api/assets/51636003/b2b4f6af-b67e-4b2a-a62d-ccff56c0a7f9)

The data to add is recived through the json conetent in the body fro example:<br />
![image](https://github.com/Lokze/Planty-Of-Food-api/assets/51636003/50665c4c-c556-46b0-99db-b078ea453119)

Here the POST reqest for every module:<br />
-User : http://localhost:3000/user   Json body{"name":"Inser Name", "surname":"Insert Surname", "email":"Inser Email"} <br />
-Product : http://localhost:3000/product   Json body{"product":"Inser product"} <br />
-Order : http://localhost:3000/order   Json body{"date":"Inser Date(YYYY-MM-DD)", "idUser":"Inser user id}<br />
-Order_has_product : http://localhost:3000/ohp   Json body{"idOrder":"Insert idOrder", "idProduct":"Inser idProduct"} <br />

This is the function to modify the data in the table<br />

user.js| App.js
:-------------------------:|:-------------------------:|
![image](https://github.com/Lokze/Planty-Of-Food-api/assets/51636003/20799298-90ab-470e-8939-a1231ec54051)|![image](https://github.com/Lokze/Planty-Of-Food-api/assets/51636003/290a3c91-5e48-4bea-8f64-61405343f28e)

Just as the POST request this PUT reqest will update the data recive from json content in the body<br />
Here the PUT request for evry module:<br />
-User : http://localhost:3000/user   Json body{"name":"Inser Name", "surname":"Insert Surname", "email":"Inser Email", "id":"id"} <br />
-Product : http://localhost:3000/product   Json body{"product":"Inser product", "id":"id"} <br />
-Order : http://localhost:3000/order   Json body{"date":"Inser Date(YYYY-MM-DD)", "idUser":"Inser user id", "id":"id"}<br />
-Order_has_product : http://localhost:3000/ohp   Json body{"idOrder":"Insert idOrder", "idProduct":"Inser idProduct", "id":"id"} <br />

And this is the function to delete data from the table.<br />
user.js| App.js
:-------------------------:|:-------------------------:|
![image](https://github.com/Lokze/Planty-Of-Food-api/assets/51636003/7fa72d56-40ca-4d6c-8201-59df25ace00b)|![image](https://github.com/Lokze/Planty-Of-Food-api/assets/51636003/2ff8faf0-2f25-4d71-8b6a-f05017947d45)

It deletes th data based on the id on the HTTP request<br />
here the DELETE request for every module:<br />
-User : http://localhost:3000/user/{id} <br />
-Product : http://localhost:3000/product/{id} <br />
-Order : http://localhost:3000/order/{id} <br />
-Order_has_product : http://localhost:3000/ohp/{id} <br />

And this is it for the first 4 module, now this is the last module where you can make 3 querys. <br />
The first one sorts order and product by the order date <br />
querys.js| App.js
:-------------------------:|:-------------------------:|
![image](https://github.com/Lokze/Planty-Of-Food-api/assets/51636003/ba3e6ca1-f386-47ef-8fe0-fd22496c5a97)|![image](https://github.com/Lokze/Planty-Of-Food-api/assets/51636003/554f84df-48b1-4a31-bd92-9960896660bd)

The GET reqeust is  http://localhost:3000/date-sort/{date}  (**REMEBER THE DATE TYPE IS YYYY-MM-DD**). <br />

The second one sort order and product by the product name <br />
querys.js| App.js
:-------------------------:|:-------------------------:|
![image](https://github.com/Lokze/Planty-Of-Food-api/assets/51636003/32ee6b6f-08b8-46bf-b2f8-dc221797fc37)|![image](https://github.com/Lokze/Planty-Of-Food-api/assets/51636003/bfb16a28-58d5-4d0f-bfa6-5e047df1d399)

The GET reqeust is  http://localhost:3000/product-sort/{product-name}. <br />

And the last one sort order and product using both date and product name. <br />
querys.js| App.js
:-------------------------:|:-------------------------:|
![image](https://github.com/Lokze/Planty-Of-Food-api/assets/51636003/1df2553a-ad2c-45ab-821b-4b408e061418)|![image](https://github.com/Lokze/Planty-Of-Food-api/assets/51636003/4f763001-e3d1-4f3f-ac33-75f1bc2923b6)


The GET request is :http://localhost:3000/product-date?date=YYYY-MM-DD&product=ProductName
![image](https://github.com/Lokze/Planty-Of-Food-api/assets/51636003/3ee92b76-f3cb-4cc7-8e4c-cdd4600d4d4a)


**REMEMBER TO USE THIS API YOU NEED TO USE A PROGRAM TO MANAGE THE REQUEST LIKE [POSTMAN](https://www.postman.com) OR THE [THUNDER CLIENT](https://www.thunderclient.com) ON VSC**
