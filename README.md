# Creative Expression Content Sharing: Xpression

## Mileston 1: Project Proposal

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
## Milestone 3:

