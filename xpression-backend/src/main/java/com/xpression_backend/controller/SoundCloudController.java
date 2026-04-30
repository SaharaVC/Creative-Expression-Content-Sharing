package com.xpression_backend.controller;

import com.xpression_backend.service.SoundCloudService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/soundcloud")
public class SoundCloudController {

    private final SoundCloudService soundCloudService;

    public SoundCloudController(SoundCloudService soundCloudService) {
        this.soundCloudService = soundCloudService;
    }

    @GetMapping("/oembed")
    public ResponseEntity<Map> getOEmbed(@RequestParam String url) {
        Map data = soundCloudService.getOEmbedData(url);
        if (data == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(data);
    }
}
