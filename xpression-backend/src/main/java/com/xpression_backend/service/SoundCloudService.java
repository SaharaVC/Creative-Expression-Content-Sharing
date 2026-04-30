package com.xpression_backend.service;

import com.xpression_backend.model.Post;
import com.xpression_backend.model.SoundCloudTrack;
import com.xpression_backend.repository.SoundCloudTrackRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Map;
import java.util.Optional;

@Service
public class SoundCloudService {

    private final RestTemplate restTemplate;
    private final SoundCloudTrackRepository soundCloudTrackRepository;

    public SoundCloudService(RestTemplate restTemplate, SoundCloudTrackRepository soundCloudTrackRepository) {
        this.restTemplate = restTemplate;
        this.soundCloudTrackRepository = soundCloudTrackRepository;
    }

    public Map getOEmbedData(String soundCloudUrl) {
        String oEmbedUrl = "https://soundcloud.com/oembed?format=json&url=" + soundCloudUrl;
        try {
            return restTemplate.getForObject(oEmbedUrl, Map.class);
        } catch (Exception e) {
            return null;
        }
    }

    public SoundCloudTrack fetchAndStore(String soundCloudUrl, Post post) {
        Map data = getOEmbedData(soundCloudUrl);
        if (data == null) return null;

        SoundCloudTrack track = new SoundCloudTrack();
        track.setUrl(soundCloudUrl);
        track.setTitle((String) data.get("title"));
        track.setAuthorName((String) data.get("author_name"));
        track.setThumbnailUrl((String) data.get("thumbnail_url"));
        track.setEmbedHtml((String) data.get("html"));
        track.setPost(post);

        return soundCloudTrackRepository.save(track);
    }

    public Optional<SoundCloudTrack> getTrackByPostId(Long postId) {
        return soundCloudTrackRepository.findByPostId(postId);
    }
}