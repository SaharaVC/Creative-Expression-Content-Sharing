package com.xpression_backend.controller;

import com.xpression_backend.model.Gif;
import com.xpression_backend.service.GifService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/gifs")
@CrossOrigin(origins = "http://localhost:5173")
public class GifController {

    private final GifService gifService;

    public GifController(GifService gifService) {
        this.gifService = gifService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<Map<String, String>>> searchGifs(@RequestParam String query) {
        return ResponseEntity.ok(gifService.searchGifs(query));
    }

    @PostMapping
    public ResponseEntity<Gif> saveGif(@RequestBody Gif gif) {
        return ResponseEntity.ok(gifService.saveGif(gif));
    }

    @GetMapping("/comment/{commentId}")
    public ResponseEntity<List<Gif>> getGifsByComment(@PathVariable Long commentId) {
        return ResponseEntity.ok(gifService.getGifsByComment(commentId));
    }
}