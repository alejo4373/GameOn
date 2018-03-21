/* REGISTER USER */
//URL: http://localhost:3100/signup
//To register a user make sure the information is being sent in the following format/shape
//and is traveling in a POST request's body 
//SEND:
req.body = { 
  username: 'alejo4373',
  password: 'alejo',
  fullname: 'Alejandro Franco',
  zipcode: '11369',
  email: 'alejo4373@gmail.com',
  sports: '[{"sport_id": 1, "proficiency": 1}, {"sport_id": 2, "proficiency": 2}]' 
}
 // ==> Server returns
 res.data ={
  "user": {
      "id": 1,
      "username": "alejo4373",
      "fullname": "Alejandro Franco",
      "profile_pic": "/images/user.png"
  },
  "msg": "Welcome alejo4373 you have created an account and logged in automatically"
}

/* LOG IN USER */
//URL: http://localhost:3100/login
//REQUEST: POST
//SEND:
req.body = { 
  username: 'alejo4373',
  password: 'alejo' 
}
// ==> Server returns
res.data = {
  "user": {
      "id": 1,
      "username": "alejo4373",
      "fullname": "Alejandro Franco",
      "profile_pic": "/images/user.png"
  },
  "msg": "Welcome alejo4373! You have logged in"
}

/*GET USER DETAILED INFO FOR PROFILE */
//URL: http://localhost:3100/user/getinfo
//REQUEST: GET
//SEND: NOTHING  
//as log as the user is logged in
// ==> Server returns
res.data = {
  "user": {
      "id": 1,
      "username": "alejo4373",
      "fullname": "Alejandro Franco",
      "email": "alejo4373@gmail.com",
      "zip_code": 11369,
      "profile_pic": "/images/user.png",
      "exp_points": 50,
      "sports": [
          { "name": "basketball", "id": 1, "proficiency": 1 },
          { "name": "soccer", "id": 2, "proficiency": 2 }
      ]
  },
  "msg": "Retrieved user info for alejo4373"
}

/*GET ALL SPORTS */
//URL: http://localhost:3100/sports/all
//REQUEST: GET 
//SEND: NOTHING  
// ==> Server returns
res.data = {
  "sports": [
      { "id": 1, "name": "basketball" },
      { "id": 2, "name": "soccer" },
      { "id": 3, "name": "volleyball" },
      { "id": 4, "name": "tennis" },
      { "id": 5, "name": "handball" },
      { "id": 6, "name": "football" }
  ],
  "msg": "Retrieved all sports"
}