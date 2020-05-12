package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.domain.AllFields;
import com.btgrp.protrack.repository.AllFieldsRepository;
import com.btgrp.protrack.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.btgrp.protrack.domain.AllFields}.
 */
@RestController
@RequestMapping("/api")
public class AllFieldsResource {

    private final Logger log = LoggerFactory.getLogger(AllFieldsResource.class);

    private static final String ENTITY_NAME = "allFields";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AllFieldsRepository allFieldsRepository;

    public AllFieldsResource(AllFieldsRepository allFieldsRepository) {
        this.allFieldsRepository = allFieldsRepository;
    }

    /**
     * {@code POST  /all-fields} : Create a new allFields.
     *
     * @param allFields the allFields to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new allFields, or with status {@code 400 (Bad Request)} if the allFields has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/all-fields")
    public ResponseEntity<AllFields> createAllFields(@Valid @RequestBody AllFields allFields) throws URISyntaxException {
        log.debug("REST request to save AllFields : {}", allFields);
        if (allFields.getId() != null) {
            throw new BadRequestAlertException("A new allFields cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AllFields result = allFieldsRepository.save(allFields);
        return ResponseEntity.created(new URI("/api/all-fields/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /all-fields} : Updates an existing allFields.
     *
     * @param allFields the allFields to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated allFields,
     * or with status {@code 400 (Bad Request)} if the allFields is not valid,
     * or with status {@code 500 (Internal Server Error)} if the allFields couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/all-fields")
    public ResponseEntity<AllFields> updateAllFields(@Valid @RequestBody AllFields allFields) throws URISyntaxException {
        log.debug("REST request to update AllFields : {}", allFields);
        if (allFields.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AllFields result = allFieldsRepository.save(allFields);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, allFields.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /all-fields} : get all the allFields.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of allFields in body.
     */
    @GetMapping("/all-fields")
    public List<AllFields> getAllAllFields() {
        log.debug("REST request to get all AllFields");
        return allFieldsRepository.findAll();
    }

    /**
     * {@code GET  /all-fields/:id} : get the "id" allFields.
     *
     * @param id the id of the allFields to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the allFields, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/all-fields/{id}")
    public ResponseEntity<AllFields> getAllFields(@PathVariable Long id) {
        log.debug("REST request to get AllFields : {}", id);
        Optional<AllFields> allFields = allFieldsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(allFields);
    }

    /**
     * {@code DELETE  /all-fields/:id} : delete the "id" allFields.
     *
     * @param id the id of the allFields to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/all-fields/{id}")
    public ResponseEntity<Void> deleteAllFields(@PathVariable Long id) {
        log.debug("REST request to delete AllFields : {}", id);
        allFieldsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
