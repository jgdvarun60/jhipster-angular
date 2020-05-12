package com.btgrp.protrack.repository;
import com.btgrp.protrack.domain.DummyEnums;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DummyEnums entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DummyEnumsRepository extends JpaRepository<DummyEnums, Long> {

}
