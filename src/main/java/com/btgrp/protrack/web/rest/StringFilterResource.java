package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.domain.StringFilter;
import com.btgrp.protrack.repository.StringFilterRepository;
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
 * REST controller for managing {@link com.btgrp.protrack.domain.StringFilter}.
 */
@RestController
@RequestMapping("/api")
public class StringFilterResource {

    private final Logger log = LoggerFactory.getLogger(StringFilterResource.class);

    private static final String ENTITY_NAME = "stringFilter";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StringFilterRepository stringFilterRepository;

    public StringFilterResource(StringFilterRepository stringFilterRepository) {
        this.stringFilterRepository = stringFilterRepository;
    }

    /**
     * {@code POST  /string-filters} : Create a new stringFilter.
     *
     * @param stringFilter the stringFilter to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new stringFilter, or with status {@code 400 (Bad Request)} if the stringFilter has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/string-filters")
    public ResponseEntity<StringFilter> createStringFilter(@RequestBody StringFilter stringFilter) throws URISyntaxException {
        log.debug("REST request to save StringFilter : {}", stringFilter);
        if (stringFilter.getId() != null) {
            throw new BadRequestAlertException("A new stringFilter cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StringFilter result = stringFilterRepository.save(stringFilter);
        return ResponseEntity.created(new URI("/api/string-filters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /string-filters} : Updates an existing stringFilter.
     *
     * @param stringFilter the stringFilter to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated stringFilter,
     * or with status {@code 400 (Bad Request)} if the stringFilter is not valid,
     * or with status {@code 500 (Internal Server Error)} if the stringFilter couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/string-filters")
    public ResponseEntity<StringFilter> updateStringFilter(@RequestBody StringFilter stringFilter) throws URISyntaxException {
        log.debug("REST request to update StringFilter : {}", stringFilter);
        if (stringFilter.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StringFilter result = stringFilterRepository.save(stringFilter);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, stringFilter.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /string-filters} : get all the stringFilters.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of stringFilters in body.
     */
    @GetMapping("/string-filters")
    public List<StringFilter> getAllStringFilters(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all StringFilters");
        return stringFilterRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /string-filters/:id} : get the "id" stringFilter.
     *
     * @param id the id of the stringFilter to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the stringFilter, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/string-filters/{id}")
    public ResponseEntity<StringFilter> getStringFilter(@PathVariable Long id) {
        log.debug("REST request to get StringFilter : {}", id);
        Optional<StringFilter> stringFilter = stringFilterRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(stringFilter);
    }

    /**
     * {@code DELETE  /string-filters/:id} : delete the "id" stringFilter.
     *
     * @param id the id of the stringFilter to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/string-filters/{id}")
    public ResponseEntity<Void> deleteStringFilter(@PathVariable Long id) {
        log.debug("REST request to delete StringFilter : {}", id);
        stringFilterRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
