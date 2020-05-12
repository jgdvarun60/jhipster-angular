package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.ProTrackApp;
import com.btgrp.protrack.domain.AllFields;
import com.btgrp.protrack.repository.AllFieldsRepository;
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
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.btgrp.protrack.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AllFieldsResource} REST controller.
 */
@SpringBootTest(classes = ProTrackApp.class)
public class AllFieldsResourceIT {

    private static final Double DEFAULT_DOUBLE_FIELD = 2D;
    private static final Double UPDATED_DOUBLE_FIELD = 3D;
    private static final Double SMALLER_DOUBLE_FIELD = 2D - 1D;

    private static final Float DEFAULT_FLOAT_FIELD = 2F;
    private static final Float UPDATED_FLOAT_FIELD = 3F;
    private static final Float SMALLER_FLOAT_FIELD = 2F - 1F;

    private static final Long DEFAULT_LONG_FIELD = 2L;
    private static final Long UPDATED_LONG_FIELD = 3L;
    private static final Long SMALLER_LONG_FIELD = 2L - 1L;

    private static final Instant DEFAULT_INSTANT_FIELD = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_INSTANT_FIELD = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_INSTANT_FIELD = Instant.ofEpochMilli(-1L);

    private static final Duration DEFAULT_DURATION_FIELD = Duration.ofHours(6);
    private static final Duration UPDATED_DURATION_FIELD = Duration.ofHours(12);
    private static final Duration SMALLER_DURATION_FIELD = Duration.ofHours(5);

    private static final String DEFAULT_STRING_FIELD = "Gf8";
    private static final String UPDATED_STRING_FIELD = "Lq1";

    @Autowired
    private AllFieldsRepository allFieldsRepository;

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

    private MockMvc restAllFieldsMockMvc;

    private AllFields allFields;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AllFieldsResource allFieldsResource = new AllFieldsResource(allFieldsRepository);
        this.restAllFieldsMockMvc = MockMvcBuilders.standaloneSetup(allFieldsResource)
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
    public static AllFields createEntity(EntityManager em) {
        AllFields allFields = new AllFields()
            .doubleField(DEFAULT_DOUBLE_FIELD)
            .floatField(DEFAULT_FLOAT_FIELD)
            .longField(DEFAULT_LONG_FIELD)
            .instantField(DEFAULT_INSTANT_FIELD)
            .durationField(DEFAULT_DURATION_FIELD)
            .stringField(DEFAULT_STRING_FIELD);
        return allFields;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AllFields createUpdatedEntity(EntityManager em) {
        AllFields allFields = new AllFields()
            .doubleField(UPDATED_DOUBLE_FIELD)
            .floatField(UPDATED_FLOAT_FIELD)
            .longField(UPDATED_LONG_FIELD)
            .instantField(UPDATED_INSTANT_FIELD)
            .durationField(UPDATED_DURATION_FIELD)
            .stringField(UPDATED_STRING_FIELD);
        return allFields;
    }

    @BeforeEach
    public void initTest() {
        allFields = createEntity(em);
    }

    @Test
    @Transactional
    public void createAllFields() throws Exception {
        int databaseSizeBeforeCreate = allFieldsRepository.findAll().size();

        // Create the AllFields
        restAllFieldsMockMvc.perform(post("/api/all-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(allFields)))
            .andExpect(status().isCreated());

        // Validate the AllFields in the database
        List<AllFields> allFieldsList = allFieldsRepository.findAll();
        assertThat(allFieldsList).hasSize(databaseSizeBeforeCreate + 1);
        AllFields testAllFields = allFieldsList.get(allFieldsList.size() - 1);
        assertThat(testAllFields.getDoubleField()).isEqualTo(DEFAULT_DOUBLE_FIELD);
        assertThat(testAllFields.getFloatField()).isEqualTo(DEFAULT_FLOAT_FIELD);
        assertThat(testAllFields.getLongField()).isEqualTo(DEFAULT_LONG_FIELD);
        assertThat(testAllFields.getInstantField()).isEqualTo(DEFAULT_INSTANT_FIELD);
        assertThat(testAllFields.getDurationField()).isEqualTo(DEFAULT_DURATION_FIELD);
        assertThat(testAllFields.getStringField()).isEqualTo(DEFAULT_STRING_FIELD);
    }

    @Test
    @Transactional
    public void createAllFieldsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = allFieldsRepository.findAll().size();

        // Create the AllFields with an existing ID
        allFields.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAllFieldsMockMvc.perform(post("/api/all-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(allFields)))
            .andExpect(status().isBadRequest());

        // Validate the AllFields in the database
        List<AllFields> allFieldsList = allFieldsRepository.findAll();
        assertThat(allFieldsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAllFields() throws Exception {
        // Initialize the database
        allFieldsRepository.saveAndFlush(allFields);

        // Get all the allFieldsList
        restAllFieldsMockMvc.perform(get("/api/all-fields?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(allFields.getId().intValue())))
            .andExpect(jsonPath("$.[*].doubleField").value(hasItem(DEFAULT_DOUBLE_FIELD.doubleValue())))
            .andExpect(jsonPath("$.[*].floatField").value(hasItem(DEFAULT_FLOAT_FIELD.doubleValue())))
            .andExpect(jsonPath("$.[*].longField").value(hasItem(DEFAULT_LONG_FIELD.intValue())))
            .andExpect(jsonPath("$.[*].instantField").value(hasItem(DEFAULT_INSTANT_FIELD.toString())))
            .andExpect(jsonPath("$.[*].durationField").value(hasItem(DEFAULT_DURATION_FIELD.toString())))
            .andExpect(jsonPath("$.[*].stringField").value(hasItem(DEFAULT_STRING_FIELD.toString())));
    }
    
    @Test
    @Transactional
    public void getAllFields() throws Exception {
        // Initialize the database
        allFieldsRepository.saveAndFlush(allFields);

        // Get the allFields
        restAllFieldsMockMvc.perform(get("/api/all-fields/{id}", allFields.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(allFields.getId().intValue()))
            .andExpect(jsonPath("$.doubleField").value(DEFAULT_DOUBLE_FIELD.doubleValue()))
            .andExpect(jsonPath("$.floatField").value(DEFAULT_FLOAT_FIELD.doubleValue()))
            .andExpect(jsonPath("$.longField").value(DEFAULT_LONG_FIELD.intValue()))
            .andExpect(jsonPath("$.instantField").value(DEFAULT_INSTANT_FIELD.toString()))
            .andExpect(jsonPath("$.durationField").value(DEFAULT_DURATION_FIELD.toString()))
            .andExpect(jsonPath("$.stringField").value(DEFAULT_STRING_FIELD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAllFields() throws Exception {
        // Get the allFields
        restAllFieldsMockMvc.perform(get("/api/all-fields/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAllFields() throws Exception {
        // Initialize the database
        allFieldsRepository.saveAndFlush(allFields);

        int databaseSizeBeforeUpdate = allFieldsRepository.findAll().size();

        // Update the allFields
        AllFields updatedAllFields = allFieldsRepository.findById(allFields.getId()).get();
        // Disconnect from session so that the updates on updatedAllFields are not directly saved in db
        em.detach(updatedAllFields);
        updatedAllFields
            .doubleField(UPDATED_DOUBLE_FIELD)
            .floatField(UPDATED_FLOAT_FIELD)
            .longField(UPDATED_LONG_FIELD)
            .instantField(UPDATED_INSTANT_FIELD)
            .durationField(UPDATED_DURATION_FIELD)
            .stringField(UPDATED_STRING_FIELD);

        restAllFieldsMockMvc.perform(put("/api/all-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAllFields)))
            .andExpect(status().isOk());

        // Validate the AllFields in the database
        List<AllFields> allFieldsList = allFieldsRepository.findAll();
        assertThat(allFieldsList).hasSize(databaseSizeBeforeUpdate);
        AllFields testAllFields = allFieldsList.get(allFieldsList.size() - 1);
        assertThat(testAllFields.getDoubleField()).isEqualTo(UPDATED_DOUBLE_FIELD);
        assertThat(testAllFields.getFloatField()).isEqualTo(UPDATED_FLOAT_FIELD);
        assertThat(testAllFields.getLongField()).isEqualTo(UPDATED_LONG_FIELD);
        assertThat(testAllFields.getInstantField()).isEqualTo(UPDATED_INSTANT_FIELD);
        assertThat(testAllFields.getDurationField()).isEqualTo(UPDATED_DURATION_FIELD);
        assertThat(testAllFields.getStringField()).isEqualTo(UPDATED_STRING_FIELD);
    }

    @Test
    @Transactional
    public void updateNonExistingAllFields() throws Exception {
        int databaseSizeBeforeUpdate = allFieldsRepository.findAll().size();

        // Create the AllFields

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAllFieldsMockMvc.perform(put("/api/all-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(allFields)))
            .andExpect(status().isBadRequest());

        // Validate the AllFields in the database
        List<AllFields> allFieldsList = allFieldsRepository.findAll();
        assertThat(allFieldsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAllFields() throws Exception {
        // Initialize the database
        allFieldsRepository.saveAndFlush(allFields);

        int databaseSizeBeforeDelete = allFieldsRepository.findAll().size();

        // Delete the allFields
        restAllFieldsMockMvc.perform(delete("/api/all-fields/{id}", allFields.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AllFields> allFieldsList = allFieldsRepository.findAll();
        assertThat(allFieldsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AllFields.class);
        AllFields allFields1 = new AllFields();
        allFields1.setId(1L);
        AllFields allFields2 = new AllFields();
        allFields2.setId(allFields1.getId());
        assertThat(allFields1).isEqualTo(allFields2);
        allFields2.setId(2L);
        assertThat(allFields1).isNotEqualTo(allFields2);
        allFields1.setId(null);
        assertThat(allFields1).isNotEqualTo(allFields2);
    }
}
