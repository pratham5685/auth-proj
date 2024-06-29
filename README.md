# End to End Authentication System

This Application follows MVC Architecture
We separated Routes for each and every API work.
MVC - Model, View, Controller.
It is mainly used to keep main server js file organized while developing complex web applications.


# There are two ways of doing :

1. Export app and import in other router file to utilize it.
2. Use express.Router() , which is mainly used, but why? becoz it provides prefix option 
such as les say there are get apis like "/users/all" , "users/new" , we know that they have common prefix as "/users/" in it , 
so it can be used as prefix.
for example : app.use("/users",userRoutes);*

### In Router File :

1. Import express.
2. use const router = express.Router();
3. And export this router and import it in main server file.


Middlewares are important because becoz they are used for error handling 
and also authentication purposes like for example, we should not be able to 
access "/myprofile","/dashboard" directly without logining in that's why we use 
middlewares.

## Concept

We use isAuthenticated Middleware present in middleware folder and we import it 
in routes, for example:  router.get('/mytasks',isAuthenticated,getAllTasks) , like these so in isAuthenticated 
function if all things workout its gets cookies and token and indentifies the user then it stores the user data In
req.user, like these for example : user : req.user, which can be further used for operations such as retrieving data related
to that specific user.

## Some important notes on routing, there are two ways of doing it :

1. Using router.route  :
router.route is used in Express.js to create modular, mountable route handlers. 
It allows you to define multiple HTTP methods (e.g., GET, POST, PUT, DELETE) for a single route. 
for example : 
router.route('/tasks')
    .get((req, res) => {
        // Handle GET request for /tasks
        res.send('Get all tasks');
    })
    .post((req, res) => {
        // Handle POST request for /tasks
        res.send('Create a new task');
    });


2. Using normal different routes as we used to do,

router.get('/tasks/:id', isAuthenticated ,getTaskById);
router.put('/tasks/:id',isAuthenticated , updateTaskById);
router.delete('/tasks/:id', isAuthenticated ,deleteTaskById);

and then ofcourse define respective functions in controllers file. And dont forget to authentication function
before these too.


## Error handling using express Middleware: 

using express middleware we can handle error globally in the application,
by using a function which has four parameters , (err,req,res,next)  
for example : in app.js (at the end)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message,
    });
});


# Deployment Stuff 


SameSite Attribute
Strict: Only send the cookie if you're on the same site (high security, might break functionality).
Lax: Send the cookie when navigating from an external site but not on sub-requests like loading images (good balance of security and usability).
None: Send the cookie in all cases, including cross-origin requests (least secure, but necessary for some functionality). Must be used with Secure.
Secure Attribute
true: Only send the cookie over HTTPS (secure).
false: Send the cookie over both HTTP and HTTPS (less secure).
Example in Your Code
You can set these attributes based on whether you're in development or production:

res.status(201).cookie("token", token, {
  httpOnly: true,
  maxAge: 120000,
  sameSite: process.env.NODE_ENV === "Development" ? "Lax" : "None",
  secure: process.env.NODE_ENV !== "Development", // secure should be true in production
}).json({
  message: "Login successful!",
});


Development: sameSite: 'Lax' and secure: false
Production: sameSite: 'None' and secure: true

Why It Matters
SameSite: Helps prevent attacks by controlling when cookies are sent.
Secure: Ensures cookies are only sent over secure connections.

Also, Important keep the mongodb Atlas IP to **0.0.0.0/0** , so anyone can access.
