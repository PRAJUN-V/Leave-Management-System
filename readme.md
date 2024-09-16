Project: Leave Management System
•Folder named client is used for managing frontend and Folder named server is used for managing backend.
•test.rest file is created to test the backend api's.

___________________________________________________________________________________________________

Frontend
• Installed react in the frontend.
• Tailwind is setup at frontend for designing.
• npm install axios jwt-decode react-router-dom
• Created folder named css and image inside assets in src
• Created folder named pages and components inside src folder
• Created constants.js and api.js
• Created a file named ProtectedRoute.jsx in components folder.
• Now I am creating a file name Home.jsx in employee(will rename the file later it is for testing.)
• npm install react-router-dom formik yup @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons axios jwt-decode
• Created Login.jsx and Register.jsx file in authentication folder.
• npm install ldrs
• Created file named AdminManagement.jsx in admin side.
• In admin side file named Header.jsx and Sidebar.jsx is created in common folder.
• npm i react-feather
• npm install react-icons
• create admin dashboard and admin user management
• at user management now I am only including email not firstname and lastname because at time of registration I forgot to include add firstname and lastname but from backend first name and last name is coming after including firstname and lastname in during registration I will show that in the user management side.
•

___________________________________________________________________________________________________

Backend
• Created a virtual environmen name venv for managing all the packages related to this project.
• Installed Django in venv.
• Created a djanogo project named.
• Installed djangorestframework django-cors-headers.
• Created a app named admin_api for admin side management and employee_api for employee side management.
• Created a app named accounts for managing user authentication in backend.
• To change email in place of username : https://www.youtube.com/watch?v=Um-rWZKhL3E
    - pip install django-use-email-as-username
• Admin email: admin@gmail.com , Admin password: Admin@123
• Created a model named profile in accounts, with user and role fields.
• Created a file named signals.py create profile automatically when user is created with same id as user.
        Now a profile is created related with user whenever a new user is created.
• Created serializer in accounts app for custom User.
        Created UserSerializer
• Created a generic view for creating user.
• pip install djangorestframework-simplejwt
• Created custom token obtain pair view to include profile role and user is_active in token.
• Created UserStatusSerializer in accounts.serializer to check user is active or not in frontend.
        Created view and url for this.
• registration api is tested and it is working properly.
• api for getting token using credential is tested and working properly.
• api for getting new access token and refresh token by inputing refresh token.
        I tested it and working properly.
• registration, get_token, refresh token is working properly in backend.
• When admin register a employee, an email will be sent to employee with the password for logging in.
• created backend logic for user management in admin side
• leave model is created.


___________________________________________________________________________________________________
