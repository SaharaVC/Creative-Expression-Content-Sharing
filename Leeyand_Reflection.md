# Individual Reflection - Leeyand Blot Jr.

## Xpression – Creative Expression & Content Sharing Platform

Working on Xpression, our creative expression and content-sharing platform, gave me a chance to really dive into backend development while also seeing how everything connects in a full-stack app. My main responsibilities were integrating the SoundCloud API and designing the database structure, and those two pieces ended up being more connected than I initially expected.

For the SoundCloud feature, I built out the backend components that allow users to paste a track link and instantly embed a playable audio widget into their posts. Instead of dealing with the complexity of hosting audio ourselves (which would’ve created storage and licensing issues), I used SoundCloud’s oEmbed API. I created the controller and service layers in Spring Boot, handled the API requests, and made sure the system could gracefully deal with bad links or failed responses. It was satisfying to build something that directly impacts how users interact with the platform.

On the database side, I designed the structure for Users, Posts, and Comments, and turned that into working JPA entities. I focused on keeping relationships clear, making sure every post is tied to a specific user, and added validation rules to prevent bad data from ever reaching the database. I also set up the H2 in-memory database, which made development smoother for the whole team since everything just worked out of the box.

Past my main tasks, I helped with early architecture discussions, fixed a backend configuration issue involving duplicate beans, and contributed to the README documentation. Those smaller contributions ended up being just as important for keeping the project moving.

---

## Teamwork and Growth

Working with Sahara and Trinity felt genuinely collaborative. We each had our own focus—frontend, authentication, and backend—but because we were working on different parts of the same features, we weren’t constantly waiting on each other. For example, the frontend could be built using mock data while I was still finishing backend endpoints.

That said, things got more complicated during integration. When we merged everything, we ran into issues like mismatched API response formats and configuration conflicts that didn’t show up when we were working separately. One example was the Giphy API data—what I expected in the backend didn’t match what the frontend needed. Fixing that meant sitting down together, looking at the actual API response, and agreeing on a consistent structure. It was a small issue, but it taught me how important it is to define data contracts early.

This project also pushed my technical skills further than before. I had used Spring Boot and JPA in simpler contexts, but combining them with authentication, external APIs, and real data flow forced me to think more deeply about design decisions. I became more aware of things like data exposure risks (like accidentally returning sensitive fields), how to structure clean service layers, and how backend decisions affect the entire application.

---

## Ethical and AI Considerations

We used AI tools like Claude and ChatGPT throughout the project, and over time I became more intentional about how I used them.

On one hand, AI was incredibly helpful for speeding up repetitive tasks like writing boilerplate code or troubleshooting configuration issues. It made development faster and helped me get unstuck when documentation wasn’t clear.

On the other hand, I learned pretty quickly that relying on AI without understanding the code can backfire. Early in the project, I accepted a suggested implementation for JWT authentication that I didn’t fully understand. Later, when a bug came up, I realized I couldn’t explain or debug it effectively. After that, I made it a rule to only use AI suggestions if I could fully understand and explain them.

We also thought about ethical considerations in how our platform works. Since Xpression integrates with services like SoundCloud and Giphy, we made sure to respect their intended usage instead of trying to bypass restrictions. More importantly, since the platform is built around user-generated creative content, we took security seriously—hashing passwords, validating input, and using token-based authentication weren’t just technical decisions, but necessary steps to protect users.

If we were to keep developing Xpression, I’d want to think more about things like content moderation, data privacy, and how to promote creativity without encouraging shallow, attention-driven content.

---

## Final Thoughts

Overall, this project gave me real hands-on experience that I wouldn’t have gotten working alone. It showed me what it’s like to build something as part of a team, deal with real integration issues, and think about both the technical and ethical sides of development. It pushed me to grow—not just as a developer, but as someone building systems that people might use.
