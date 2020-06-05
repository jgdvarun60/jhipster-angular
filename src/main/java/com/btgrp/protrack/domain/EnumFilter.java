package com.btgrp.protrack.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.btgrp.protrack.domain.enumeration.DummyEnum;

/**
 * A EnumFilter.
 */
@Entity
@Table(name = "enum_filter")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EnumFilter extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "expression")
    private String expression;

    @Column(name = "hide")
    private Boolean hide;

    @Enumerated(EnumType.STRING)
    @Column(name = "equals")
    private DummyEnum equals;

    @Enumerated(EnumType.STRING)
    @Column(name = "in_arr")
    private DummyEnum inArr;

    @Column(name = "specified")
    private Boolean specified;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "enum_filter_inlist",
               joinColumns = @JoinColumn(name = "enum_filter_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "inlist_id", referencedColumnName = "id"))
    private Set<DummyEnums> inlists = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public EnumFilter title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getExpression() {
        return expression;
    }

    public EnumFilter expression(String expression) {
        this.expression = expression;
        return this;
    }

    public void setExpression(String expression) {
        this.expression = expression;
    }

    public Boolean isHide() {
        return hide;
    }

    public EnumFilter hide(Boolean hide) {
        this.hide = hide;
        return this;
    }

    public void setHide(Boolean hide) {
        this.hide = hide;
    }

    public DummyEnum getEquals() {
        return equals;
    }

    public EnumFilter equals(DummyEnum equals) {
        this.equals = equals;
        return this;
    }

    public void setEquals(DummyEnum equals) {
        this.equals = equals;
    }

    public DummyEnum getInArr() {
        return inArr;
    }

    public EnumFilter inArr(DummyEnum inArr) {
        this.inArr = inArr;
        return this;
    }

    public void setInArr(DummyEnum inArr) {
        this.inArr = inArr;
    }

    public Boolean isSpecified() {
        return specified;
    }

    public EnumFilter specified(Boolean specified) {
        this.specified = specified;
        return this;
    }

    public void setSpecified(Boolean specified) {
        this.specified = specified;
    }

    public Set<DummyEnums> getInlists() {
        return inlists;
    }

    public EnumFilter inlists(Set<DummyEnums> dummyEnums) {
        this.inlists = dummyEnums;
        return this;
    }

    public EnumFilter addInlist(DummyEnums dummyEnums) {
        this.inlists.add(dummyEnums);
        return this;
    }

    public EnumFilter removeInlist(DummyEnums dummyEnums) {
        this.inlists.remove(dummyEnums);
        return this;
    }

    public void setInlists(Set<DummyEnums> dummyEnums) {
        this.inlists = dummyEnums;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EnumFilter)) {
            return false;
        }
        return id != null && id.equals(((EnumFilter) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EnumFilter{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", expression='" + getExpression() + "'" +
            ", hide='" + isHide() + "'" +
            ", equals='" + getEquals() + "'" +
            ", inArr='" + getInArr() + "'" +
            ", specified='" + isSpecified() + "'" +
            "}";
    }
}
