package com.cognizant.orm_learn.repository;

import com.cognizant.orm_learn.model.Post;
import com.cognizant.orm_learn.repository.projection.PostSummary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long>, JpaSpecificationExecutor<Post> {

    // Projection example
    List<PostSummary> findByTitleContainingIgnoreCase(String title);

    // Pageable example (inherited findAll(Pageable) also available)
    Page<Post> findAll(Pageable pageable);

    // JPQL fetch join to retrieve author and tags in one query
    @Query("select p from Post p left join fetch p.author left join fetch p.tags where p.id = :id")
    Post findByIdWithAuthorAndTags(@Param("id") Long id);
}
