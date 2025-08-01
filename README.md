# Filmverse - Movie & TV Show Discovery Platform

A modern, full-stack movie and TV show discovery platform built with React, featuring Firebase authentication, TMDB API integration, and a sleek dark theme interface for the ultimate entertainment browsing experience.

## 🌐 Live Demo

**Experience Filmverse live:** [https://filmverse-website.vercel.app/](https://filmverse-website.vercel.app/)

## 📄 Project Screenshots

[View Website Screenshots ](https://drive.google.com/file/d/1qHZRGW9utktyuNqJeOYdH8jgd8C2bnZu/view?usp=sharing)

Try it out! Browse movies, create an account, and explore all features without any setup required.

## 🏠 Project Overview

Filmverse is a comprehensive entertainment platform that allows users to discover, track, and manage their favorite movies and TV shows. The application provides a seamless experience from browsing trending content to maintaining personal watchlists and user profiles, all wrapped in a beautiful, responsive interface with smooth animations.

## ✨ Features

### User Features
- **Account Management**: User registration, login, and personalized profile dashboard
- **Content Discovery**: Browse movies and TV shows with rich metadata from TMDB
- **Trending Content**: Stay updated with daily trending movies and shows
- **Personal Favorites**: Create and manage your personal watchlist (requires authentication)
- **Advanced Search**: Search across movies and TV shows with real-time filtering
- **Genre Exploration**: Discover content by genre categories
- **Profile Dashboard**: Personalized user interface with favorites and trending content
- **Category Filtering**: Filter by Popular, Top Rated, Now Playing, and more

### Technical Features
- **Firebase Authentication**: Secure user registration and login system
- **Real-time Data**: TMDB API integration for up-to-date movie information
- **Data Persistence**: Firebase Firestore for storing user favorites and profile data
- **Responsive Design**: Seamless experience across all device sizes
- **AOS Animations**: Smooth scroll animations and transitions
- **Protected Routes**: Authentication-required features for personalized content

## 🛠️ Technology Stack

### Frontend
- React.js 19.1.0 with React Router DOM for navigation
- Tailwind CSS 3.3.5 for responsive styling
- AOS (Animate On Scroll) for smooth animations
- Swiper.js for interactive carousels
- Formik & Yup for form validation
- Axios for API communication
- FontAwesome for icons

### Backend & Services
- Firebase Authentication for user management
- Firebase Firestore for data storage
- Firebase Analytics for usage tracking
- TMDB API for movie and TV show data

### Development Tools
- Vite for fast development and building
- ESLint for code quality
- PostCSS and Autoprefixer for CSS processing

### Deployment
- **Vercel** for hosting and continuous deployment
- Environment variables securely managed through Vercel dashboard

## 🔒 Security Note

This project uses environment variables to securely manage API keys. You'll need to set up your own Firebase project and TMDB API account to run the application locally.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 16.0 or higher)
- [Git](https://git-scm.com/downloads) (optional, for cloning)
- **Firebase account** for authentication and database
- **TMDB API account** for movie data

### Note for New Users
- **Just want to try it?** Visit the [live demo](https://filmverse-website.vercel.app/) - no setup required!
- **Want to contribute or customize?** Follow the installation steps below
- You don't need extensive React or Firebase experience to run this application locally

### Installation & Setup

#### Step 1: Clone and Install

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/filmverse.git
   cd filmverse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

#### Step 2: Environment Variables Setup

1. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   Or manually create a `.env` file in the root directory.

2. **Configure your environment variables**
   Open the `.env` file and replace the placeholder values with your actual API keys:
   ```env
   # TMDB API Configuration
   VITE_TMDB_API_KEY=your_actual_tmdb_api_key

   # Firebase Configuration  
   VITE_FIREBASE_API_KEY=your_actual_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_actual_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
   VITE_FIREBASE_APP_ID=your_actual_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_actual_measurement_id
   ```

   ⚠️ **Important**: Never commit your `.env` file to version control. It contains sensitive information.

#### Step 3: Get Your API Keys

##### TMDB API Key
1. Create an account at [TMDB](https://www.themoviedb.org/settings/api)
2. Go to Settings → API
3. Generate an API key
4. Copy the key to your `.env` file as `VITE_TMDB_API_KEY`

##### Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Go to Project Settings → General → Your apps
4. Click "Add app" and select Web (</>) if you haven't already
5. Copy each configuration value to your `.env` file

**Firebase Services Setup:**
- **Authentication**: Enable Email/Password provider
- **Firestore**: Create database in test mode
- **Analytics**: Optional, but recommended

#### Step 4: Start the Application

1. **Verify your environment setup**
   Make sure all variables in `.env` have actual values (no placeholders)

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Environment Variables Reference

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `VITE_TMDB_API_KEY` | TMDB API access key | [TMDB API Settings](https://www.themoviedb.org/settings/api) |
| `VITE_FIREBASE_API_KEY` | Firebase Web API Key | Firebase Project Settings |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | Firebase Project Settings |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID | Firebase Project Settings |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | Firebase Project Settings |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID | Firebase Project Settings |
| `VITE_FIREBASE_APP_ID` | Firebase App ID | Firebase Project Settings |
| `VITE_FIREBASE_MEASUREMENT_ID` | Firebase Analytics Measurement ID | Firebase Project Settings (optional) |

## 🐛 Troubleshooting

### Environment Variables Issues
- **"API key not defined" error**: Check that your `.env` file exists and has the correct variable names with `VITE_` prefix
- **Variables not loading**: Restart the development server after modifying `.env`
- **Firebase connection failed**: Verify all Firebase configuration variables are correct
- **TMDB data not loading**: Check that your TMDB API key is valid and has proper permissions

### Common Setup Issues
1. **Missing .env file**: Copy `.env.example` to `.env` and fill in your actual values
2. **Wrong variable names**: Ensure all variables start with `VITE_` prefix
3. **Spaces in .env**: Don't add spaces around the `=` sign in your `.env` file
4. **Cached environment**: Clear browser cache and restart dev server if changes aren't reflected

### First-Time Setup Help
If you're new to Firebase or TMDB:
- Both services offer generous free tiers
- No payment required for development/testing
- Firebase setup wizard guides you through the process
- TMDB API key generation is instant and free

## 📋 Usage Guide

### For Regular Users (Live Demo)
Visit [https://filmverse-website.vercel.app/](https://filmverse-website.vercel.app/) and enjoy:

#### Browsing Without an Account
- Visit the homepage to see trending content and featured movies
- Browse movies and TV shows by category
- Use search functionality to find specific content
- View detailed information about any movie or show
- Explore different genres through the genre grid

#### Creating an Account
1. Click the profile icon in the navigation bar
2. Select "Sign Up" to create a new account
3. Fill in your email and password
4. Complete the registration process

#### Using Authenticated Features
- **Favorites**: Add movies and shows to your personal favorites list
- **Profile Dashboard**: Access your personalized profile with favorites and trending content
- **Wishlist Management**: Organize and manage your saved content

### Key Features Walkthrough

#### Home Page
- **Header Slider**: Featured content with stunning background images
- **Content Sections**: Top Rated Movies, Popular Movies, TV Series
- **Genre Grid**: Quick navigation to different content categories
- **Trending Section**: Currently trending movies and shows with AOS animations

#### Movies & TV Shows Pages
- **Category Filtering**: Popular, Top Rated, Now Playing options
- **Search Functionality**: Real-time search within content
- **Responsive Grid**: Adaptive layout for different screen sizes
- **Direct Navigation**: Click any poster for detailed information

#### Profile Dashboard (Authentication Required)
- **User Information**: Display name and profile customization
- **Favorites Section**: Quick access to your saved content
- **Trending Sidebar**: Personalized trending content recommendations
- **Statistics**: Overview of your favorites and activity

#### Favorites Management (Authentication Required)
- **Personal Collection**: All your saved movies and shows
- **Filter Options**: View all content or filter by type
- **Content Statistics**: Breakdown of movies vs TV shows
- **Easy Management**: Add or remove items with simple interactions

## 📁 Project Structure

```
filmverse/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── imgs/                    # Static images and assets
│   ├── components/
│   │   ├── CardSlider/              # Movie/TV show carousels
│   │   ├── Footer/                  # Application footer
│   │   ├── GenreGrid/               # Genre selection grid
│   │   ├── HeaderSlider/            # Hero section slider
│   │   ├── HeartLoader/             # Custom loading animation
│   │   ├── Layout/                  # Main layout wrapper
│   │   ├── Loader/                  # Loading components
│   │   ├── Navbar/                  # Navigation with authentication
│   │   ├── NotAuth/                 # Unauthorized access handler
│   │   ├── ProfileSideBar/          # Profile page sidebar component
│   │   ├── ProtectedRoute/          # Route protection
│   │   ├── ScrollToTop/             # Scroll behavior management
│   │   ├── SearchInput/             # Search functionality
│   │   └── Trending/                # Trending content section
│   ├── context/
│   │   ├── Favorite.Context.jsx     # Wishlist state management
│   │   └── User.context.jsx         # User authentication state
│   ├── pages/
│   │   ├── CardDetails/             # Detailed movie/show information
│   │   ├── Favorite/                # User favorites page
│   │   ├── Genres/                  # Genre browsing
│   │   ├── Home/                    # Main landing page
│   │   ├── Login/                   # User authentication
│   │   ├── Movies/                  # Movies catalog
│   │   ├── NotFound/                # 404 error page
│   │   ├── Profile/                 # User profile dashboard
│   │   ├── Series/                  # TV series catalog
│   │   ├── Signup/                  # User registration
│   │   ├── TvShows/                 # TV shows browsing
│   │   └── ViewAll/                 # Complete content listings
│   ├── firebase.js                  # Firebase configuration
│   ├── App.jsx                      # Main application component
│   └── main.jsx                     # Application entry point
├── package.json                     # Dependencies and scripts
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind CSS configuration
└── README.md                        # This file
```

## 🔧 Development Guide

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

### Making Changes

#### Frontend Development
- Changes in the `src` directory will automatically reflect due to Vite's hot reloading
- Component structure follows a modular approach for easy maintenance
- Tailwind CSS classes provide responsive design out of the box

#### Adding New Features
- Follow the existing component structure in the `components` directory
- Use the context API for state management (User and Favorites contexts)
- Implement proper error handling and loading states

### Firebase Configuration

#### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /favorites/{document} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

#### Authentication Configuration
- Email/Password authentication is enabled by default
- User profiles are created automatically upon registration
- Display names can be set during registration or updated later


## 🐛 Troubleshooting

### Common Issues

1. **Firebase Connection Problems**
   ```bash
   # Check your Firebase configuration in src/firebase.js
   # Ensure all required Firebase services are enabled
   # Verify internet connection for Firebase services
   ```

2. **TMDB API Rate Limits**
   ```bash
   # TMDB has request limits - if exceeded:
   # Wait for the rate limit to reset (usually 10 seconds)
   # Consider implementing request caching for production
   ```

3. **Authentication Issues**
   ```bash
   # Clear browser cache and localStorage
   # Check Firebase Authentication settings
   # Verify email/password meet Firebase requirements
   ```

4. **Build or Development Issues**
   ```bash
   # Clear dependencies and reinstall
   rm -rf node_modules package-lock.json
   npm install
   
   # Clear Vite cache
   npm run dev -- --force
   ```

### For Non-Developers

If you're not familiar with React development:

1. **Just want to use the app?** Visit the [live demo](https://filmverse-website.vercel.app/)

2. **Simple restart solution**: Most local issues can be resolved by:
   ```bash
   # Stop the server (Ctrl+C) and restart
   npm run dev
   ```

3. **Browser issues**: 
   - Clear your browser cache and cookies
   - Try using an incognito/private browsing window
   - Ensure JavaScript is enabled in your browser

4. **First-time setup**: 
   - Initial loading may take longer while dependencies download
   - Ensure you have a stable internet connection
   - Follow the setup steps carefully, especially Firebase configuration


## 🙏 Acknowledgments

- **[TMDB](https://www.themoviedb.org/)** for providing comprehensive movie and TV show data
- **[Firebase](https://firebase.google.com/)** for authentication and database services
- **[Vercel](https://vercel.com/)** for seamless hosting and deployment
- **[React](https://reactjs.org/)** for the component-based UI framework
- **[Tailwind CSS](https://tailwindcss.com/)** for utility-first styling
- **[Swiper.js](https://swiperjs.com/)** for smooth, responsive carousels
- **[AOS](https://michalsnik.github.io/aos/)** for beautiful scroll animations
- **[Vite](https://vitejs.dev/)** for fast development and building

---

## 👤 Author

**Mariam Kilany**  
- 🌐 **Live Project**: [https://filmverse-website.vercel.app/](https://filmverse-website.vercel.app/)
- 💼 **GitHub**: [https://github.com/Mariam-44]
- 📧 **Email**: [mariam.kilany44@gmail.com]

---

Made with ❤️ for movie and TV show enthusiasts