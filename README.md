# Sharitys: An online donation platform for nonprofit fundraisers.

![Sharitys Logo](https://user-images.githubusercontent.com/75840386/121769474-fbc8cc00-cb8d-11eb-8835-52926b5b6810.png)

## Introduction

Nowadays, Fundraising campaign suffers from the Unreachable problem; Donor rarely sees fundraising campaigns on both internet and reality. Moreover, there is an unpredictable event, like the COVID-19 pandemic, which ceases most physical fundraising activity. The combination of these problems leads to project failure. Sharitys is created to solve this problem.

The objectives of Sharitys is to increase the chances to find the interesting project and provides modern money transferring method to the donor, as well as assisting individual fundraiser and increase project visibility for them.

In short, Sharitys is an online donation platform for nonprofit fundraisers that aids the donation project to be accessible by the community and facilitates a modern money transferring technology.

## User Guide (Manual)

To fully utilize the software and manual, The reader is required to have basic knowledge of PostgreSQL, Express.js, React and Node.js (PERN stack).

### Installation

- Visual Studio Code (or any supported IDE)
- Github Desktop (Optional)
- PGAdmin 4 (or Beekeeper studio on Mac os)

and 

- Express.js
- React
- Node.js

Installation should be done beforehand

### Getting Start

![github](https://user-images.githubusercontent.com/75840386/121769537-61b55380-cb8e-11eb-963f-2e0009ce8e8e.JPG)

1. (For Github Desktop) Open https://github.com/PoonkasemK/Sharitys -> Code (green button) -> Open with Github Desktop, and clone the repository to local
2. Or Open https://github.com/PoonkasemK/Sharitys -> Code (green button) -> download zip, and extract it in local
3. Or run `git clone https://github.com/PoonkasemK/Sharitys` in command prompt![vs](https://user-images.githubusercontent.com/75840386/121769638-f15b0200-cb8e-11eb-93ab-37728608de46.JPG)
4. Open the repository in Visual Studio Code
5. Open terminal in Visual Studio code (or command prompt, if preferred), locate Front folder `cd Front` and run `npm i` to install node module
6. Also locate Back folder `cd Back` and run `npm i`
7. In case there are an vulnerabilities warning after installing, use `npm audit fix --force` to solve

### Setting Up database

1. Create a new database in pgAdmin
2. In VS code, Open database.sql in Back folder (If any warning come out, close it) ![sql](https://user-images.githubusercontent.com/75840386/121769991-dee1c800-cb90-11eb-9816-be2abe990509.JPG)
3. Copy the content inside database.sql, and query it in the newly created database. This will create a proper database with sample project in it ![db](https://user-images.githubusercontent.com/75840386/121770442-83650980-cb93-11eb-9b98-e7b7beb9e62f.JPG)

4. Open db.js, uncomment `// const pool = new Pool({
//   user: "ymzexsjcrviqmb",
//   password: "33fd9fccb7182c4d7aac0e7fbe83db1c68be780ad52185e8928c577b938e7a49",
//   host: "ec2-107-22-83-3.compute-1.amazonaws.com",
//   port: 5432,
//   database: "d31fi06dh1fhkn",
// });` and comment out `const pool = new Pool({
  connectionString:
    "postgres://ymzexsjcrviqmb:33fd9fccb7182c4d7aac0e7fbe83db1c68be780ad52185e8928c577b938e7a49@ec2-107-22-83-3.compute-1.amazonaws.com:5432/d31fi06dh1fhkn",
  ssl: {
    rejectUnauthorized: false,
  },
});`
5. user: "postgres", password: database password, host: "localhost", port: 5432, database: database name

### Creating firebase (Optional)

- There is an existing firebase which allows user to login and register as donor and fundraiser. However, admin is not allowed to register in the website.
- To manage account, as well as registering admin, create a project in firebase and edit the information in key.js in Front folder

### Starting Sharitys

![inex](https://user-images.githubusercontent.com/75840386/121770721-3eda6d80-cb95-11eb-987a-f5026231f182.JPG)

1. In both Back and Front folder, in terminal or command prompt, use `npm start` respectively
2. Upon using `npm start` in Front folder, the default browser will automatically open Sharitys in localhost:3000

### Accessible Function

**Annonymous donor (Not logging in)**

- All project / Project type: Show every project in Sharitys, or filter using type
- Contact us: The information of the web creator
- Search: Search the project using a keyword
- Project Information: Show the status, owner, social media, gift, online sharing and time left of the project
- Project Update: See the latest update from the project's owner
- Project Status: Satch the list of donor of the project
- Donate: using A credit/debit card or internet banking to donate
- Login: Login as Fundraiser, Fonor or Admin
- Register: Register as Donor or Fundraiser

![donor](https://user-images.githubusercontent.com/75840386/121796104-c204cd80-cc40-11eb-88dd-e94eb0f1b879.JPG)

**Donor**
- All project / Project type: Show every project in Sharitys, or filter using type
- Contact us: The information of the web creator
- Search: Search the project using a keyword
- Project Information: Show the status, owner, social media, gift, online sharing and time left of the project
- Project Update: See the latest update from the project's owner
- Project Status: Satch the list of donor of the project
- Donate: using A credit/debit card or internet banking to donate
- Donor's information: Show name, email and sign in method of the currently logged in donor
- Payment method: Show the used payment method of the donor
- History: Show the donate history of the donor
- Sign out: log out

![fd](https://user-images.githubusercontent.com/75840386/121796178-64bd4c00-cc41-11eb-8df0-2fc555a13d14.JPG)

**Fundraiser**
- Suggestion article: Contains useful information for fundraisers
- Create project: Create a new project
- Manage project: See information, edit and withdraw fund of the own project
- Contact us: The information of the web creator
- Search: Search the project using a keyword
- Fundraiser's information: Show name, email and sign in method of the currently logged in fundraiser
- Sign out: log out

![ad](https://user-images.githubusercontent.com/75840386/121796406-ebbef400-cc42-11eb-9be1-133f4d424adb.JPG)

**Admin**
- All project / Project type: Show every project in Sharitys, or filter using type
- Approve project: Approve the requested project from fundraiser
- Manage all project: Edit or terminate any project
- Terminate time out project: Terminate the project that exceeding the active time
- Terminate requested project: Terminate the project that is requested by the fundraiser
- Set urgent project: Set the project to be urgent to be shown in urgent project type
- Search: Search the project using a keyword
- Sign out: log out

### Remark

- The project mostly use Thai language
- The project can be run without database setup, but no project will be shown 
- This senior project is a Copyright of Mahidol University
