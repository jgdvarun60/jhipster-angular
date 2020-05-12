package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.ProTrackApp;
import com.btgrp.protrack.domain.EnumFilter;
import com.btgrp.protrack.repository.EnumFilterRepository;
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

import com.btgrp.protrack.domain.enumeration.DummyEnum;
import com.btgrp.protrack.domain.enumeration.DummyEnum;
/**
 * Integration tests for the {@link EnumFilterResource} REST controller.
 */
@SpringBootTest(classes = ProTrackApp.class)
public class EnumFilterResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_EXPRESSION = "AAAAAAAAAA";
    private static final String UPDATED_EXPRESSION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_HIDE = false;
    private static final Boolean UPDATED_HIDE = true;

    private static final DummyEnum DEFAULT_EQUALS = DummyEnum.A;
    private static final DummyEnum UPDATED_EQUALS = DummyEnum.B;

    private static final DummyEnum DEFAULT_IN_ARR = DummyEnum.A;
    private static final DummyEnum UPDATED_IN_ARR = DummyEnum.B;

    private static final Boolean DEFAULT_SPECIFIED = false;
    private static final Boolean UPDATED_SPECIFIED = true;

    @Autowired
    private EnumFilterRepository enumFilterRepository;

    @Mock
    private EnumFilterRepository enumFilterRepositoryMock;

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

    private MockMvc restEnumFilterMockMvc;

    private EnumFilter enumFilter;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EnumFilterResource enumFilterResource = new EnumFilterResource(enumFilterRepository);
        this.restEnumFilterMockMvc = MockMvcBuilders.standaloneSetup(enumFilterResource)
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
    public static EnumFilter createEntity(EntityManager em) {
        EnumFilter enumFilter = new EnumFilter()
            .title(DEFAULT_TITLE)
            .expression(DEFAULT_EXPRESSION)
            .hide(DEFAULT_HIDE)
            .equals(DEFAULT_EQUALS)
            .inArr(DEFAULT_IN_ARR)
            .specified(DEFAULT_SPECIFIED);
        return enumFilter;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EnumFilter createUpdatedEntity(EntityManager em) {
        EnumFilter enumFilter = new EnumFilter()
            .title(UPDATED_TITLE)
            .expression(UPDATED_EXPRESSION)
            .hide(UPDATED_HIDE)
            .equals(UPDATED_EQUALS)
            .inArr(UPDATED_IN_ARR)
            .specified(UPDATED_SPECIFIED);
        return enumFilter;
    }

    @BeforeEach
    public void initTest() {
        enumFilter = createEntity(em);
    }

    @Test
    @Transactional
    public void createEnumFilter() throws Exception {
        int databaseSizeBeforeCreate = enumFilterRepository.findAll().size();

        // Create the EnumFilter
        restEnumFilterMockMvc.perform(post("/api/enum-filters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enumFilter)))
            .andExpect(status().isCreated());

        // Validate the EnumFilter in the database
        List<EnumFilter> enumFilterList = enumFilterRepository.findAll();
        assertThat(enumFilterList).hasSize(databaseSizeBeforeCreate + 1);
        EnumFilter testEnumFilter = enumFilterList.get(enumFilterList.size() - 1);
        assertThat(testEnumFilter.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testEnumFilter.getExpression()).isEqualTo(DEFAULT_EXPRESSION);
        assertThat(testEnumFilter.isHide()).isEqualTo(DEFAULT_HIDE);
        assertThat(testEnumFilter.getEquals()).isEqualTo(DEFAULT_EQUALS);
        assertThat(testEnumFilter.getInArr()).isEqualTo(DEFAULT_IN_ARR);
        assertThat(testEnumFilter.isSpecified()).isEqualTo(DEFAULT_SPECIFIED);
    }

    @Test
    @Transactional
    public void createEnumFilterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = enumFilterRepository.findAll().size();

        // Create the EnumFilter with an existing ID
        enumFilter.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEnumFilterMockMvc.perform(post("/api/enum-filters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enumFilter)))
            .andExpect(status().isBadRequest());

        // Validate the EnumFilter in the database
        List<EnumFilter> enumFilterList = enumFilterRepository.findAll();
        assertThat(enumFilterList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEnumFilters() throws Exception {
        // Initialize the database
        enumFilterRepository.saveAndFlush(enumFilter);

        // Get all the enumFilterList
        restEnumFilterMockMvc.perform(get("/api/enum-filters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(enumFilter.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].expression").value(hasItem(DEFAULT_EXPRESSION.toString())))
            .andExpect(jsonPath("$.[*].hide").value(hasItem(DEFAULT_HIDE.booleanValue())))
            .andExpect(jsonPath("$.[*].equals").value(hasItem(DEFAULT_EQUALS.toString())))
            .andExpect(jsonPath("$.[*].inArr").value(hasItem(DEFAULT_IN_ARR.toString())))
            .andExpect(jsonPath("$.[*].specified").value(hasItem(DEFAULT_SPECIFIED.booleanValue())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllEnumFiltersWithEagerRelationshipsIsEnabled() throws Exception {
        EnumFilterResource enumFilterResource = new EnumFilterResource(enumFilterRepositoryMock);
        when(enumFilterRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restEnumFilterMockMvc = MockMvcBuilders.standaloneSetup(enumFilterResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restEnumFilterMockMvc.perform(get("/api/enum-filters?eagerload=true"))
        .andExpect(status().isOk());

        verify(enumFilterRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllEnumFiltersWithEagerRelationshipsIsNotEnabled() throws Exception {
        EnumFilterResource enumFilterResource = new EnumFilterResource(enumFilterRepositoryMock);
            when(enumFilterRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restEnumFilterMockMvc = MockMvcBuilders.standaloneSetup(enumFilterResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restEnumFilterMockMvc.perform(get("/api/enum-filters?eagerload=true"))
        .andExpect(status().isOk());

            verify(enumFilterRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getEnumFilter() throws Exception {
        // Initialize the database
        enumFilterRepository.saveAndFlush(enumFilter);

        // Get the enumFilter
        restEnumFilterMockMvc.perform(get("/api/enum-filters/{id}", enumFilter.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(enumFilter.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.expression").value(DEFAULT_EXPRESSION.toString()))
            .andExpect(jsonPath("$.hide").value(DEFAULT_HIDE.booleanValue()))
            .andExpect(jsonPath("$.equals").value(DEFAULT_EQUALS.toString()))
            .andExpect(jsonPath("$.inArr").value(DEFAULT_IN_ARR.toString()))
            .andExpect(jsonPath("$.specified").value(DEFAULT_SPECIFIED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEnumFilter() throws Exception {
        // Get the enumFilter
        restEnumFilterMockMvc.perform(get("/api/enum-filters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEnumFilter() throws Exception {
        // Initialize the database
        enumFilterRepository.saveAndFlush(enumFilter);

        int databaseSizeBeforeUpdate = enumFilterRepository.findAll().size();

        // Update the enumFilter
        EnumFilter updatedEnumFilter = enumFilterRepository.findById(enumFilter.getId()).get();
        // Disconnect from session so that the updates on updatedEnumFilter are not directly saved in db
        em.detach(updatedEnumFilter);
        updatedEnumFilter
            .title(UPDATED_TITLE)
            .expression(UPDATED_EXPRESSION)
            .hide(UPDATED_HIDE)
            .equals(UPDATED_EQUALS)
            .inArr(UPDATED_IN_ARR)
            .specified(UPDATED_SPECIFIED);

        restEnumFilterMockMvc.perform(put("/api/enum-filters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEnumFilter)))
            .andExpect(status().isOk());

        // Validate the EnumFilter in the database
        List<EnumFilter> enumFilterList = enumFilterRepository.findAll();
        assertThat(enumFilterList).hasSize(databaseSizeBeforeUpdate);
        EnumFilter testEnumFilter = enumFilterList.get(enumFilterList.size() - 1);
        assertThat(testEnumFilter.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testEnumFilter.getExpression()).isEqualTo(UPDATED_EXPRESSION);
        assertThat(testEnumFilter.isHide()).isEqualTo(UPDATED_HIDE);
        assertThat(testEnumFilter.getEquals()).isEqualTo(UPDATED_EQUALS);
        assertThat(testEnumFilter.getInArr()).isEqualTo(UPDATED_IN_ARR);
        assertThat(testEnumFilter.isSpecified()).isEqualTo(UPDATED_SPECIFIED);
    }

    @Test
    @Transactional
    public void updateNonExistingEnumFilter() throws Exception {
        int databaseSizeBeforeUpdate = enumFilterRepository.findAll().size();

        // Create the EnumFilter

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEnumFilterMockMvc.perform(put("/api/enum-filters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enumFilter)))
            .andExpect(status().isBadRequest());

        // Validate the EnumFilter in the database
        List<EnumFilter> enumFilterList = enumFilterRepository.findAll();
        assertThat(enumFilterList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEnumFilter() throws Exception {
        // Initialize the database
        enumFilterRepository.saveAndFlush(enumFilter);

        int databaseSizeBeforeDelete = enumFilterRepository.findAll().size();

        // Delete the enumFilter
        restEnumFilterMockMvc.perform(delete("/api/enum-filters/{id}", enumFilter.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EnumFilter> enumFilterList = enumFilterRepository.findAll();
        assertThat(enumFilterList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EnumFilter.class);
        EnumFilter enumFilter1 = new EnumFilter();
        enumFilter1.setId(1L);
        EnumFilter enumFilter2 = new EnumFilter();
        enumFilter2.setId(enumFilter1.getId());
        assertThat(enumFilter1).isEqualTo(enumFilter2);
        enumFilter2.setId(2L);
        assertThat(enumFilter1).isNotEqualTo(enumFilter2);
        enumFilter1.setId(null);
        assertThat(enumFilter1).isNotEqualTo(enumFilter2);
    }
}
