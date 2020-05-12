package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.domain.EnumFilter;
import com.btgrp.protrack.repository.EnumFilterRepository;
import com.btgrp.protrack.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.btgrp.protrack.domain.EnumFilter}.
 */
@RestController
@RequestMapping("/api")
public class EnumFilterResource {

    private final Logger log = LoggerFactory.getLogger(EnumFilterResource.class);

    private static final String ENTITY_NAME = "enumFilter";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EnumFilterRepository enumFilterRepository;

    public EnumFilterResource(EnumFilterRepository enumFilterRepository) {
        this.enumFilterRepository = enumFilterRepository;
    }

    /**
     * {@code POST  /enum-filters} : Create a new enumFilter.
     *
     * @param enumFilter the enumFilter to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new enumFilter, or with status {@code 400 (Bad Request)} if the enumFilter has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/enum-filters")
    public ResponseEntity<EnumFilter> createEnumFilter(@RequestBody EnumFilter enumFilter) throws URISyntaxException {
        log.debug("REST request to save EnumFilter : {}", enumFilter);
        if (enumFilter.getId() != null) {
            throw new BadRequestAlertException("A new enumFilter cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EnumFilter result = enumFilterRepository.save(enumFilter);
        return ResponseEntity.created(new URI("/api/enum-filters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /enum-filters} : Updates an existing enumFilter.
     *
     * @param enumFilter the enumFilter to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated enumFilter,
     * or with status {@code 400 (Bad Request)} if the enumFilter is not valid,
     * or with status {@code 500 (Internal Server Error)} if the enumFilter couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/enum-filters")
    public ResponseEntity<EnumFilter> updateEnumFilter(@RequestBody EnumFilter enumFilter) throws URISyntaxException {
        log.debug("REST request to update EnumFilter : {}", enumFilter);
        if (enumFilter.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EnumFilter result = enumFilterRepository.save(enumFilter);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, enumFilter.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /enum-filters} : get all the enumFilters.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of enumFilters in body.
     */
    @GetMapping("/enum-filters")
    public List<EnumFilter> getAllEnumFilters(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all EnumFilters");
        return enumFilterRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /enum-filters/:id} : get the "id" enumFilter.
     *
     * @param id the id of the enumFilter to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the enumFilter, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/enum-filters/{id}")
    public ResponseEntity<EnumFilter> getEnumFilter(@PathVariable Long id) {
        log.debug("REST request to get EnumFilter : {}", id);
        Optional<EnumFilter> enumFilter = enumFilterRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(enumFilter);
    }

    /**
     * {@code DELETE  /enum-filters/:id} : delete the "id" enumFilter.
     *
     * @param id the id of the enumFilter to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/enum-filters/{id}")
    public ResponseEntity<Void> deleteEnumFilter(@PathVariable Long id) {
        log.debug("REST request to delete EnumFilter : {}", id);
        enumFilterRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
