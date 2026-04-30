package com.xpression_backend;

import com.xpression_backend.model.Comment;
import com.xpression_backend.model.Post;
import com.xpression_backend.model.User;
import com.xpression_backend.repository.CommentRepository;
import com.xpression_backend.repository.PostRepository;
import com.xpression_backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class XpressionBackendApplicationTests {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private CommentRepository commentRepository;

	@Test
	void testCreateUser() {
		User user = new User();
		user.setName("Test User");
		user.setEmail("testuser@test.com");
		user.setPassword("password123");
		User saved = userRepository.save(user);
		assertNotNull(saved.getId());
		assertEquals("Test User", saved.getName());
	}

	@Test
	void testFindUserByEmail() {
		User user = new User();
		user.setName("Email User");
		user.setEmail("emailuser@test.com");
		user.setPassword("password123");
		userRepository.save(user);
		assertTrue(userRepository.findByEmail("emailuser@test.com").isPresent());
	}

	@Test
	void testDeleteUser() {
		User user = new User();
		user.setName("Delete User");
		user.setEmail("deleteuser@test.com");
		user.setPassword("password123");
		User saved = userRepository.save(user);
		userRepository.deleteById(saved.getId());
		assertFalse(userRepository.findById(saved.getId()).isPresent());
	}

	@Test
	void testCreatePost() {
		Post post = new Post();
		post.setTitle("Test Post");
		post.setContent("This is test content");
		post.setMediaType("TEXT");
		Post saved = postRepository.save(post);
		assertNotNull(saved.getId());
		assertEquals("Test Post", saved.getTitle());
	}

	@Test
	void testGetAllPosts() {
		Post post = new Post();
		post.setTitle("Feed Post");
		post.setContent("Feed content");
		post.setMediaType("TEXT");
		postRepository.save(post);
		assertFalse(postRepository.findAll().isEmpty());
	}

	@Test
	void testDeletePost() {
		Post post = new Post();
		post.setTitle("Delete Post");
		post.setContent("To be deleted");
		post.setMediaType("TEXT");
		Post saved = postRepository.save(post);
		postRepository.deleteById(saved.getId());
		assertFalse(postRepository.findById(saved.getId()).isPresent());
	}

	@Test
	void testCreateComment() {
		Post post = new Post();
		post.setTitle("Comment Post");
		post.setContent("Post for comment");
		post.setMediaType("TEXT");
		Post savedPost = postRepository.save(post);

		Comment comment = new Comment();
		comment.setContent("Great post!");
		comment.setPost(savedPost);
		Comment saved = commentRepository.save(comment);
		assertNotNull(saved.getId());
		assertEquals("Great post!", saved.getContent());
	}

	@Test
	void testGetCommentsByPostId() {
		Post post = new Post();
		post.setTitle("Post With Comments");
		post.setContent("Content");
		post.setMediaType("TEXT");
		Post savedPost = postRepository.save(post);

		Comment comment = new Comment();
		comment.setContent("Nice work!");
		comment.setPost(savedPost);
		commentRepository.save(comment);

		assertFalse(commentRepository.findByPostId(savedPost.getId()).isEmpty());
	}

	@Test
	void testFilterPostsByMediaType() {
		Post post = new Post();
		post.setTitle("Music Post");
		post.setContent("https://soundcloud.com/test");
		post.setMediaType("MUSIC");
		postRepository.save(post);

		assertFalse(postRepository.findByMediaType("MUSIC").isEmpty());
	}
}