# Admin-Panel

*Overview*
An admin panel with a starting Login screen, a redirection link for resetting password. On Logging in, you are greeted with a data 
table including mock user dataset whose information can be manipulated by you . You have access to a navbar on the left, which allows
you access to a tab for creating new users and updating your info. 


*The Back End*
  A node js based Environment
  express js for processing http based requests (with cors and extended json support enabled)
  mongoose for manipulating data from MongoDB atlas DB
  password hashing with 8 salt cycles based on blowfish hashing algorithm
  jwt based authentication for major data related requests
  multer for managing media manipulation
  some user related routes
 
 
*The Front End*
  
  React js powered interface
  ADMIN LTE template used for UI reference
  bootstrap for css
  axios for sending and intercepting api requests
  formik for form handling
  toast library for displaying toasts for errors
  MUI datagrid for displaying users data
