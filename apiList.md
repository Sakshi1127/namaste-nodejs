# DevTinder APIs List



## authRouter
-POST /signup
-POST /login
-POST /logout

## profileRouter
-GET /profile/view
-PTACH /profile/edit
-PATCH  /profile/password

cuurentPassword UpdatePassword
 currentPaassword match user ke original password se    true

 updatePassword is that strong or not if it is then update 
 updatePaaswaor is not equal to current password 

## connectionRequestRouter
-POST /request/send/:status/:userId   (there is one api for interested and ignored)

1) create connection request  collection in Db --- fromUserId,toUserId,status(add enum) ,timestamps
2) craete a post api with userAuth middleware
3) validation 
   1) status check 
   2) if there is an already existing connection request
       1) koi phele se same request exist nhi kr rhi
       2) ki sakshi ne punit ko bheji hai to punit ko sakshi nhi bhej skta
   3) touserId is present in DB or not 
   4) fromUsedId is not equal touserId 



-POST /request/review/:status/:requestId  (there is one api for accepted and rejected)

## userRouter
-GET  /user/request/received

-GET /user/connections
-GET /user/feed   (gets you the profile of the other user)


Status :- ignored, interested, accepted , rejected




