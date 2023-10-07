# CodeArtisans BE

- This is a backend code repository for CodeArtisans.
- To get started with our web application, please follow this instructions:

- Make sure you have node version `16.4.0` or higher installed on your system.
- Also make sure to install mongoDB on your machine before starting this application.

## Configure app

Create an environment file with extension `.env`.

- cp `testing.env` as `local.env`
- Change DB_NAME
- Change DB_HOST
- If you have DB Username add `DB_USERNAME={VALUE}` and `DB_PASSWORD={VALUE}` to your env file
- Similarly change other fields as per your need.

## Steps

1. Download the zip file or clone in the in the folder of your choice by running this command in the terminal - `git clone git@github.com:growexx/codeathon_code_artisans_be.git`
2. Then change the path to the project directory and inside that folder, run `npm install` command to install all the required packages.
3. After successfull installation you can see `node_modules` folder inside your project repository.
4. Now to start the application run `npm start` command and boom your application is being compiled and started running on port 3002.
5. To setup frontend you can follow the readme on this [repository](https://github.com/growexx/codeathon_code_artisans_fe).
6. After both backend and frontend applications are running, you can use our web application to generate database schema, unit test code, and controller code by providing user stories via pdf file or via chat input.