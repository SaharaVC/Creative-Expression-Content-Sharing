package com.xpression_backend.service;

import com.xpression_backend.model.Gif;
import com.xpression_backend.repository.GifRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;

@Service
public class GifService {

    @Value("${giphy.api.key}")
    private String apiKey;

    private final GifRepository gifRepository;
    private final RestTemplate restTemplate;

    public GifService(GifRepository gifRepository, RestTemplate restTemplate) {
        this.gifRepository = gifRepository;
        this.restTemplate = restTemplate;
    }

    public String searchGifs(String query) {
        String url = "https://api.giphy.com/v1/gifs/search?q="
                + query + "&api_key=" + apiKey + "&limit=10";
        return restTemplate.getForObject(url, String.class);
    }

    public Gif saveGif(Gif gif) {
        return gifRepository.save(gif);
    }

    public List<Gif> getGifsByComment(Long commentId) {
        return gifRepository.findByCommentId(commentId);
    }
}