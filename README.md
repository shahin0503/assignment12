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

![Screenshot_1700831263](https://github.com/shahin0503/assignment12/assets/144336102/7061c50d-37c4-4373-9334-7728b861c5ad)  ![Screenshot_1700831184](https://github.com/shahin0503/assignment12/assets/144336102/69aed7ab-c024-4734-9b9f-2dc36d344a01)
![Screenshot_1700838348](https://github.com/shahin0503/assignment12/assets/144336102/28788049-bb50-4183-8509-0ad28efe9760)
![Screenshot_1700838499](https://github.com/shahin0503/assignment12/assets/144336102/b9b16eae-93ed-4cd0-b94a-99e55195b686)
![Screenshot_1700838493](https://github.com/shahin0503/assignment12/assets/144336102/d334b8fa-2a8a-40c5-8f8b-171bc4a2f2e5)
![Screenshot_1700838475](https://github.com/shahin0503/assignment12/assets/144336102/b9ec14b8-d19f-47fe-a63a-8c82e371ecb8)
![Screenshot_1700838450](https://github.com/shahin0503/assignment12/assets/144336102/0ab3bbe6-629f-48c6-96bd-a31ad103389a)
![Screenshot_1700838390](https://github.com/shahin0503/assignment12/assets/144336102/5dce3a58-1dea-45be-8298-d9e200c92963)
![Screenshot_1700838368](https://github.com/shahin0503/assignment12/assets/144336102/5d8f61cf-9b4b-4222-bda9-0e0f07f41afe)
![Screenshot_1700838360](https://github.com/shahin0503/assignment12/assets/144336102/7abba52d-9a1a-4c18-bb8b-bf853d78fe76)
![Screenshot_1700838587](https://github.com/shahin0503/assignment12/assets/144336102/aa2b8878-4c24-4724-9686-1628e76890bd)
![image](https://github.com/shahin0503/assignment12/assets/144336102/09c78f47-9bbd-4ea6-bf1e-c3739fcec44c)

![Screenshot_1700838578](https://github.com/shahin0503/assignment12/assets/144336102/eae37ed3-bba6-4fef-845b-0f432680273a)
![Screenshot_1700838574](https://github.com/shahin0503/assignment12/assets/144336102/dc0119f8-2cdf-48eb-8604-dac993284690)
![Screenshot_1700838560](https://github.com/shahin0503/assignment12/assets/144336102/93a6c9d4-f4c4-4ddf-9abd-2bc5f1839f19)
![Screenshot_1700838548](https://github.com/shahin0503/assignment12/assets/144336102/56d0b020-20fe-468d-8827-4cf6ecaad62c)
![Screenshot_1700838535](https://github.com/shahin0503/assignment12/assets/144336102/e150d9c8-9c74-4eda-9a0f-c699a3f52d20)
![Screenshot_1700838529](https://github.com/shahin0503/assignment12/assets/144336102/cfb343cf-be61-448a-8367-c22b84a1a567)
![Screenshot_1700838513](https://github.com/shahin0503/assignment12/assets/144336102/3efedf86-2fc9-47d6-828a-3479c65dd6d8)
![Screenshot_1700838508](https://github.com/shahin0503/assignment12/assets/144336102/6f049fd6-f64c-4d7b-b2e6-80db5812b54d)


