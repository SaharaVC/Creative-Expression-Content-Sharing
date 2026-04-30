package com.xpression_backend.controller;

import com.xpression_backend.model.Gif;
import com.xpression_backend.service.GifService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/gifs")
public class GifController {

    private final GifService gifService;

    public GifController(GifService gifService) {
        this.gifService = gifService;
    }

    @GetMapping("/search")
    public ResponseEntity<String> searchGifs(@RequestParam String query) {
        try {
            String results = gifService.searchGifs(query);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching GIFs");
        }
    }

    @PostMapping
    public ResponseEntity<Gif> saveGif(@RequestBody Gif gif) {
        try {
            return ResponseEntity.ok(gifService.saveGif(gif));
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/comment/{commentId}")
    public ResponseEntity<List<Gif>> getGifsByComment(@PathVariable Long commentId) {
        try {
            return ResponseEntity.ok(gifService.getGifsByComment(commentId));
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}