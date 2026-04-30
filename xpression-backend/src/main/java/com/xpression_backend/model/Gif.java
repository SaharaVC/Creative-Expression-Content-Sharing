package com.xpression_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "gifs")
public class Gif {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String giphyId;
    private String url;
    private String previewUrl;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment comment;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getGiphyId() { return giphyId; }
    public void setGiphyId(String giphyId) { this.giphyId = giphyId; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public String getPreviewUrl() { return previewUrl; }
    public void setPreviewUrl(String previewUrl) { this.previewUrl = previewUrl; }
    public Comment getComment() { return comment; }
    public void setComment(Comment comment) { this.comment = comment; }
}