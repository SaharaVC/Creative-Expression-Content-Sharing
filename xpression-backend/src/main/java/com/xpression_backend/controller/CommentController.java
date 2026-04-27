package com.xpression_backend.controller;

import com.xpression.backend.model.Comment;
import com.xpression.backend.service.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;
  
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public Comment createComment(@RequestBody Comment comment) {
        return commentService.createComment(comment);
    }

    @GetMapping
    public Iterable<Comment> getAllComments() {
        return commentService.getAllComments();
    }

    @GetMapping("/{id}")
    public Optional<Comment> getCommentById(@PathVariable Long id) {
        return commentService.getCommentById(id);
    }

    @GetMapping("/post/{postId}")
    public List<Comment> getCommentsByPostId(@PathVariable Long postId) {
        return commentService.getCommentsByPostId(postId);
    }

    @PutMapping("/{id}")
    public Comment updateComment(@PathVariable Long id, @RequestBody Comment updatedComment) {
        return commentService.updateComment(id, updatedComment);
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
    }
}
