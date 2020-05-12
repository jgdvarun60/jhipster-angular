package com.btgrp.protrack.repository;
import com.btgrp.protrack.domain.AllFields;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AllFields entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AllFieldsRepository extends JpaRepository<AllFields, Long> {

}
