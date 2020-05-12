package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.domain.DummyEnums;
import com.btgrp.protrack.repository.DummyEnumsRepository;
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
 * REST controller for managing {@link com.btgrp.protrack.domain.DummyEnums}.
 */
@RestController
@RequestMapping("/api")
public class DummyEnumsResource {

    private final Logger log = LoggerFactory.getLogger(DummyEnumsResource.class);

    private static final String ENTITY_NAME = "dummyEnums";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DummyEnumsRepository dummyEnumsRepository;

    public DummyEnumsResource(DummyEnumsRepository dummyEnumsRepository) {
        this.dummyEnumsRepository = dummyEnumsRepository;
    }

    /**
     * {@code POST  /dummy-enums} : Create a new dummyEnums.
     *
     * @param dummyEnums the dummyEnums to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dummyEnums, or with status {@code 400 (Bad Request)} if the dummyEnums has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/dummy-enums")
    public ResponseEntity<DummyEnums> createDummyEnums(@RequestBody DummyEnums dummyEnums) throws URISyntaxException {
        log.debug("REST request to save DummyEnums : {}", dummyEnums);
        if (dummyEnums.getId() != null) {
            throw new BadRequestAlertException("A new dummyEnums cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DummyEnums result = dummyEnumsRepository.save(dummyEnums);
        return ResponseEntity.created(new URI("/api/dummy-enums/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /dummy-enums} : Updates an existing dummyEnums.
     *
     * @param dummyEnums the dummyEnums to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dummyEnums,
     * or with status {@code 400 (Bad Request)} if the dummyEnums is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dummyEnums couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/dummy-enums")
    public ResponseEntity<DummyEnums> updateDummyEnums(@RequestBody DummyEnums dummyEnums) throws URISyntaxException {
        log.debug("REST request to update DummyEnums : {}", dummyEnums);
        if (dummyEnums.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DummyEnums result = dummyEnumsRepository.save(dummyEnums);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, dummyEnums.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /dummy-enums} : get all the dummyEnums.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dummyEnums in body.
     */
    @GetMapping("/dummy-enums")
    public List<DummyEnums> getAllDummyEnums() {
        log.debug("REST request to get all DummyEnums");
        return dummyEnumsRepository.findAll();
    }

    /**
     * {@code GET  /dummy-enums/:id} : get the "id" dummyEnums.
     *
     * @param id the id of the dummyEnums to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dummyEnums, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/dummy-enums/{id}")
    public ResponseEntity<DummyEnums> getDummyEnums(@PathVariable Long id) {
        log.debug("REST request to get DummyEnums : {}", id);
        Optional<DummyEnums> dummyEnums = dummyEnumsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dummyEnums);
    }

    /**
     * {@code DELETE  /dummy-enums/:id} : delete the "id" dummyEnums.
     *
     * @param id the id of the dummyEnums to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/dummy-enums/{id}")
    public ResponseEntity<Void> deleteDummyEnums(@PathVariable Long id) {
        log.debug("REST request to delete DummyEnums : {}", id);
        dummyEnumsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
