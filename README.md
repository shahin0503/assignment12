## Introduction
The Blogfolio project stands as a personal portfolio and blog platform, highlighting a diverse array of features and technologies. It serves as a showcase for seamlessly integrating frontend and backend technologies. Detailed information regarding the backend and frontend components, along with insights into the database and other pertinent tools employed in this project, can be found below.

## Backend
The backend architecture of this project is crafted with MongoDB, Firebase storage, Node.js and Express, offering the following functionalities:

### Technologies used
-   bcrypt: Utilized for encrypting and hashing passwords.
-   express: The Node.js framework for constructing the RESTful API.
-   jsonwebtoken (JWT): Deployed for generating secure authentication tokens.
-   mongoose: ORM for MongoDB
-   nodemailer: Facilitates the sending of emails for contact form functionality.
-   firebase-storage: Used to store the blog images and user profile pictures

## Features

 1. User Authentication: Ensures secure user access through robust login and registration processes.
 2. User Profile Management: Allows users to update their profiles, including bio, contact information, and profile pictures.
3. Portfolio Section: Facilitates the storage of project information, encompassing descriptions, technologies used, and project links.
4. Blog Section: Supports rich-text formatting and image embedding in blog posts, along with a Comment section.
5. Contact Form: Enables users to easily reach out through a contact form.

## Setup
Setup: Prerequisites: Ensure Node.js is installed on your system. You can download it [Here](https://nodejs.org/en/download).

#### Installation

##### 1. Clone the repository to your local machine.

```
git clone https://github.com/shahin0503/assignment12.git
cd Backend
```

##### 2. Install the project dependencies using npm.
```
npm install
```

##### 3. Set up environment variables by creating a .env file in the Backend folder.

You will need to define the following variables:

- MONGO_URI : URI of the mongodb database
- MAILTRAP_USER: username of your mailtrap account, you can signup from [here](https://mailtrap.io/register/signup)
- MAILTRAP_PASSWORD: password of your mailtrap account
- JWT_SECRET: A Secret key for JWT authentication
- PORT: The port number where the backend server will run

##### 4. start the server
```
npm start
```

### API Endpoints:

**Here is an overview of API endpoints, for more detailed information, please refer to the [API Documentation]( ).**

#### Authentication:

| Method |  End Point  | Description | Auth Token Required |
| :----: | :---------: | :---------: | :-----------------: |
|  POST  | /users/signup |   Signup    |                     |
|  POST  | /users/login  |    Login    |                     |

#### Blogs:

| Method | End Point |  Description  | Auth Token Required |
| :----: | :-------: | :-----------: | :-----------------: |
|  GET   |   /blogs   | Get All Blogs |       &#9745;       |
|  GET   |   /blogs/:id   | Get Blog data with comments |       &#9745;       |
|  POST  |   /blogs   | Create New Blog |       &#9745;       |
|  PUT   | /blogs/:id  |  Update Blog  |       &#9745;       |
| DELETE | /blogs/:id  |  Delete Blog  |       &#9745;       |

#### Comments:

| Method |  End Point  |     Description      | Auth Token Required |
| :----: | :---------: | :------------------: | :-----------------: |
|  POST  | /comments/   |   Create New Comment   |       &#9745;       |
|  PUT   | /comments/:id | Update Comment |       &#9745;       |
|  DELETE   | /comments/:id | Delete Comment |       &#9745;       |

#### Projects:

| Method |   End Point   |     Description      | Auth Token Required |
| :----: | :-----------: | :------------------: | :-----------------: |
|  POST  |  /projects   |  Create New Project  |       &#9745;       |
|  PUT   |  /projects/:id    |   Update Project   |       &#9745;       |
| DELETE |  /projects/:id    |   Delete Project   |       &#9745;       |

#### Contact Form:

| Method |   End Point   | Description | Auth Token Required |
| :----: | :-----------: | :---------: | :-----------------: |
|  POST  | /email | Send Email  |       &#9745;       |

#### Users:

| Method | End Point  |     Description     | Auth Token Required |
| :----: | :--------: | :-----------------: | :-----------------: |
|  GET   | /users    |    Get All Users    |       &#9745;       |
|  PUT   | /users    | Update User Details |       &#9745;       |
|  GET   | /users/:id    | Get User Details |       &#9745;       |
|  GET   | /users/:id/projects    | Get User Details with Projects |       &#9745;       |

## Frontend

The frontend of this project is built using Flutter native mobile application views for Android. It provides the following features:

### Technologies Used

- **Flutter**: The framework for building the mobile applications.
- **dio**: HTTP client for making API requests to the backend.
- **go_router**: Routing package for navigation within the app.
- **image_picker**: Allows users to pick images from their device.
- **provider**: Used for state management within the application.
- **BLoC**: Used for state management within the application.
- **webview_flutter**: Provides a WebView widget for displaying web content.

### Installation

#### Prerequisites

<b>Flutter:</b> Ensure you have Flutter installed on your development machine. You can find installation instructions at [flutter.dev](https://docs.flutter.dev/get-started/install).

#### Getting Started

##### 1. Clone the repository to your local machine.

```
git clone https://github.com/shahin0503/assignment12.git
cd Frontend
```

##### 2. Install the project dependencies using Flutter's package manager, pub.

```
flutter pub get
```

##### 3. Set up the backend endpoint in the Flutter code. Open the <u><i>lib/constant/constant.dart</i></u> and specify the URL of your Gossip Grove backend API in <u><i>baseUrl</i></u> variable.

```
const baseUrl = 'https://your-server-url.com';
```

##### 4. Build and run the Flutter app on your preferred platform (iOS or Android).

```
flutter run
```
### Screenshots

<p align="center">
<img src="https://github.com/shahin0503/assignment12/assets/144336102/7061c50d-37c4-4373-9334-7728b861c5ad" width="231" height="500" align="left">
<img src="https://github.com/shahin0503/assignment12/assets/144336102/69aed7ab-c024-4734-9b9f-2dc36d344a01" width="231" height="500" align="center">
<img src="https://github.com/shahin0503/assignment12/assets/144336102/196c45c7-35b2-40f2-8f6f-3aab0e2dafba" width="231" height="500" align="right">
</p>

<p align="center">
 <img src="https://github.com/shahin0503/assignment12/assets/144336102/26d4ac2d-220f-4d9f-ba9a-51962a51e33e" width="231" height="500" align="left"/>
 <img src="https://github.com/shahin0503/assignment12/assets/144336102/f1b1cd8d-127c-4e0b-9ab5-1af67c441032" width="231" height="500" align="center"/>
 <img src="https://github.com/shahin0503/assignment12/assets/144336102/09c78f47-9bbd-4ea6-bf1e-c3739fcec44c" width="231" height="500" align="right"/>
</p>

<p align="center">
 <img src="https://github.com/shahin0503/assignment12/assets/144336102/1433fffd-2d3e-4875-81b2-1440badb1fa8" width="231" height="500" align="left"/>
 <img src="https://github.com/shahin0503/assignment12/assets/144336102/7e4c3efb-2dd3-4a69-96fc-02d580d6584c" width="231" height="500" align="center"/>
 <img src="https://github.com/shahin0503/assignment12/assets/144336102/ca24242a-4f76-405e-960c-de7dfdc5b7d6" width="231" height="500" align="right"/>
</p>

<p align="center">
 <img src="https://github.com/shahin0503/assignment12/assets/144336102/099a6b54-be22-4b3d-bf60-7b313fb69a56" width="231" height="500" align="left"/>
 <img src="https://github.com/shahin0503/assignment12/assets/144336102/f98df48e-8629-4091-b7ca-4edf704b5a9a" width="231" height="500" align="center"/>
 <img src="https://github.com/shahin0503/assignment12/assets/144336102/f15392a9-8d48-4929-962f-bbb1cd249624" width="231" height="500" align="right"/>
</p>

<p align="center">
 <img src="https://github.com/shahin0503/assignment12/assets/144336102/1093f2dc-6bab-4abf-a0e3-df4d7a19a050" width="231" height="500" align="left"/>
 <img src="https://github.com/shahin0503/assignment12/assets/144336102/617ee774-22eb-44ca-a570-f0127d15743c" width="231" height="500" align="center"/>
 <img src="https://github.com/shahin0503/assignment12/assets/144336102/07960bb3-c435-4dc8-aebe-a6221d3ac83a" width="231" height="500" align="right"/>
</p>

<p align="center">
 <img src="https://github.com/shahin0503/assignment12/assets/144336102/c1530094-7a50-47ee-af41-a6f6d481c1ca" width="231" height="500" align="left"/>
 <img src="https://github.com/shahin0503/assignment12/assets/144336102/c51d0f5e-9a05-46ad-b1d4-21946950877f" width="231" height="500" align="center"/>
 <img src="https://github.com/shahin0503/assignment12/assets/144336102/38548787-f0ea-4117-b1af-8ff129d3d134" width="231" height="500" align="right"/>
</p>

<p align="center">
 <img src="https://github.com/shahin0503/assignment12/assets/144336102/473d0f62-8ea7-4279-9c84-2d5807fe8469" width="231" height="500" align="left"/>
 <img src="https://github.com/shahin0503/assignment12/assets/144336102/cd221140-3905-4799-a347-ce293a475120" width="231" height="500" align="center"/>
 <img src="https://github.com/shahin0503/assignment12/assets/144336102/91df6411-3216-4d67-9766-514203d2e746" width="231" height="500" align="right"/>
</p>


### Video
https://drive.google.com/file/d/1K_cXF1-2ib7dEJUKRhsaj7cWA7wyH0vS/view?usp=sharing
