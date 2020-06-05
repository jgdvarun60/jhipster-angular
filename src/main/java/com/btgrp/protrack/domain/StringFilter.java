package com.btgrp.protrack.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A StringFilter.
 */
@Entity
@Table(name = "string_filter")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class StringFilter extends AbstractAuditingEntity implements Serializable {

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

    @Column(name = "contains")
    private String contains;

    @Column(name = "equals")
    private String equals;

    @Column(name = "in_arr")
    private String inArr;

    @Column(name = "specified")
    private Boolean specified;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "string_filter_inlist",
               joinColumns = @JoinColumn(name = "string_filter_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "inlist_id", referencedColumnName = "id"))
    private Set<Dummy> inlists = new HashSet<>();

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

    public StringFilter title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getExpression() {
        return expression;
    }

    public StringFilter expression(String expression) {
        this.expression = expression;
        return this;
    }

    public void setExpression(String expression) {
        this.expression = expression;
    }

    public Boolean isHide() {
        return hide;
    }

    public StringFilter hide(Boolean hide) {
        this.hide = hide;
        return this;
    }

    public void setHide(Boolean hide) {
        this.hide = hide;
    }

    public String getContains() {
        return contains;
    }

    public StringFilter contains(String contains) {
        this.contains = contains;
        return this;
    }

    public void setContains(String contains) {
        this.contains = contains;
    }

    public String getEquals() {
        return equals;
    }

    public StringFilter equals(String equals) {
        this.equals = equals;
        return this;
    }

    public void setEquals(String equals) {
        this.equals = equals;
    }

    public String getInArr() {
        return inArr;
    }

    public StringFilter inArr(String inArr) {
        this.inArr = inArr;
        return this;
    }

    public void setInArr(String inArr) {
        this.inArr = inArr;
    }

    public Boolean isSpecified() {
        return specified;
    }

    public StringFilter specified(Boolean specified) {
        this.specified = specified;
        return this;
    }

    public void setSpecified(Boolean specified) {
        this.specified = specified;
    }

    public Set<Dummy> getInlists() {
        return inlists;
    }

    public StringFilter inlists(Set<Dummy> dummies) {
        this.inlists = dummies;
        return this;
    }

    public StringFilter addInlist(Dummy dummy) {
        this.inlists.add(dummy);
        return this;
    }

    public StringFilter removeInlist(Dummy dummy) {
        this.inlists.remove(dummy);
        return this;
    }

    public void setInlists(Set<Dummy> dummies) {
        this.inlists = dummies;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StringFilter)) {
            return false;
        }
        return id != null && id.equals(((StringFilter) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "StringFilter{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", expression='" + getExpression() + "'" +
            ", hide='" + isHide() + "'" +
            ", contains='" + getContains() + "'" +
            ", equals='" + getEquals() + "'" +
            ", inArr='" + getInArr() + "'" +
            ", specified='" + isSpecified() + "'" +
            "}";
    }
}
