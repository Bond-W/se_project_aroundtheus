# Around The U.S.

This project is a responsive web application showcasing user profiles and an interactive gallery of photos from beautiful locations around the U.S. Users can add, edit, delete, and like photos, as well as manage their profile information.

---

## Table of Contents

* [Overview](#overview)
* [Features](features)
* [Demo](#demo)
* [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
* [Technologies Used](#technologies-used)
* [Project Structure](#project-structure)
* [API Reference](#api-reference)
* [Acknowledgments](#acknowledgments)

---

## Overview
"Around the U.S" is an interactive web application where users can:
- View and like images in a photo gallery.
- Add new photos to the gallery.
- Edit their profile, including updating their name, description, and avatar.
- Delete photos with confirmation prompts.

The project follows modern web development practices, including modular JavaScript and reusable components. It also integrates with a backend API for data persistence and real-time updates.

---

## Features
- **User Profile Management:**
  - Edit user name and bio.
  - Update profile picture.

- **Photo Gallery:**
  - View photos in an interactive, responsive grid layout.
  - Add new photos with titles and image URLs.
  - Like/unlike photos.
  - Delete photos with confirmation.

- **Form Validation:**
  - Real-time validation for form inputs.
  - Visual feedback for invalid fields.

- **Responsive Design:**
  - Fully responsive layout for seamless use on desktop and mobile devices.

---

## Demo
Here's a live demo of the application: [Around the U.S. Demo](https://youtu.be/gasCAy2Ttsg)

_Screenshots:_

**Main Page:**
![Main Page](#)

**Edit Profile Modal:**
![Edit Profile](#)

**Add New Photo Modal:**
![Add Photo](#)

---

## Getting Started

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/bond-w/around-the-us.git

2. Navigate to the project directory:
   ```bash
   cd around-the-us

3. Install the dependencies:
   ```bash
   npm install

## Usage
1. Start the development server:
   ```bash
   npm run dev

2. Build the project for production:
   ```bash
   npm run build

3. Deploy or serve the build locally:
   ```bash
   npm run serve

---

## Technologies Used
- **HTML5** for semantic markup.
- **CSS3** for responsive styling.
- **JavaScript (ES6)** for application logic.
- **Webpack** for module bundling.
- **Babel** for transpilation.
- **API Integration** for backend communication.

---

## Project Structure
src/ ├── components/ # Reusable JavaScript components ├── images/ # Static images ├── pages/ # Main entry point (index.css, index.js) ├── utils/ # Constants and utility functions ├── index.html # Main HTML file webpack.config.js # Webpack configuration

---

## API Reference
The application uses an external API for user and photo management. Below is a summary of the key endpoints:

### Users
- **Get user info:** `GET /users/me`
- **Update user info:** `POST /cards`
- **Update avatar:** `PATCH /users/me/avatar`

### Cards (Photos)
- **Get all cards:** `GET /cards`
- **Add new card:** `POST /cards`
- **Delete card:** `DELETE /cards/:id`
- **Like a card:** `PUT /cards/:id/likes`
- **Unlike a card:** `DELETE /cards/:id/likes`

---

## Acknowledgments
- **Practicum by TripleTen** for providing project inspiration and initial resources as well as support from staff.
- **OpenWeather** API for backend integration examples.

