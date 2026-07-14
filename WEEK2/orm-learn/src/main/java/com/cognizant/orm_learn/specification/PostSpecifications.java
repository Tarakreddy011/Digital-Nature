package com.cognizant.orm_learn.specification;

import com.cognizant.orm_learn.model.Post;
import com.cognizant.orm_learn.model.Tag;
import com.cognizant.orm_learn.model.User;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;



public final class PostSpecifications {

    private PostSpecifications() {}

    public static Specification<Post> titleContains(String title) {
        return (root, query, cb) -> title == null ? null : cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase() + "%");
    }

    public static Specification<Post> hasTagName(String tagName) {
        return (root, query, cb) -> {
            if (tagName == null) return null;
            var join = root.join("tags", JoinType.LEFT);
            return cb.equal(cb.lower(join.get("name")), tagName.toLowerCase());
        };
    }

    public static Specification<Post> authorEmail(String email) {
        return (root, query, cb) -> {
            if (email == null) return null;
            var join = root.join("author", JoinType.LEFT);
            return cb.equal(cb.lower(join.get("email")), email.toLowerCase());
        };
    }
}
