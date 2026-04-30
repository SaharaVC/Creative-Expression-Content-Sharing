package com.xpression_backend.service;

import com.xpression_backend.model.Gif;
import com.xpression_backend.repository.GifRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

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

    public List<Map<String, String>> searchGifs(String query) {
        try {
            String url = "https://api.giphy.com/v1/gifs/search?q="
                    + query + "&api_key=" + apiKey + "&limit=10";

            Map response = restTemplate.getForObject(url, Map.class);
            List<Map<String, Object>> data = (List<Map<String, Object>>) response.get("data");

            List<Map<String, String>> gifs = new ArrayList<>();

            for (Map<String, Object> gif : data) {
                Map images = (Map) gif.get("images");

                Map original = (Map) images.get("original");
                Map preview = (Map) images.get("fixed_height_small");

                Map<String, String> gifData = new HashMap<>();
                gifData.put("giphyId", (String) gif.get("id"));
                gifData.put("url", (String) original.get("url"));
                gifData.put("previewUrl", (String) preview.get("url"));

                gifs.add(gifData);
            }

            return gifs;

        } catch (Exception e) {
            throw new RuntimeException("Giphy API failed or rate limited");
        }
    }

    public Gif saveGif(Gif gif) {
        return gifRepository.save(gif);
    }

    public List<Gif> getGifsByComment(Long commentId) {
        return gifRepository.findByCommentId(commentId);
    }
}