package com.btgrp.protrack.repository;
import com.btgrp.protrack.domain.EnumFilter;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the EnumFilter entity.
 */
@Repository
@JaversSpringDataAuditable
public interface EnumFilterRepository extends JpaRepository<EnumFilter, Long> {

    @Query(value = "select distinct enumFilter from EnumFilter enumFilter left join fetch enumFilter.inlists",
        countQuery = "select count(distinct enumFilter) from EnumFilter enumFilter")
    Page<EnumFilter> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct enumFilter from EnumFilter enumFilter left join fetch enumFilter.inlists")
    List<EnumFilter> findAllWithEagerRelationships();

    @Query("select enumFilter from EnumFilter enumFilter left join fetch enumFilter.inlists where enumFilter.id =:id")
    Optional<EnumFilter> findOneWithEagerRelationships(@Param("id") Long id);

}
