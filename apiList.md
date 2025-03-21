# DevTinder APIs List



## authRouter
-POST /signup
-POST /login
-POST /logout

## profileRouter
-GET /profile/view
-PTACH /profile/edit
-PATCH  /profile/password

## connectionRequestRouter
-POST /request/send/interested/:userId
-POST /request/send/ignored/;userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

## userRouter
-GET /user/connections
-GET  /user/request/received
-GET /user/feed   (gets you the profile of the other user)


Status :- ignored, interested, accepted , rejected




