package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.ProTrackApp;
import com.btgrp.protrack.domain.Dummy;
import com.btgrp.protrack.repository.DummyRepository;
import com.btgrp.protrack.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.btgrp.protrack.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DummyResource} REST controller.
 */
@SpringBootTest(classes = ProTrackApp.class)
public class DummyResourceIT {

    private static final String DEFAULT_DUMMY = "AAAAAAAAAA";
    private static final String UPDATED_DUMMY = "BBBBBBBBBB";

    @Autowired
    private DummyRepository dummyRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restDummyMockMvc;

    private Dummy dummy;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DummyResource dummyResource = new DummyResource(dummyRepository);
        this.restDummyMockMvc = MockMvcBuilders.standaloneSetup(dummyResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Dummy createEntity(EntityManager em) {
        Dummy dummy = new Dummy()
            .dummy(DEFAULT_DUMMY);
        return dummy;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Dummy createUpdatedEntity(EntityManager em) {
        Dummy dummy = new Dummy()
            .dummy(UPDATED_DUMMY);
        return dummy;
    }

    @BeforeEach
    public void initTest() {
        dummy = createEntity(em);
    }

    @Test
    @Transactional
    public void createDummy() throws Exception {
        int databaseSizeBeforeCreate = dummyRepository.findAll().size();

        // Create the Dummy
        restDummyMockMvc.perform(post("/api/dummies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dummy)))
            .andExpect(status().isCreated());

        // Validate the Dummy in the database
        List<Dummy> dummyList = dummyRepository.findAll();
        assertThat(dummyList).hasSize(databaseSizeBeforeCreate + 1);
        Dummy testDummy = dummyList.get(dummyList.size() - 1);
        assertThat(testDummy.getDummy()).isEqualTo(DEFAULT_DUMMY);
    }

    @Test
    @Transactional
    public void createDummyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dummyRepository.findAll().size();

        // Create the Dummy with an existing ID
        dummy.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDummyMockMvc.perform(post("/api/dummies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dummy)))
            .andExpect(status().isBadRequest());

        // Validate the Dummy in the database
        List<Dummy> dummyList = dummyRepository.findAll();
        assertThat(dummyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDummies() throws Exception {
        // Initialize the database
        dummyRepository.saveAndFlush(dummy);

        // Get all the dummyList
        restDummyMockMvc.perform(get("/api/dummies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dummy.getId().intValue())))
            .andExpect(jsonPath("$.[*].dummy").value(hasItem(DEFAULT_DUMMY.toString())));
    }
    
    @Test
    @Transactional
    public void getDummy() throws Exception {
        // Initialize the database
        dummyRepository.saveAndFlush(dummy);

        // Get the dummy
        restDummyMockMvc.perform(get("/api/dummies/{id}", dummy.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dummy.getId().intValue()))
            .andExpect(jsonPath("$.dummy").value(DEFAULT_DUMMY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDummy() throws Exception {
        // Get the dummy
        restDummyMockMvc.perform(get("/api/dummies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDummy() throws Exception {
        // Initialize the database
        dummyRepository.saveAndFlush(dummy);

        int databaseSizeBeforeUpdate = dummyRepository.findAll().size();

        // Update the dummy
        Dummy updatedDummy = dummyRepository.findById(dummy.getId()).get();
        // Disconnect from session so that the updates on updatedDummy are not directly saved in db
        em.detach(updatedDummy);
        updatedDummy
            .dummy(UPDATED_DUMMY);

        restDummyMockMvc.perform(put("/api/dummies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDummy)))
            .andExpect(status().isOk());

        // Validate the Dummy in the database
        List<Dummy> dummyList = dummyRepository.findAll();
        assertThat(dummyList).hasSize(databaseSizeBeforeUpdate);
        Dummy testDummy = dummyList.get(dummyList.size() - 1);
        assertThat(testDummy.getDummy()).isEqualTo(UPDATED_DUMMY);
    }

    @Test
    @Transactional
    public void updateNonExistingDummy() throws Exception {
        int databaseSizeBeforeUpdate = dummyRepository.findAll().size();

        // Create the Dummy

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDummyMockMvc.perform(put("/api/dummies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dummy)))
            .andExpect(status().isBadRequest());

        // Validate the Dummy in the database
        List<Dummy> dummyList = dummyRepository.findAll();
        assertThat(dummyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDummy() throws Exception {
        // Initialize the database
        dummyRepository.saveAndFlush(dummy);

        int databaseSizeBeforeDelete = dummyRepository.findAll().size();

        // Delete the dummy
        restDummyMockMvc.perform(delete("/api/dummies/{id}", dummy.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Dummy> dummyList = dummyRepository.findAll();
        assertThat(dummyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Dummy.class);
        Dummy dummy1 = new Dummy();
        dummy1.setId(1L);
        Dummy dummy2 = new Dummy();
        dummy2.setId(dummy1.getId());
        assertThat(dummy1).isEqualTo(dummy2);
        dummy2.setId(2L);
        assertThat(dummy1).isNotEqualTo(dummy2);
        dummy1.setId(null);
        assertThat(dummy1).isNotEqualTo(dummy2);
    }
}
