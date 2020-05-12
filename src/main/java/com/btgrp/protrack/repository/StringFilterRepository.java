package com.btgrp.protrack.repository;
import com.btgrp.protrack.domain.StringFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the StringFilter entity.
 */
@Repository
public interface StringFilterRepository extends JpaRepository<StringFilter, Long> {

    @Query(value = "select distinct stringFilter from StringFilter stringFilter left join fetch stringFilter.inlists",
        countQuery = "select count(distinct stringFilter) from StringFilter stringFilter")
    Page<StringFilter> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct stringFilter from StringFilter stringFilter left join fetch stringFilter.inlists")
    List<StringFilter> findAllWithEagerRelationships();

    @Query("select stringFilter from StringFilter stringFilter left join fetch stringFilter.inlists where stringFilter.id =:id")
    Optional<StringFilter> findOneWithEagerRelationships(@Param("id") Long id);

}
