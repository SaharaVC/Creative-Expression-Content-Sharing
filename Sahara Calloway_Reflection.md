# Individual Reflection — Sahara Calloway

### My Contributions

For this project I worked with both the frontend and backend. On the backend I set
up the database configuration using H2 and Spring Data JPA, creating and refining the 
entity classes for User, Post, Comment, and Gif, and building out the repository and service layers 
with the necessary CRUD operations and custom query methods. I also helped configure the 
application.properties file and worked through dependency issues in the pom.xml like adding 
Spring Security and the JJWT library for authentication support.

On the frontend I contributed by getting the Giphy API integration set up through the GifSearch.jsx 
component, which went through several rounds of debugging to get working correctly. I also worked 
on the DataDisplay page to connect it to the backend and display posts from the community feed.

For documentation I wrote and maintained the README across all four milestones, keeping it updated 
with the product backlog, sprint planning, database schema, API endpoint table, test results, 
accessibility checklist, and AI usage log. I also handled the external API integration section, 
documenting how Giphy and SoundCloud fit into the application.

### Teamwork and Technical Growth

This project pushed me to work more collaboratively than I was used to. Managing Git across 
multiple branches, handling merge conflicts, and making sure everyone's changes worked together 
was a real learning experience. I got much more comfortable with Spring Boot than I expected, 
especially around JPA relationships and how the service and controller layers connect.

Debugging the Giphy integration taught me a lot about how APIs actually work versus how 
documentation says they should. Working through the JSON parsing issue and figuring out the 
correct response format was frustrating at first but helped me understand the full data flow from 
the external API through the backend and into the React frontend.

### Ethical and AI Considerations

Throughout the project we made many decisions to handle user data responsibly. Passwords are 
hashed using BCrypt before being stored, JWT tokens expire after 24 hours, and no sensitive data 
is persisted beyond the development session since we used an in-memory H2 database.

AI tools, specifically Claude, were used throughout development for debugging errors, and writing 
documentation. It helped a lot for understanding how to start the code and explaining how code operates
Claude helped as a learning and problem-solving tool instead of a shortcut, which helped me actually grow 
technically while still having the code work properly. I think that is the right way to use it, especially in a 
learning environment.
