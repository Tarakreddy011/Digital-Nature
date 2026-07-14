package com.cognizant.orm_learn.service;

import com.cognizant.orm_learn.model.Post;
import com.cognizant.orm_learn.repository.PostRepository;
import com.cognizant.orm_learn.specification.PostSpecifications;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    @Transactional(readOnly = true)
    public Page<Post> searchPosts(String title, String tagName, String authorEmail, Pageable pageable) {
        Specification<Post> spec = Specification.where(PostSpecifications.titleContains(title))
                .and(PostSpecifications.hasTagName(tagName))
                .and(PostSpecifications.authorEmail(authorEmail));
        return postRepository.findAll(spec, pageable);
    }
}
