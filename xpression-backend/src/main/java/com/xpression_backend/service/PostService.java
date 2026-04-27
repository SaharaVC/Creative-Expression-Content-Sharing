package com.xpression_backend.service;

import com.xpression_backend.model.Post;
import com.xpression_backend.repository.PostRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    // CREATE: Publish a new creative post
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    // READ: Get the community feed (all posts)
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // READ: Get a specific post by ID
    public Post getPostById(Long id) {
        return postRepository.findById(id).orElse(null);
    }

    // DELETE: Remove a post
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}