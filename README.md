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
3. Copy the content inside database.sql, and query it in the newly created database. This will create a proper database with sample project in it
4. 
