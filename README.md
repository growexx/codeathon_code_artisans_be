***Growexx Attendance
# Node boilerplate
This is a nodejs boilerplate with basic user authentication and uses AWS SES for sending emails. This boilerplate has following features:
- User signup along with sending verification otp
- User signin
- Forgot password
- Update user profile

---
## Requirements

For development, you will only need Node.js and a node global package installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v13.8.0

    $ npm --version
    6.13.6

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

## Install

    $ git clone https://github.com/YOUR_USERNAME/PROJECT_TITLE
    $ cd PROJECT_TITLE
    $ npm install

## Configure app

You will need to configure AWS SES for sending emails.

Create an environment file with extension ```.env```.

- cp ```testing.env``` as ```YOUR_ENV.env```
- Change DB_NAME
- Change DB_HOST
- If you have DB Username add ```DB_USERNAME={VALUE}``` and ```DB_PASSWORD={VALUE}``` to your env file
- Similarly change other fields as per your need.

## Running the project

- To execute the code, run the following command ```npm start```
- Run the command ```npm t``` for testing

## AWS SES 

- You can perform the CRUD operations on AWS SES template.
