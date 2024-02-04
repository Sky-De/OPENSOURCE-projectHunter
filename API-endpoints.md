# localhost:5000/api/user/invite
## POST -- Create Invite
In `localhost:3000/signup`, the user will input username and email, and upon submission, frontend will send: `POST localhost:5000/api/user/invite` to backend, which will create an Invite object storing the username, email, expiration time, and invite_key AKA **ikey**. Backend will then send the link to the inputted email with the randomized **ikey**. (see [*Get Invite*](https://github.com/casanccs/projectHunter/blob/dev/API-endpoints.md#get----get-invite-userinviteikey)...)

Frontend needs to have input validation here for username and email. If invalid, then display a message to the user.

The `request body` looks something like this:
```
{
    "username": "testuser1",
    "email": "zirolet@gmail.com"
}
```
### response
- `status code 201`: You may display a different message to the user depending on the response message.
	- `Invite sent.` -- the invitation email was sent successfully
	- `New invite sent.` -- a *new* invitation was sent. Basically, the person already tried signing up with that email. Thus, another invitation email was sent with new invite link

- `status code 400` -- `Username not provided` or `Email not provided`
- `status code 404` --`no invite?` failure to create the invite in the database. This should be handled by the backend
- `status code 409` -- `Username is already taken` or `Email is already taken` --> redirect the user back to `/signup` page with *"Username or Email is already in use"* message. Do specify whether it is the email or username that is taken.
- `status code 500` -- some failure in sending the email, which would need to be handled by the backend.

## GET -- Get Invite (`/user/invite/:ikey`)
 The previously emailed invite link will be something like `"http:/localhost:3000/signup/invite/123someRandomString456"`, which on the frontend, the route will be `"/signup/invite/:ikey"`.
  When the user clicks on the link, the frontend will IMMEDIATELY send:` "GET localhost:5000/api/user/invite/123someRandomString456"` to the backend. This request matches with the `app.get('/user/invite/:ikey')` endpoint, which gets the invite and sends it back to the frontend.
  
  `ikey` is the *path variable* 
### response
- `status code 400` -- `invite expired` --> Invite exists, but has "expired". In this case, we want to send a *new* invitation email. The response will also contain a json (same as with `status code 200`); we simply need to send `POST localhost:5000/api/user/invite` to backend again .  The body should contain the username and email, and the backend will send the invitation email (Refer back to [*Create Invite*](https://github.com/casanccs/projectHunter/blob/dev/API-endpoints.md#post----create-invite) if needed). Frontend should let the user know their invitation had expired and to check their email again for the new link.
  - `status code 404` -- `no invite` --> No invite exists in the database with the specified `ikey`

  #### `status code 200`
  Upon success, response will be the invite (from the database) as a json.
```
  {
  "id":1,
  "username":"testuser1",
  "email":"zirolet@gmail.com",
  "invite_key":"7Zch0XROgjuZ9xme3bQ5ErPvph0qhj",
  "expiration":"2024-02-04T03:56:55.070Z",
  "createdAt":"2024-02-03T03:56:55.072Z",
  "updatedAt":"2024-02-03T03:56:55.072Z"
  }
```
From this json, the frontend will need `"username"` and `"invite_key"`. (Well, I suppose the frontend would technically already have the invitation key from the link.... no matter.)
1. We want to display a message like "Hi, *username*". 
2. Have the user set up their account.
3. Send the user data AND the `"invite_key"` (aka `ikey`) in a POST request to create the user. (See [*Create User*](https://github.com/casanccs/projectHunter/blob/dev/API-endpoints.md#post----create-user))

# localhost:5000/api/user
## POST -- Create User
Once the user has entered the information necessary to set up their profile, the frontend will need to send that info AND the `invite_key` in a POST request `"POST localhost:5000/api/user"` in order to create the user in the database.
The `request body` looks something like this:
```
{
    "ikey": "Xw18bti1ZSyJa9JFSIT8bE0M41ztsE",
    "password": "Password12!",
    "firstName": "bob",
    "dob": "2005-01-01T12:00:00Z",
    "gender": "M",
    "preferences": ["F" , "T"],
    "pronoun": "Him",
    "state": "TX",
    "city": "Houston",
    "minAge": 18,
    "maxAge": 20
}
```
Do keep in mind that the **database design is still in the works and the User model is subject to change**. Not all fields are required upon signup and in fact, the example above doesn't contain all the possible fields. We probably need documentation for that too...
Also, while there is input validation on the backend, we would like to have input validation on the frontend as well. Make sure everything is in the appropriate format.
### response
- `status code 400`
	- *Field not provided* --> Some required *field* hasn't been submitted in the request. Maybe you forgot...
	- *Password failed due to incorrect:...* -->The specified requirement(s) has not been fulfilled.
- `status code 404`
	- *no invite* --> You're not invited to the party. How'd you even get this address?... There was no invite in the database matching the provided `"ikey"`. This should've been caught back at the [*Get Invite*](https://github.com/casanccs/projectHunter/blob/dev/API-endpoints.md#get----get-invite-userinviteikey) stage...
- `status code 406`
	- *Jailbait* --> This ain't a daycare. We do not allow users under the age of 18. *I suggested we create the account in a suspended state until they're legal but... we're still unsure of how we'll enforce the age requirement.*
	- *Incorrect gender value* --> So much for inclusivity, amirite?...
Notify the user of whatever error is relevant to them. Self-explanatory I think. But most of these errors shouldn't occur if frontend implements input validation. In the case that you get a "no invite" error....well, must be a backend problem.
`status code 200`
Upon success, response will be the user (from the database) as a json. Everything except the password. That's a secret.
```
{
    "pictures": [
        "default.png"
    ],
    "id": 1,
    "username": "testuser1",
    "email": "zirolet@gmail.com",
    "firstName": "bob",
    "gender": "M",
    "minAge": 18,
    "maxAge": 20,
    "preferences": [
        "F",
        "T
    ],
    "pronoun": "Him",
    "dob": "2005-01-01T12:00:00.000Z",
    "bio": null,
    "city": "Houston",
    "state": "TX",
    "occupation": null,
    "distance": null,
    "age": 19,
    "updatedAt": "2024-02-03T12:29:28.791Z",
    "createdAt": "2024-02-03T12:29:28.791Z"
}
```
Now, what does the frontend do with this information? Absolutely nothing.
After successful User creation, the frontend will redirect to login page: `"localhost:3000/"`. (See [*Login*](https://github.com/casanccs/projectHunter/blob/dev/API-endpoints.md#put----login))

## Put -- Login
When the user types their username and password, it will send a `"PUT http://localhost:5000/api/user"` to the backend which the backend will create and store a jwt, send it as a response to the frontend, and the frontend will save the jwt.

The `request body` looks something like this:
```
{
    "username": "testuser2",
    "password": "Password12!"
}
```
### response
- `status code 400` -- *Incorrect username or password* --> Diagnose the patient with Alzheimer's. I mean... Yeah, notify the user. Tell them they're WRONG.
- `status code 500` -- *Could not retrieve token*. The user was found in the database, but there was some issue in retrieving the token. This is a backend problem.

`status code 200`
Upon successful login, the response is a json containing the jwt.
```
{

    "token": "eyJhbGciOiJIYouGetTheIdeazSdhobOFyamBoRD9esE2BK1azY0"

}
```
The frontend redirects to `"localhost:3000/home"`, and will IMMEDIATELY send: `"GET localhost:5000/api/user"` with the jwt in the header for the backend. Backend will then decode it, and send the corresponding User back to the frontend. (See *[*Get User*](https://github.com/casanccs/projectHunter/blob/dev/API-endpoints.md#get----get-user))

## GET -- Get User
After successful login, frontend will IMMEDIATELY send: `"GET localhost:5000/api/user"` with the stored jwt in the header. Backend will then decode it, and send the corresponding User back to the frontend. 

Header looks like this:
`"Authorization": "Bearer eyJhbGciOiJIYouGetTheIdeazSdhobOFyamBoRD9esE2BK1azY0"`

### response
`status code 400`
- *Authentication header is missing* -- You're gonna need to fix that.
- *Token is missing* -- We expect the token to succeed `"Bearer "`. See example above
`status code 401`: Invalid token could not be decoded
**If token is missing or invalid, redirect the frontend to `"localhost:3000/"`.** 

`status code 200`:
Upon success, response will be the user (from the database) as a json. Everything except the password. (We have a little bug at the moment, which is why it currently *does* send the password.)
```
{
    "id": 1,
    "username": "testuser1",
    "email": "zirolet@gmail.com",
    "password": "$2b$04$bOPjPV4Lftwh.rkU3J97a.xxdrNQySq2ds2TY3tKHdZ0NT.UqMdWS",//THIS shouldn't be here
    "firstName": "bob",
    "dob": "2005-01-01T12:00:00.000Z",
    "age": 19,
    "gender": "M",
    "pronoun": "Him",
    "preferences": [
        "F",
        "T"
    ],
    "minAge": 18,
    "maxAge": 20,
    "city": "Houston",
    "state": "TX",
    "occupation": null,
    "bio": null,
    "distance": null,
    "pictures": [
        "default.png"
    ],
    "createdAt": "2024-02-03T12:29:28.791Z",
    "updatedAt": "2024-02-03T12:29:28.791Z"
}
```


---
up next:
- Update User
- localhost:5000/api/user/pic
    - Add Profile Picture
    - Delete Profile Picture