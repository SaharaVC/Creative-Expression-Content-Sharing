package com.xpression_backend.service;

import com.xpression_backend.model.Post;
import com.xpression_backend.repository.PostRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

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
    public Optional<Post> getPostById(Long id) { return postRepository.findById(id);
    }

    // DELETE: Remove a post
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    // For the Community Feed: Filtering by type (Text, Image, Music)
    public List<Post> getPostsByMediaType(String mediaType) {
        return postRepository.findByMediaType(mediaType);
    }

    // For updating existing artistry
    public Post updatePost(Long id, Post updatedPost) {
        return postRepository.findById(id)
                .map(existingPost -> {
                    existingPost.setTitle(updatedPost.getTitle());
                    existingPost.setContent(updatedPost.getContent());
                    existingPost.setMediaType(updatedPost.getMediaType());
                    return postRepository.save(existingPost);
                }).orElse(null);
    }
}



