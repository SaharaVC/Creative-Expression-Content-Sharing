package com.xpression_backend.controller;

import com.xpression_backend.model.Post;
import com.xpression_backend.model.User;
import com.xpression_backend.security.JwtUtil;
import com.xpression_backend.service.PostService;
import com.xpression_backend.service.SoundCloudService;
import com.xpression_backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final SoundCloudService soundCloudService;

    public PostController(PostService postService, UserService userService,
                          JwtUtil jwtUtil, SoundCloudService soundCloudService) {
        this.postService = postService;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.soundCloudService = soundCloudService;
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post,
                                           @RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (jwtUtil.validateToken(token)) {
                String email = jwtUtil.extractEmail(token);
                User user = userService.findByEmail(email);
                if (user != null) {
                    post.setUser(user);
                }
            }
        }

        Post savedPost = postService.createPost(post);

        if ("MUSIC".equals(savedPost.getMediaType()) &&
                savedPost.getContent() != null &&
                savedPost.getContent().contains("soundcloud.com")) {
            String content = savedPost.getContent();
            // Extract just the URL if there's text before it
            int urlStart = content.indexOf("https://soundcloud.com");
            if (urlStart == -1) urlStart = content.indexOf("http://soundcloud.com");
            String soundCloudUrl = urlStart >= 0 ? content.substring(urlStart) : content;
            soundCloudService.fetchAndStore(soundCloudUrl.trim(), savedPost);
        }

        return ResponseEntity.ok(savedPost);
    }

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Post>> getPostById(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPostById(id));
    }

    @GetMapping("/media/{mediaType}")
    public ResponseEntity<List<Post>> getPostsByMediaType(@PathVariable String mediaType) {
        return ResponseEntity.ok(postService.getPostsByMediaType(mediaType));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post updatedPost) {
        return ResponseEntity.ok(postService.updatePost(id, updatedPost));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}