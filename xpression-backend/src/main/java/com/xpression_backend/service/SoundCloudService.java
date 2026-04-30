package com.xpression_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

@Service
public class SoundCloudService {

    private final RestTemplate restTemplate;

    public SoundCloudService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Map getOEmbedData(String soundCloudUrl) {
        String oEmbedUrl = "https://soundcloud.com/oembed?format=json&url="
                + soundCloudUrl;
        try {
            return restTemplate.getForObject(oEmbedUrl, Map.class);
        } catch (Exception e) {
            return null;
        }
    }
}