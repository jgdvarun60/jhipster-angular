package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.ProTrackApp;
import com.btgrp.protrack.domain.StringFilter;
import com.btgrp.protrack.repository.StringFilterRepository;
import com.btgrp.protrack.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static com.btgrp.protrack.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link StringFilterResource} REST controller.
 */
@SpringBootTest(classes = ProTrackApp.class)
public class StringFilterResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_EXPRESSION = "AAAAAAAAAA";
    private static final String UPDATED_EXPRESSION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_HIDE = false;
    private static final Boolean UPDATED_HIDE = true;

    private static final String DEFAULT_CONTAINS = "AAAAAAAAAA";
    private static final String UPDATED_CONTAINS = "BBBBBBBBBB";

    private static final String DEFAULT_EQUALS = "AAAAAAAAAA";
    private static final String UPDATED_EQUALS = "BBBBBBBBBB";

    private static final String DEFAULT_IN_ARR = "AAAAAAAAAA";
    private static final String UPDATED_IN_ARR = "BBBBBBBBBB";

    private static final Boolean DEFAULT_SPECIFIED = false;
    private static final Boolean UPDATED_SPECIFIED = true;

    @Autowired
    private StringFilterRepository stringFilterRepository;

    @Mock
    private StringFilterRepository stringFilterRepositoryMock;

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

    private MockMvc restStringFilterMockMvc;

    private StringFilter stringFilter;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StringFilterResource stringFilterResource = new StringFilterResource(stringFilterRepository);
        this.restStringFilterMockMvc = MockMvcBuilders.standaloneSetup(stringFilterResource)
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
    public static StringFilter createEntity(EntityManager em) {
        StringFilter stringFilter = new StringFilter()
            .title(DEFAULT_TITLE)
            .expression(DEFAULT_EXPRESSION)
            .hide(DEFAULT_HIDE)
            .contains(DEFAULT_CONTAINS)
            .equals(DEFAULT_EQUALS)
            .inArr(DEFAULT_IN_ARR)
            .specified(DEFAULT_SPECIFIED);
        return stringFilter;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StringFilter createUpdatedEntity(EntityManager em) {
        StringFilter stringFilter = new StringFilter()
            .title(UPDATED_TITLE)
            .expression(UPDATED_EXPRESSION)
            .hide(UPDATED_HIDE)
            .contains(UPDATED_CONTAINS)
            .equals(UPDATED_EQUALS)
            .inArr(UPDATED_IN_ARR)
            .specified(UPDATED_SPECIFIED);
        return stringFilter;
    }

    @BeforeEach
    public void initTest() {
        stringFilter = createEntity(em);
    }

    @Test
    @Transactional
    public void createStringFilter() throws Exception {
        int databaseSizeBeforeCreate = stringFilterRepository.findAll().size();

        // Create the StringFilter
        restStringFilterMockMvc.perform(post("/api/string-filters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stringFilter)))
            .andExpect(status().isCreated());

        // Validate the StringFilter in the database
        List<StringFilter> stringFilterList = stringFilterRepository.findAll();
        assertThat(stringFilterList).hasSize(databaseSizeBeforeCreate + 1);
        StringFilter testStringFilter = stringFilterList.get(stringFilterList.size() - 1);
        assertThat(testStringFilter.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testStringFilter.getExpression()).isEqualTo(DEFAULT_EXPRESSION);
        assertThat(testStringFilter.isHide()).isEqualTo(DEFAULT_HIDE);
        assertThat(testStringFilter.getContains()).isEqualTo(DEFAULT_CONTAINS);
        assertThat(testStringFilter.getEquals()).isEqualTo(DEFAULT_EQUALS);
        assertThat(testStringFilter.getInArr()).isEqualTo(DEFAULT_IN_ARR);
        assertThat(testStringFilter.isSpecified()).isEqualTo(DEFAULT_SPECIFIED);
    }

    @Test
    @Transactional
    public void createStringFilterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stringFilterRepository.findAll().size();

        // Create the StringFilter with an existing ID
        stringFilter.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStringFilterMockMvc.perform(post("/api/string-filters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stringFilter)))
            .andExpect(status().isBadRequest());

        // Validate the StringFilter in the database
        List<StringFilter> stringFilterList = stringFilterRepository.findAll();
        assertThat(stringFilterList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllStringFilters() throws Exception {
        // Initialize the database
        stringFilterRepository.saveAndFlush(stringFilter);

        // Get all the stringFilterList
        restStringFilterMockMvc.perform(get("/api/string-filters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stringFilter.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].expression").value(hasItem(DEFAULT_EXPRESSION.toString())))
            .andExpect(jsonPath("$.[*].hide").value(hasItem(DEFAULT_HIDE.booleanValue())))
            .andExpect(jsonPath("$.[*].contains").value(hasItem(DEFAULT_CONTAINS.toString())))
            .andExpect(jsonPath("$.[*].equals").value(hasItem(DEFAULT_EQUALS.toString())))
            .andExpect(jsonPath("$.[*].inArr").value(hasItem(DEFAULT_IN_ARR.toString())))
            .andExpect(jsonPath("$.[*].specified").value(hasItem(DEFAULT_SPECIFIED.booleanValue())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllStringFiltersWithEagerRelationshipsIsEnabled() throws Exception {
        StringFilterResource stringFilterResource = new StringFilterResource(stringFilterRepositoryMock);
        when(stringFilterRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restStringFilterMockMvc = MockMvcBuilders.standaloneSetup(stringFilterResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restStringFilterMockMvc.perform(get("/api/string-filters?eagerload=true"))
        .andExpect(status().isOk());

        verify(stringFilterRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllStringFiltersWithEagerRelationshipsIsNotEnabled() throws Exception {
        StringFilterResource stringFilterResource = new StringFilterResource(stringFilterRepositoryMock);
            when(stringFilterRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restStringFilterMockMvc = MockMvcBuilders.standaloneSetup(stringFilterResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restStringFilterMockMvc.perform(get("/api/string-filters?eagerload=true"))
        .andExpect(status().isOk());

            verify(stringFilterRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getStringFilter() throws Exception {
        // Initialize the database
        stringFilterRepository.saveAndFlush(stringFilter);

        // Get the stringFilter
        restStringFilterMockMvc.perform(get("/api/string-filters/{id}", stringFilter.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(stringFilter.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.expression").value(DEFAULT_EXPRESSION.toString()))
            .andExpect(jsonPath("$.hide").value(DEFAULT_HIDE.booleanValue()))
            .andExpect(jsonPath("$.contains").value(DEFAULT_CONTAINS.toString()))
            .andExpect(jsonPath("$.equals").value(DEFAULT_EQUALS.toString()))
            .andExpect(jsonPath("$.inArr").value(DEFAULT_IN_ARR.toString()))
            .andExpect(jsonPath("$.specified").value(DEFAULT_SPECIFIED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingStringFilter() throws Exception {
        // Get the stringFilter
        restStringFilterMockMvc.perform(get("/api/string-filters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStringFilter() throws Exception {
        // Initialize the database
        stringFilterRepository.saveAndFlush(stringFilter);

        int databaseSizeBeforeUpdate = stringFilterRepository.findAll().size();

        // Update the stringFilter
        StringFilter updatedStringFilter = stringFilterRepository.findById(stringFilter.getId()).get();
        // Disconnect from session so that the updates on updatedStringFilter are not directly saved in db
        em.detach(updatedStringFilter);
        updatedStringFilter
            .title(UPDATED_TITLE)
            .expression(UPDATED_EXPRESSION)
            .hide(UPDATED_HIDE)
            .contains(UPDATED_CONTAINS)
            .equals(UPDATED_EQUALS)
            .inArr(UPDATED_IN_ARR)
            .specified(UPDATED_SPECIFIED);

        restStringFilterMockMvc.perform(put("/api/string-filters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStringFilter)))
            .andExpect(status().isOk());

        // Validate the StringFilter in the database
        List<StringFilter> stringFilterList = stringFilterRepository.findAll();
        assertThat(stringFilterList).hasSize(databaseSizeBeforeUpdate);
        StringFilter testStringFilter = stringFilterList.get(stringFilterList.size() - 1);
        assertThat(testStringFilter.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testStringFilter.getExpression()).isEqualTo(UPDATED_EXPRESSION);
        assertThat(testStringFilter.isHide()).isEqualTo(UPDATED_HIDE);
        assertThat(testStringFilter.getContains()).isEqualTo(UPDATED_CONTAINS);
        assertThat(testStringFilter.getEquals()).isEqualTo(UPDATED_EQUALS);
        assertThat(testStringFilter.getInArr()).isEqualTo(UPDATED_IN_ARR);
        assertThat(testStringFilter.isSpecified()).isEqualTo(UPDATED_SPECIFIED);
    }

    @Test
    @Transactional
    public void updateNonExistingStringFilter() throws Exception {
        int databaseSizeBeforeUpdate = stringFilterRepository.findAll().size();

        // Create the StringFilter

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStringFilterMockMvc.perform(put("/api/string-filters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stringFilter)))
            .andExpect(status().isBadRequest());

        // Validate the StringFilter in the database
        List<StringFilter> stringFilterList = stringFilterRepository.findAll();
        assertThat(stringFilterList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStringFilter() throws Exception {
        // Initialize the database
        stringFilterRepository.saveAndFlush(stringFilter);

        int databaseSizeBeforeDelete = stringFilterRepository.findAll().size();

        // Delete the stringFilter
        restStringFilterMockMvc.perform(delete("/api/string-filters/{id}", stringFilter.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StringFilter> stringFilterList = stringFilterRepository.findAll();
        assertThat(stringFilterList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StringFilter.class);
        StringFilter stringFilter1 = new StringFilter();
        stringFilter1.setId(1L);
        StringFilter stringFilter2 = new StringFilter();
        stringFilter2.setId(stringFilter1.getId());
        assertThat(stringFilter1).isEqualTo(stringFilter2);
        stringFilter2.setId(2L);
        assertThat(stringFilter1).isNotEqualTo(stringFilter2);
        stringFilter1.setId(null);
        assertThat(stringFilter1).isNotEqualTo(stringFilter2);
    }
}
