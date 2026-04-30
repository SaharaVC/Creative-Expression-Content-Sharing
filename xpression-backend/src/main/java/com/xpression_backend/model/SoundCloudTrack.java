package com.xpression_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "soundcloud_tracks")
public class SoundCloudTrack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;
    private String title;
    private String authorName;
    private String thumbnailUrl;

    @Column(columnDefinition = "TEXT")
    private String embedHtml;

    @OneToOne
    @JoinColumn(name = "post_id")
    private Post post;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }
    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }
    public String getEmbedHtml() { return embedHtml; }
    public void setEmbedHtml(String embedHtml) { this.embedHtml = embedHtml; }
    public Post getPost() { return post; }
    public void setPost(Post post) { this.post = post; }
}