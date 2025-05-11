# 📱 Responsive Web Application

## 📄 Project Description

In this project, we develop a fully responsive web application that showcases proficiency in frontend technologies, API integration, and user authentication. Using Next.js and Tailwind CSS, we created a dynamic app with features like user profiles, post listings with comments, data visualizations using ApexCharts, and a registration/login system.

## ✨ Key Features

- 👤 **User Profiles**: Users can create and manage their profiles.  
- 📝 **Post Listings**: Users can view and interact with posts, including adding comments.  
- 📊 **Data Visualizations**: Visualize data insights through interactive charts using ApexCharts.  
- 🔐 **Authentication**: A secure registration and login system for user authentication.

## 🛠️ Setup and Installation

Follow these steps to set up the project locally:

### 1. 🧩 Install Required Tools

- 🖥 **Visual Studio Code**: [Download VS Code](https://code.visualstudio.com/download)  
- 🟩 **Node.js (LTS version)**: [Download Node.js](https://nodejs.org/en/download)

### 2. ⚙️ Create a Next.js Project

Use the official `create-next-app` command to initialize your project:

```bash
npx create-next-app@latest my-project --typescript --eslint --app
cd my-project
```

### 3. 🎨 Install Tailwind CSS with Next.js

Set up Tailwind CSS in your Next.js project:

#### a. Install Tailwind and dependencies

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

#### b. Configure PostCSS

Create a `postcss.config.mjs` file in your project root with the following content:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

#### c. Import Tailwind in your global CSS

Open `./src/app/globals.css` and add:

```css
@import "tailwindcss";
```

### 4. 📦 Install Project Dependencies

```bash
npm install apexcharts react-apexcharts zod
```

### 5. 🚀 Run the Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 👥 Team Member Contributions

### 🧩 Rina Geronimo & Salve Gimeno
- Developed the main application features and implemented core functionalities.  
- Contributed to backend integration and API setup.  
- Designed and coded the UI components using Tailwind CSS.  
- Worked on responsive design to enhance user experience.

### 🎨 Shiela Mae Alcaraz & Phil Bryant Prieto
- Participated on the overall layout design  
- Collaborated on design reviews to align with project goals.  
- Focused on making the layout fully responsive for a smooth user experience across devices

### 🧑‍🤝‍🧑 All Members
- Collaboratively wrote the README file that includes:  
  - Project Description: An overview of the application and its purpose.  
  - Setup and Installation Instructions: Steps for running the application locally.
