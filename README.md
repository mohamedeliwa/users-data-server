
# USERS-DATA-SERVER

A simple server consists of two APIs

- `POST /users`
    > used to populate the mongodb with dummy users data

- `GET /users`
    > used to fetch users data  
    with query strings user can filter requested data:  
    `GET /users?first_name=`  
    `GET /users?last_name=`    
    `GET /users?email=`  
    `GET /users?gender=`  
    or implement pagination.  
    `GET /users?limit=10&skip=0` "1st page of 10"  
    `GET /users?limit=3&skip=0` "1st page of 3"  
    `GET /users?limit=3&skip=3` "2nd page of 3"  
    `GET /users?limit=3&skip=6` "3rd page of 3"  
    or implement sorting data.  
    we can sort by any property for example createdAt  
    `GET /users?sortBy=createdAt:desc`  
    `GET /users?sortBy=createdAt:asc`