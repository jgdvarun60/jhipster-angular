package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.ProTrackApp;
import com.btgrp.protrack.domain.DummyEnums;
import com.btgrp.protrack.repository.DummyEnumsRepository;
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

import com.btgrp.protrack.domain.enumeration.DummyEnum;
/**
 * Integration tests for the {@link DummyEnumsResource} REST controller.
 */
@SpringBootTest(classes = ProTrackApp.class)
public class DummyEnumsResourceIT {

    private static final DummyEnum DEFAULT_DUMMY = DummyEnum.A;
    private static final DummyEnum UPDATED_DUMMY = DummyEnum.B;

    @Autowired
    private DummyEnumsRepository dummyEnumsRepository;

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

    private MockMvc restDummyEnumsMockMvc;

    private DummyEnums dummyEnums;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DummyEnumsResource dummyEnumsResource = new DummyEnumsResource(dummyEnumsRepository);
        this.restDummyEnumsMockMvc = MockMvcBuilders.standaloneSetup(dummyEnumsResource)
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
    public static DummyEnums createEntity(EntityManager em) {
        DummyEnums dummyEnums = new DummyEnums()
            .dummy(DEFAULT_DUMMY);
        return dummyEnums;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DummyEnums createUpdatedEntity(EntityManager em) {
        DummyEnums dummyEnums = new DummyEnums()
            .dummy(UPDATED_DUMMY);
        return dummyEnums;
    }

    @BeforeEach
    public void initTest() {
        dummyEnums = createEntity(em);
    }

    @Test
    @Transactional
    public void createDummyEnums() throws Exception {
        int databaseSizeBeforeCreate = dummyEnumsRepository.findAll().size();

        // Create the DummyEnums
        restDummyEnumsMockMvc.perform(post("/api/dummy-enums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dummyEnums)))
            .andExpect(status().isCreated());

        // Validate the DummyEnums in the database
        List<DummyEnums> dummyEnumsList = dummyEnumsRepository.findAll();
        assertThat(dummyEnumsList).hasSize(databaseSizeBeforeCreate + 1);
        DummyEnums testDummyEnums = dummyEnumsList.get(dummyEnumsList.size() - 1);
        assertThat(testDummyEnums.getDummy()).isEqualTo(DEFAULT_DUMMY);
    }

    @Test
    @Transactional
    public void createDummyEnumsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dummyEnumsRepository.findAll().size();

        // Create the DummyEnums with an existing ID
        dummyEnums.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDummyEnumsMockMvc.perform(post("/api/dummy-enums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dummyEnums)))
            .andExpect(status().isBadRequest());

        // Validate the DummyEnums in the database
        List<DummyEnums> dummyEnumsList = dummyEnumsRepository.findAll();
        assertThat(dummyEnumsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDummyEnums() throws Exception {
        // Initialize the database
        dummyEnumsRepository.saveAndFlush(dummyEnums);

        // Get all the dummyEnumsList
        restDummyEnumsMockMvc.perform(get("/api/dummy-enums?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dummyEnums.getId().intValue())))
            .andExpect(jsonPath("$.[*].dummy").value(hasItem(DEFAULT_DUMMY.toString())));
    }
    
    @Test
    @Transactional
    public void getDummyEnums() throws Exception {
        // Initialize the database
        dummyEnumsRepository.saveAndFlush(dummyEnums);

        // Get the dummyEnums
        restDummyEnumsMockMvc.perform(get("/api/dummy-enums/{id}", dummyEnums.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dummyEnums.getId().intValue()))
            .andExpect(jsonPath("$.dummy").value(DEFAULT_DUMMY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDummyEnums() throws Exception {
        // Get the dummyEnums
        restDummyEnumsMockMvc.perform(get("/api/dummy-enums/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDummyEnums() throws Exception {
        // Initialize the database
        dummyEnumsRepository.saveAndFlush(dummyEnums);

        int databaseSizeBeforeUpdate = dummyEnumsRepository.findAll().size();

        // Update the dummyEnums
        DummyEnums updatedDummyEnums = dummyEnumsRepository.findById(dummyEnums.getId()).get();
        // Disconnect from session so that the updates on updatedDummyEnums are not directly saved in db
        em.detach(updatedDummyEnums);
        updatedDummyEnums
            .dummy(UPDATED_DUMMY);

        restDummyEnumsMockMvc.perform(put("/api/dummy-enums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDummyEnums)))
            .andExpect(status().isOk());

        // Validate the DummyEnums in the database
        List<DummyEnums> dummyEnumsList = dummyEnumsRepository.findAll();
        assertThat(dummyEnumsList).hasSize(databaseSizeBeforeUpdate);
        DummyEnums testDummyEnums = dummyEnumsList.get(dummyEnumsList.size() - 1);
        assertThat(testDummyEnums.getDummy()).isEqualTo(UPDATED_DUMMY);
    }

    @Test
    @Transactional
    public void updateNonExistingDummyEnums() throws Exception {
        int databaseSizeBeforeUpdate = dummyEnumsRepository.findAll().size();

        // Create the DummyEnums

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDummyEnumsMockMvc.perform(put("/api/dummy-enums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dummyEnums)))
            .andExpect(status().isBadRequest());

        // Validate the DummyEnums in the database
        List<DummyEnums> dummyEnumsList = dummyEnumsRepository.findAll();
        assertThat(dummyEnumsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDummyEnums() throws Exception {
        // Initialize the database
        dummyEnumsRepository.saveAndFlush(dummyEnums);

        int databaseSizeBeforeDelete = dummyEnumsRepository.findAll().size();

        // Delete the dummyEnums
        restDummyEnumsMockMvc.perform(delete("/api/dummy-enums/{id}", dummyEnums.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DummyEnums> dummyEnumsList = dummyEnumsRepository.findAll();
        assertThat(dummyEnumsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DummyEnums.class);
        DummyEnums dummyEnums1 = new DummyEnums();
        dummyEnums1.setId(1L);
        DummyEnums dummyEnums2 = new DummyEnums();
        dummyEnums2.setId(dummyEnums1.getId());
        assertThat(dummyEnums1).isEqualTo(dummyEnums2);
        dummyEnums2.setId(2L);
        assertThat(dummyEnums1).isNotEqualTo(dummyEnums2);
        dummyEnums1.setId(null);
        assertThat(dummyEnums1).isNotEqualTo(dummyEnums2);
    }
}
