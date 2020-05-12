package com.btgrp.protrack.repository;
import com.btgrp.protrack.domain.RangeFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the RangeFilter entity.
 */
@Repository
public interface RangeFilterRepository extends JpaRepository<RangeFilter, Long> {

    @Query(value = "select distinct rangeFilter from RangeFilter rangeFilter left join fetch rangeFilter.inLists",
        countQuery = "select count(distinct rangeFilter) from RangeFilter rangeFilter")
    Page<RangeFilter> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct rangeFilter from RangeFilter rangeFilter left join fetch rangeFilter.inLists")
    List<RangeFilter> findAllWithEagerRelationships();

    @Query("select rangeFilter from RangeFilter rangeFilter left join fetch rangeFilter.inLists where rangeFilter.id =:id")
    Optional<RangeFilter> findOneWithEagerRelationships(@Param("id") Long id);

}
