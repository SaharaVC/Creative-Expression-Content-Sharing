# Creative Expression Content Sharing: Xpression

## Milestone 1: Project Proposal

### Concept of Application: 
Xpression is a platform where artists, writers, and musicians can publish their work, receive feedback, and build a personal portfolio. Unlike general social media, Xpression is designed around the creative process, writing, visual art, and music in a single space.

### Problem Statement
Being an independent creator often means that having to manage multiple platforms for specific media is the norm. Writers use Substack, artists are on Instagram, musicians create on SoundCloud, and none of them talk to each other. This leaves feedback from many different creatives with different perspectives scattered, and creatives are expected to maintain five different profiles just to reach an audience, with their creative identity getting lost in the process. The platforms also aren't built for creativity, but for attention. The algorithm rewards what goes viral, not what's genuine, and real feedback gets buried under likes and empty comments. Creators deserve better than that.


#### This creates two main problems:

It’s difficult to show off multiple creative skills in the same place, leaving creatives to split up their work onto different platforms
Feedback quality is poor with platforms rewarding passive likes rather than constructive criticism that actually helps creators grow.

Xpression solves both by providing a unified creative portfolio space with a structured, community-driven feedback system.

## Target Users
**Xpression is designed for:**
Student creators (high school and college) exploring writing, art, or music as serious pursuits
Hobby artists and writers who want an audience beyond close friends
Creators who produce work across more than one medium
Small creative communities (art clubs, writing groups, music collectives) seeking a shared space


## Value Proposition
**Xpression offers three core advantages over existing alternatives:**

* One Portfolio for All Media: Writing, art, and music posts live together on a single profile, no platform-hopping.
* Structured Feedback Comment: templates guide reviewers toward constructive critique ("What worked?", "What could improve?") rather than passive likes.
* Discovery Without Algorithm Gaming: Browse by medium, tag, or recency rather than engagement score, giving newer creators equal visibility.

## Minimum Viable Product (MVP)
**The MVP will include the following core features:**
* User registration, login, and public profile page
* Post creation for three media types: text (writing), image (art), and music (Spotify track link + embedded player)
* Community feed showing recent posts, filterable by medium
* Structured feedback comments on any post
* Follow system: follow creators and see their posts in a personalized feed
* Notification system to alert users of new interactions

## External API Integration

### External APIS: 
1. https://developers.giphy.com/explorer/
2. https://api.soundcloud.com

### Types of data it provides:
* GIF API: Access to a massive library of animated GIFs, including search results, trending content, and multiple media formats (e.g., tinygif for previews, gif for full resolution, and mp4 for optimized video playback).
* Soundcloud API: Music resource data including track titles, artist information, durations, and permalink URLs. It also provides streamable URLs (for authorized tracks) and oEmbed data, enabling the generation of embedded player widgets.

### How our application will use this data:

To enhance visual expression and community engagement, Xpression will integrate the Giphy  API, allowing users to attach GIFs to structured feedback comments(and to add a laugh) and provide a "visual shorthand" for critiques like "what worked" or "what could improve". For music creators, the system will utilize the SoundCloud API to link existing tracks and use oEmbed functionality to generate functional mini-players directly on user profiles and the community feed. This dual integration ensures musicians can showcase high-quality work without the platform needing to host large audio files, while both APIs enrich search and discovery by allowing users to filter the community feed by specific moods or genres

## System Modules

* Authentication/login
* User profiles
* Notifications
* Following/suggested feed


### Entities/Data Objects

```
User
    id (pk)
    name
    email
    password

Post
    id (pk)
    media type
    date
    caption
    comment (fk)

Comment
    id (pk)
    user (fk)
```

## Data Flow Diagram
<img width="647" height="473" alt="image" src="https://github.com/user-attachments/assets/254262a3-b09f-415e-93eb-bd796d56f2e7" />

## Architecture Diagram
<img width="658" height="497" alt="image" src="https://github.com/user-attachments/assets/4478a3b9-0972-4456-a362-bef04da8757e" />

---
## Milestone 2: Product Backlog

### High Priority
* **User Registration:** As a new user, I want to create an account registered with my email address and a password so I can access the platform
* **User Login and Authentication:** As a returning user, I want to be able to log in with my information securely so I can access my profile and feed 
* **Post Creation:** As an active user, I want to be able to write text, post images, and directly link music on the platform to share my artistry 
* **Community Feed:** As an active user, I want to be able to browse my feed of recent posts to discover new writings, art, and music
  
### Medium Priority
* **GIFs in Comments:** As an active user, I want to be able to search for and attach GIFs in  the comments of posts to add visual representations for my feelings on a post
* **Following:** As an active user, I want to be able to follow creators to see their new posts in my feed
* **Personalized Feed:** As an active user, I want my feed to be personalized to the desired media I wish to view so that I can see new posts from accounts I follow and find new work catered to me
  
### Low Priority
* **Notifications:** As a creator, I want to receive notifications from users who interact with my content to stay engaged with my audience
* **Post Editing and Deletion:** As a creator, I want to be able to edit and delete my published posts to keep my account accurate to how I wish to be perceived by my audience

## Sprint Planning (1 Week)

### 1. User Registration: _As a new user, I want to create an account registered with my email address and a password so I can access the platform._

**Assigned to:** Sahara Calloway

**Tasks:**
* Build registration form (name, email, password)
* Implement input validation and error handling
* Connect login form to backend and store user data securely
  
### 2. User Login & Authentication: _As a returning user, I want to be able to log in with my information securely so I can access my profile and feed._

**Assigned to:** Trinity Banks

**Tasks:**
* Build login form
* Implement session/token-based authentication
* Add logout functionality
  
### 3. Post Creation: _As an active user, I want to be able to write text, post images, and directly link music on the platform to share my artistry._

**Assigned to:** Leeyand Blot Jr.

**Tasks:**
* Build post creation form supporting text, image upload, and music link input
* Connect form to backend to save and retrieve posts
* Display published posts on the creator's profile
  
### 4. Community Feed: _As an active user, I want to be able to browse my feed of recent posts to discover new writings, art, and music._ 

**Assigned to:** Sahara Calloway

**Tasks:**
* Build feed page that pulls and displays recent posts
* Show post type, creator name, and timestamp
* Order posts by most recent

## [Demonstration Video](https://youtu.be/R74p7Y9iKf8?si=IctmRDjr3oS4gfje)

[![Watch the video](https://img.youtube.com/vi/R74p7Y9iKf8/0.jpg)](https://youtu.be/R74p7Y9iKf8?si=IctmRDjr3oS4gfje)

---
## Milestone 3: Full Stack Integration

### Tech Stack
- **Frontend:** React (Vite), React Router, Axios, Context API
- **Backend:** Spring Boot 4.0.5, Spring Data JPA, Spring Security
- **Database:** H2 (in-memory)
- **External APIs:** Giphy API, SoundCloud API

## Frontend (ReactJS)

| Page | Route | Description |
|------|-------|-------------|
| Home/Dashboard | `/` | Platform overview and navigation |
| Data Display | `/data` | Fetches and displays all posts via `GET /api/posts` |
| Form Page | `/form` | Submits new posts via `POST /api/posts` with validation |
| Login | `/login` | Authenticates users and stores JWT token |
| Register | `/register` | Creates new user accounts |
| Create Post | `/create-post` | Protected post creation page |

**Key implementation details:**
- React Router handles all page navigation
- `useState` and `useReducer` used throughout for state management
- `AuthContext` manages global authentication state across the app
- `ProtectedRoute` component restricts access to authenticated users
- Axios `client.js` handles all API calls with automatic JWT token injection via interceptor
- Responsive layout with consistent dark theme styling across all pages

### Database Integration

**Configuration:** H2 in-memory database via `application.properties`

<img width="1637" height="593" alt="image" src="https://github.com/user-attachments/assets/8dcc75c7-4f5d-4e45-ba2d-50db88107f5a" />

**Validation:** Jakarta Bean Validation (`@NotBlank`, `@Email`, `@Size`) applied to all entities

### Authentication & Security

* Spring Security configured with stateless JWT-based authentication
* Passwords hashed with `BCryptPasswordEncoder`
* JWT tokens generated and validated via `JwtUtil`
* `ProtectedRoute` on frontend restricts pages to authenticated users

### API Endpoint Table

| Method | Endpoint | Auth Required | Description |
|--------|----------|--------------|-------------|
| POST | `/api/users/auth/register` | No | Register new user, returns JWT |
| POST | `/api/users/auth/login` | No | Login, returns JWT |
| GET | `/api/users` | Yes | Get all users |
| GET | `/api/users/{id}` | Yes | Get user by ID |
| DELETE | `/api/users/{id}` | Yes | Delete user |
| GET | `/api/posts` | No | Get all posts |
| POST | `/api/posts` | No | Create a new post |
| GET | `/api/posts/{id}` | No | Get post by ID |
| PUT | `/api/posts/{id}` | No | Update a post |
| DELETE | `/api/posts/{id}` | No | Delete a post |
| GET | `/api/comments` | No | Get all comments |
| POST | `/api/comments` | No | Create a comment |
| GET | `/api/comments/post/{postId}` | No | Get comments by post |
| DELETE | `/api/comments/{id}` | No | Delete a comment |
| GET | `/api/gifs/search?query=` | No | Search Giphy for GIFs |
| POST | `/api/gifs` | No | Save a selected GIF |
| GET | `/api/soundcloud/**` | No | SoundCloud track data |

### Example API Responses

**POST /api/users/auth/register**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "name": "Sahara",
    "email": "sahara@example.com"
  }
}
```

**GET /api/posts**
```json
[
  {
    "id": 1,
    "title": "My First Poem",
    "content": "helloooooo",
    "mediaType": "TEXT",
    "date": "2026-04-30T15:44:45"
  }
]
```

**GET /api/gifs/search?query=happy**
```json
[
  {
    "giphyId": "0ixAZaU8Gp8R5TdRQT",
    "previewUrl": "https://media2.giphy.com/...",
    "url": "https://media2.giphy.com/..."
  }
]
```

### How to Run

**Backend:**
1. Open `xpression-backend` in IntelliJ
2. Run `XpressionBackendApplication.java`
3. Backend runs at `http://localhost:8080`

**Frontend:**
1. Navigate to `Milestone 3/frontend`
2. Run `npm install` then `npm run dev`
3. Frontend runs at `http://localhost:5173`

### AI Usage Log

AI assistance (Claude by Anthropic) was used throughout Milestone 3 for:
* Generating Spring Boot entity, repository, service, and controller boilerplate
* Debugging merge conflicts in `application.properties`
* Identifying and fixing duplicate `RestTemplate` bean definition error
* Resolving Giphy API response format mismatch between backend and frontend
* Writing and iterating on `GifSearch.jsx` component
* Advising on `pom.xml` dependency additions for Spring Security and JJWT
* Troubleshooting H2 console access issues with Spring Boot 4.0.5
* Fixing `ProtectedRoute` redirect causing blank page on unauthenticated access
* Writing README documentation for Milestone 3

---
## Milestone 4: Automated Testing Results

<img width="1253" height="652" alt="image" src="https://github.com/user-attachments/assets/f34cae95-003d-431f-a652-b7033db3a6b2" />

---
<img width="1653" height="720" alt="image" src="https://github.com/user-attachments/assets/4e11d7b1-5ccb-4c63-95f8-aa7590963184" />
