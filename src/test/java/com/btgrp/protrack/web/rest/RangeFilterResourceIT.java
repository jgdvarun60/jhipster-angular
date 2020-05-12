package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.ProTrackApp;
import com.btgrp.protrack.domain.RangeFilter;
import com.btgrp.protrack.repository.RangeFilterRepository;
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
 * Integration tests for the {@link RangeFilterResource} REST controller.
 */
@SpringBootTest(classes = ProTrackApp.class)
public class RangeFilterResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_EXPRESSION = "AAAAAAAAAA";
    private static final String UPDATED_EXPRESSION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_HIDE = false;
    private static final Boolean UPDATED_HIDE = true;

    private static final String DEFAULT_EQUALS = "AAAAAAAAAA";
    private static final String UPDATED_EQUALS = "BBBBBBBBBB";

    private static final String DEFAULT_GREATER_THAN = "AAAAAAAAAA";
    private static final String UPDATED_GREATER_THAN = "BBBBBBBBBB";

    private static final String DEFAULT_GREATER_THAN_OR_EQUAL = "AAAAAAAAAA";
    private static final String UPDATED_GREATER_THAN_OR_EQUAL = "BBBBBBBBBB";

    private static final String DEFAULT_IN_ARR = "AAAAAAAAAA";
    private static final String UPDATED_IN_ARR = "BBBBBBBBBB";

    private static final String DEFAULT_LESS_THAN = "AAAAAAAAAA";
    private static final String UPDATED_LESS_THAN = "BBBBBBBBBB";

    private static final String DEFAULT_LESS_THAN_OR_EQUAL = "AAAAAAAAAA";
    private static final String UPDATED_LESS_THAN_OR_EQUAL = "BBBBBBBBBB";

    private static final Boolean DEFAULT_SPECIFIED = false;
    private static final Boolean UPDATED_SPECIFIED = true;

    @Autowired
    private RangeFilterRepository rangeFilterRepository;

    @Mock
    private RangeFilterRepository rangeFilterRepositoryMock;

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

    private MockMvc restRangeFilterMockMvc;

    private RangeFilter rangeFilter;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RangeFilterResource rangeFilterResource = new RangeFilterResource(rangeFilterRepository);
        this.restRangeFilterMockMvc = MockMvcBuilders.standaloneSetup(rangeFilterResource)
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
    public static RangeFilter createEntity(EntityManager em) {
        RangeFilter rangeFilter = new RangeFilter()
            .title(DEFAULT_TITLE)
            .expression(DEFAULT_EXPRESSION)
            .hide(DEFAULT_HIDE)
            .equals(DEFAULT_EQUALS)
            .greaterThan(DEFAULT_GREATER_THAN)
            .greaterThanOrEqual(DEFAULT_GREATER_THAN_OR_EQUAL)
            .inArr(DEFAULT_IN_ARR)
            .lessThan(DEFAULT_LESS_THAN)
            .lessThanOrEqual(DEFAULT_LESS_THAN_OR_EQUAL)
            .specified(DEFAULT_SPECIFIED);
        return rangeFilter;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RangeFilter createUpdatedEntity(EntityManager em) {
        RangeFilter rangeFilter = new RangeFilter()
            .title(UPDATED_TITLE)
            .expression(UPDATED_EXPRESSION)
            .hide(UPDATED_HIDE)
            .equals(UPDATED_EQUALS)
            .greaterThan(UPDATED_GREATER_THAN)
            .greaterThanOrEqual(UPDATED_GREATER_THAN_OR_EQUAL)
            .inArr(UPDATED_IN_ARR)
            .lessThan(UPDATED_LESS_THAN)
            .lessThanOrEqual(UPDATED_LESS_THAN_OR_EQUAL)
            .specified(UPDATED_SPECIFIED);
        return rangeFilter;
    }

    @BeforeEach
    public void initTest() {
        rangeFilter = createEntity(em);
    }

    @Test
    @Transactional
    public void createRangeFilter() throws Exception {
        int databaseSizeBeforeCreate = rangeFilterRepository.findAll().size();

        // Create the RangeFilter
        restRangeFilterMockMvc.perform(post("/api/range-filters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rangeFilter)))
            .andExpect(status().isCreated());

        // Validate the RangeFilter in the database
        List<RangeFilter> rangeFilterList = rangeFilterRepository.findAll();
        assertThat(rangeFilterList).hasSize(databaseSizeBeforeCreate + 1);
        RangeFilter testRangeFilter = rangeFilterList.get(rangeFilterList.size() - 1);
        assertThat(testRangeFilter.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testRangeFilter.getExpression()).isEqualTo(DEFAULT_EXPRESSION);
        assertThat(testRangeFilter.isHide()).isEqualTo(DEFAULT_HIDE);
        assertThat(testRangeFilter.getEquals()).isEqualTo(DEFAULT_EQUALS);
        assertThat(testRangeFilter.getGreaterThan()).isEqualTo(DEFAULT_GREATER_THAN);
        assertThat(testRangeFilter.getGreaterThanOrEqual()).isEqualTo(DEFAULT_GREATER_THAN_OR_EQUAL);
        assertThat(testRangeFilter.getInArr()).isEqualTo(DEFAULT_IN_ARR);
        assertThat(testRangeFilter.getLessThan()).isEqualTo(DEFAULT_LESS_THAN);
        assertThat(testRangeFilter.getLessThanOrEqual()).isEqualTo(DEFAULT_LESS_THAN_OR_EQUAL);
        assertThat(testRangeFilter.isSpecified()).isEqualTo(DEFAULT_SPECIFIED);
    }

    @Test
    @Transactional
    public void createRangeFilterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rangeFilterRepository.findAll().size();

        // Create the RangeFilter with an existing ID
        rangeFilter.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRangeFilterMockMvc.perform(post("/api/range-filters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rangeFilter)))
            .andExpect(status().isBadRequest());

        // Validate the RangeFilter in the database
        List<RangeFilter> rangeFilterList = rangeFilterRepository.findAll();
        assertThat(rangeFilterList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRangeFilters() throws Exception {
        // Initialize the database
        rangeFilterRepository.saveAndFlush(rangeFilter);

        // Get all the rangeFilterList
        restRangeFilterMockMvc.perform(get("/api/range-filters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rangeFilter.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].expression").value(hasItem(DEFAULT_EXPRESSION.toString())))
            .andExpect(jsonPath("$.[*].hide").value(hasItem(DEFAULT_HIDE.booleanValue())))
            .andExpect(jsonPath("$.[*].equals").value(hasItem(DEFAULT_EQUALS.toString())))
            .andExpect(jsonPath("$.[*].greaterThan").value(hasItem(DEFAULT_GREATER_THAN.toString())))
            .andExpect(jsonPath("$.[*].greaterThanOrEqual").value(hasItem(DEFAULT_GREATER_THAN_OR_EQUAL.toString())))
            .andExpect(jsonPath("$.[*].inArr").value(hasItem(DEFAULT_IN_ARR.toString())))
            .andExpect(jsonPath("$.[*].lessThan").value(hasItem(DEFAULT_LESS_THAN.toString())))
            .andExpect(jsonPath("$.[*].lessThanOrEqual").value(hasItem(DEFAULT_LESS_THAN_OR_EQUAL.toString())))
            .andExpect(jsonPath("$.[*].specified").value(hasItem(DEFAULT_SPECIFIED.booleanValue())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllRangeFiltersWithEagerRelationshipsIsEnabled() throws Exception {
        RangeFilterResource rangeFilterResource = new RangeFilterResource(rangeFilterRepositoryMock);
        when(rangeFilterRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restRangeFilterMockMvc = MockMvcBuilders.standaloneSetup(rangeFilterResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restRangeFilterMockMvc.perform(get("/api/range-filters?eagerload=true"))
        .andExpect(status().isOk());

        verify(rangeFilterRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllRangeFiltersWithEagerRelationshipsIsNotEnabled() throws Exception {
        RangeFilterResource rangeFilterResource = new RangeFilterResource(rangeFilterRepositoryMock);
            when(rangeFilterRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restRangeFilterMockMvc = MockMvcBuilders.standaloneSetup(rangeFilterResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restRangeFilterMockMvc.perform(get("/api/range-filters?eagerload=true"))
        .andExpect(status().isOk());

            verify(rangeFilterRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getRangeFilter() throws Exception {
        // Initialize the database
        rangeFilterRepository.saveAndFlush(rangeFilter);

        // Get the rangeFilter
        restRangeFilterMockMvc.perform(get("/api/range-filters/{id}", rangeFilter.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rangeFilter.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.expression").value(DEFAULT_EXPRESSION.toString()))
            .andExpect(jsonPath("$.hide").value(DEFAULT_HIDE.booleanValue()))
            .andExpect(jsonPath("$.equals").value(DEFAULT_EQUALS.toString()))
            .andExpect(jsonPath("$.greaterThan").value(DEFAULT_GREATER_THAN.toString()))
            .andExpect(jsonPath("$.greaterThanOrEqual").value(DEFAULT_GREATER_THAN_OR_EQUAL.toString()))
            .andExpect(jsonPath("$.inArr").value(DEFAULT_IN_ARR.toString()))
            .andExpect(jsonPath("$.lessThan").value(DEFAULT_LESS_THAN.toString()))
            .andExpect(jsonPath("$.lessThanOrEqual").value(DEFAULT_LESS_THAN_OR_EQUAL.toString()))
            .andExpect(jsonPath("$.specified").value(DEFAULT_SPECIFIED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRangeFilter() throws Exception {
        // Get the rangeFilter
        restRangeFilterMockMvc.perform(get("/api/range-filters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRangeFilter() throws Exception {
        // Initialize the database
        rangeFilterRepository.saveAndFlush(rangeFilter);

        int databaseSizeBeforeUpdate = rangeFilterRepository.findAll().size();

        // Update the rangeFilter
        RangeFilter updatedRangeFilter = rangeFilterRepository.findById(rangeFilter.getId()).get();
        // Disconnect from session so that the updates on updatedRangeFilter are not directly saved in db
        em.detach(updatedRangeFilter);
        updatedRangeFilter
            .title(UPDATED_TITLE)
            .expression(UPDATED_EXPRESSION)
            .hide(UPDATED_HIDE)
            .equals(UPDATED_EQUALS)
            .greaterThan(UPDATED_GREATER_THAN)
            .greaterThanOrEqual(UPDATED_GREATER_THAN_OR_EQUAL)
            .inArr(UPDATED_IN_ARR)
            .lessThan(UPDATED_LESS_THAN)
            .lessThanOrEqual(UPDATED_LESS_THAN_OR_EQUAL)
            .specified(UPDATED_SPECIFIED);

        restRangeFilterMockMvc.perform(put("/api/range-filters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRangeFilter)))
            .andExpect(status().isOk());

        // Validate the RangeFilter in the database
        List<RangeFilter> rangeFilterList = rangeFilterRepository.findAll();
        assertThat(rangeFilterList).hasSize(databaseSizeBeforeUpdate);
        RangeFilter testRangeFilter = rangeFilterList.get(rangeFilterList.size() - 1);
        assertThat(testRangeFilter.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testRangeFilter.getExpression()).isEqualTo(UPDATED_EXPRESSION);
        assertThat(testRangeFilter.isHide()).isEqualTo(UPDATED_HIDE);
        assertThat(testRangeFilter.getEquals()).isEqualTo(UPDATED_EQUALS);
        assertThat(testRangeFilter.getGreaterThan()).isEqualTo(UPDATED_GREATER_THAN);
        assertThat(testRangeFilter.getGreaterThanOrEqual()).isEqualTo(UPDATED_GREATER_THAN_OR_EQUAL);
        assertThat(testRangeFilter.getInArr()).isEqualTo(UPDATED_IN_ARR);
        assertThat(testRangeFilter.getLessThan()).isEqualTo(UPDATED_LESS_THAN);
        assertThat(testRangeFilter.getLessThanOrEqual()).isEqualTo(UPDATED_LESS_THAN_OR_EQUAL);
        assertThat(testRangeFilter.isSpecified()).isEqualTo(UPDATED_SPECIFIED);
    }

    @Test
    @Transactional
    public void updateNonExistingRangeFilter() throws Exception {
        int databaseSizeBeforeUpdate = rangeFilterRepository.findAll().size();

        // Create the RangeFilter

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRangeFilterMockMvc.perform(put("/api/range-filters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rangeFilter)))
            .andExpect(status().isBadRequest());

        // Validate the RangeFilter in the database
        List<RangeFilter> rangeFilterList = rangeFilterRepository.findAll();
        assertThat(rangeFilterList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRangeFilter() throws Exception {
        // Initialize the database
        rangeFilterRepository.saveAndFlush(rangeFilter);

        int databaseSizeBeforeDelete = rangeFilterRepository.findAll().size();

        // Delete the rangeFilter
        restRangeFilterMockMvc.perform(delete("/api/range-filters/{id}", rangeFilter.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RangeFilter> rangeFilterList = rangeFilterRepository.findAll();
        assertThat(rangeFilterList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RangeFilter.class);
        RangeFilter rangeFilter1 = new RangeFilter();
        rangeFilter1.setId(1L);
        RangeFilter rangeFilter2 = new RangeFilter();
        rangeFilter2.setId(rangeFilter1.getId());
        assertThat(rangeFilter1).isEqualTo(rangeFilter2);
        rangeFilter2.setId(2L);
        assertThat(rangeFilter1).isNotEqualTo(rangeFilter2);
        rangeFilter1.setId(null);
        assertThat(rangeFilter1).isNotEqualTo(rangeFilter2);
    }
}
