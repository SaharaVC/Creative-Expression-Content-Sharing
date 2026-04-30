package com.xpression_backend.repository;

import com.xpression_backend.model.SoundCloudTrack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface SoundCloudTrackRepository extends JpaRepository<SoundCloudTrack, Long> {
    Optional<SoundCloudTrack> findByPostId(Long postId);
}