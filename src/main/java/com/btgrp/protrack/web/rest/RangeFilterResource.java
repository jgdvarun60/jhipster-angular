package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.domain.RangeFilter;
import com.btgrp.protrack.repository.RangeFilterRepository;
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
 * REST controller for managing {@link com.btgrp.protrack.domain.RangeFilter}.
 */
@RestController
@RequestMapping("/api")
public class RangeFilterResource {

    private final Logger log = LoggerFactory.getLogger(RangeFilterResource.class);

    private static final String ENTITY_NAME = "rangeFilter";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RangeFilterRepository rangeFilterRepository;

    public RangeFilterResource(RangeFilterRepository rangeFilterRepository) {
        this.rangeFilterRepository = rangeFilterRepository;
    }

    /**
     * {@code POST  /range-filters} : Create a new rangeFilter.
     *
     * @param rangeFilter the rangeFilter to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rangeFilter, or with status {@code 400 (Bad Request)} if the rangeFilter has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/range-filters")
    public ResponseEntity<RangeFilter> createRangeFilter(@RequestBody RangeFilter rangeFilter) throws URISyntaxException {
        log.debug("REST request to save RangeFilter : {}", rangeFilter);
        if (rangeFilter.getId() != null) {
            throw new BadRequestAlertException("A new rangeFilter cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RangeFilter result = rangeFilterRepository.save(rangeFilter);
        return ResponseEntity.created(new URI("/api/range-filters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /range-filters} : Updates an existing rangeFilter.
     *
     * @param rangeFilter the rangeFilter to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rangeFilter,
     * or with status {@code 400 (Bad Request)} if the rangeFilter is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rangeFilter couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/range-filters")
    public ResponseEntity<RangeFilter> updateRangeFilter(@RequestBody RangeFilter rangeFilter) throws URISyntaxException {
        log.debug("REST request to update RangeFilter : {}", rangeFilter);
        if (rangeFilter.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RangeFilter result = rangeFilterRepository.save(rangeFilter);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, rangeFilter.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /range-filters} : get all the rangeFilters.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rangeFilters in body.
     */
    @GetMapping("/range-filters")
    public List<RangeFilter> getAllRangeFilters(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all RangeFilters");
        return rangeFilterRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /range-filters/:id} : get the "id" rangeFilter.
     *
     * @param id the id of the rangeFilter to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rangeFilter, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/range-filters/{id}")
    public ResponseEntity<RangeFilter> getRangeFilter(@PathVariable Long id) {
        log.debug("REST request to get RangeFilter : {}", id);
        Optional<RangeFilter> rangeFilter = rangeFilterRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(rangeFilter);
    }

    /**
     * {@code DELETE  /range-filters/:id} : delete the "id" rangeFilter.
     *
     * @param id the id of the rangeFilter to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/range-filters/{id}")
    public ResponseEntity<Void> deleteRangeFilter(@PathVariable Long id) {
        log.debug("REST request to delete RangeFilter : {}", id);
        rangeFilterRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
