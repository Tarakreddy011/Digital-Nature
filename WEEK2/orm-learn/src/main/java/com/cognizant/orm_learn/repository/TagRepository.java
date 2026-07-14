package com.cognizant.orm_learn.repository;

import com.cognizant.orm_learn.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByName(String name);

    // Native query example
    @Query(value = "SELECT * FROM tags t WHERE t.name = :name", nativeQuery = true)
    Optional<Tag> findByNameNative(@Param("name") String name);
}
