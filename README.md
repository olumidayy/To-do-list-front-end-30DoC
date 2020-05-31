# To-do-list

## Link to [solution](https://limitless-hollows-48755.herokuapp.com/)


This task was made with love from me to you all. Enjoy
Ensure you maintain the relative file structure of the provided files to prevent unnecessary tear.

fork this repo, clone to your local machine then create a backend api to satisfy the given features

1. Go to the app.js file and add the endpoint to where your server is running. Do not end with "/". It is the first line in the app.js file
2. When the "/login" route is accessed, serve the login page.
3. When the "/signup" route is accessed, serve the signup page.
4. The login form data would be submitted to the "/login_submit" route via POST and a session would be created. After a session is created, the user would be redirected to the "/todo" route which serves the index.html. If no session exists and the "/todo" route is accessed, the user would be redirected to the "/login" route. If the login details are invalid, resend the login form.
5. The signup form data would be submitted to the "/signup_submit" route via POST method and a session would be created before the user is redirected to the "/todo" route.
6. the data submitted by the "/login_submit" route is in the form 
```json
{
          "name": name,
          "password": password
        }
```
while that of the "/signup_submit" route is 
```json
{
          "name": name,
          "password": password,
          "email":email
        }
```
7. Data would be posted to the "/save" route in form of JSON data which would be an array of objects. It should be saved against the user logged in. You do not need to know the format of the data. just save as is against a logged in user. You may check the app.js file though if curious.
8. if the "/clear" route is accessed, stored data should be deleted.
9. If the "/data" route is accessed, the data stored against the user should be sent as it was stored.
10. You may use any form of persistent storage you want.
11. All complaints should be made as soon as possible. God no go shame us. this is a Three day task for Day 28 and 29 and 30.

Note, you may investigate the index.html form and create a way by which the user would set their own background picture. If not though, enjoy the top of my head. Frankly, as long as the basic functionlity is not hindered, you are free to do whatever you want.
