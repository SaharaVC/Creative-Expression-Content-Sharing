# Individual Reflection – Trinity Banks

## My Contributions

As a member of Team Xpression, I contributed to both the backend and frontend 
development alongside my teammates. My primary focus was on:

- Helping implement JWT authentication and Spring Security configuration
- Connecting the frontend pages to the backend API endpoints
- Working on the SoundCloud oEmbed integration
- Contributing to the UI design and dark mode styling
- Assisting with debugging and resolving merge conflicts throughout the project
- Writing backend and frontend tests for Milestone 4

I also contributed to the early project planning stages, including helping 
shape the Xpression concept, app name, and overall vision alongside my team.

## Teamwork & Technical Growth

The biggest challenge I personally faced was managing Git merges. With multiple 
Team members pushing changes simultaneously, merging branches often introduced 
bugs that broke working features. Resolving these conflicts taught me a lot 
about Git workflow and the importance of team communication when working on 
a shared codebase.

## Technical Growth

This project gave me real hands-on experience with full-stack development. 
I learned how a React frontend, Spring Boot backend, and database work 
together as a complete system. I also gained practical experience integrating 
external APIs and understanding how authentication flows work end-to-end.

## Ethical & AI Considerations

**AI Usage:**
Throughout this project our team used Claude (Anthropic) as a supplemental 
resource when we got stuck. It was primarily used for looking up syntax, 
troubleshooting error messages, and getting a second opinion on implementation 
approaches, similar to how a developer might use Stack Overflow or documentation. 
All code was reviewed and understood by our team before being integrated. 
AI was a tool to help us move faster, not a replacement for our own 
understanding and decision making.

**Data & Privacy:**
Our application handles user credentials including emails and passwords. We 
addressed this by hashing all passwords with BCrypt before storing them in 
the database. We also used JWT tokens rather than storing session data 
server-side, reducing the risk of session hijacking.

**API Usage:**
Both the SoundCloud oEmbed API and Giphy API were used within their public 
free-tier terms of service. API keys are stored in application.properties 
which is excluded from version control via .gitignore.
