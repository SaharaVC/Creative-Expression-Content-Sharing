package com.xpression_backend.service;

import com.xpression_backend.model.Comment;
import com.xpression_backend.repository.CommentRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    // CREATE: Post structured feedback
    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    // READ: Get all feedback for a specific post
    public List<Comment> getCommentsByPost(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    // UPDATE: Edit feedback
    public Comment updateComment(Comment comment) {
        return commentRepository.save(comment);
    }

    // DELETE: Remove feedback
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}
