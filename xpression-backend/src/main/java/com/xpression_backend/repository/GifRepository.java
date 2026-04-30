package com.xpression_backend.repository;

import com.xpression_backend.model.Gif;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GifRepository extends JpaRepository<Gif, Long> {
    List<Gif> findByCommentId(Long commentId);
}