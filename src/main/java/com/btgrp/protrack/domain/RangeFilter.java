package com.btgrp.protrack.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A RangeFilter.
 */
@Entity
@Table(name = "range_filter")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RangeFilter extends AbstractAuditingEntity implements Serializable {

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

    @Column(name = "equals")
    private String equals;

    @Column(name = "greater_than")
    private String greaterThan;

    @Column(name = "greater_than_or_equal")
    private String greaterThanOrEqual;

    @Column(name = "in_arr")
    private String inArr;

    @Column(name = "less_than")
    private String lessThan;

    @Column(name = "less_than_or_equal")
    private String lessThanOrEqual;

    @Column(name = "specified")
    private Boolean specified;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "range_filter_in_list",
               joinColumns = @JoinColumn(name = "range_filter_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "in_list_id", referencedColumnName = "id"))
    private Set<Dummy> inLists = new HashSet<>();

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

    public RangeFilter title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getExpression() {
        return expression;
    }

    public RangeFilter expression(String expression) {
        this.expression = expression;
        return this;
    }

    public void setExpression(String expression) {
        this.expression = expression;
    }

    public Boolean isHide() {
        return hide;
    }

    public RangeFilter hide(Boolean hide) {
        this.hide = hide;
        return this;
    }

    public void setHide(Boolean hide) {
        this.hide = hide;
    }

    public String getEquals() {
        return equals;
    }

    public RangeFilter equals(String equals) {
        this.equals = equals;
        return this;
    }

    public void setEquals(String equals) {
        this.equals = equals;
    }

    public String getGreaterThan() {
        return greaterThan;
    }

    public RangeFilter greaterThan(String greaterThan) {
        this.greaterThan = greaterThan;
        return this;
    }

    public void setGreaterThan(String greaterThan) {
        this.greaterThan = greaterThan;
    }

    public String getGreaterThanOrEqual() {
        return greaterThanOrEqual;
    }

    public RangeFilter greaterThanOrEqual(String greaterThanOrEqual) {
        this.greaterThanOrEqual = greaterThanOrEqual;
        return this;
    }

    public void setGreaterThanOrEqual(String greaterThanOrEqual) {
        this.greaterThanOrEqual = greaterThanOrEqual;
    }

    public String getInArr() {
        return inArr;
    }

    public RangeFilter inArr(String inArr) {
        this.inArr = inArr;
        return this;
    }

    public void setInArr(String inArr) {
        this.inArr = inArr;
    }

    public String getLessThan() {
        return lessThan;
    }

    public RangeFilter lessThan(String lessThan) {
        this.lessThan = lessThan;
        return this;
    }

    public void setLessThan(String lessThan) {
        this.lessThan = lessThan;
    }

    public String getLessThanOrEqual() {
        return lessThanOrEqual;
    }

    public RangeFilter lessThanOrEqual(String lessThanOrEqual) {
        this.lessThanOrEqual = lessThanOrEqual;
        return this;
    }

    public void setLessThanOrEqual(String lessThanOrEqual) {
        this.lessThanOrEqual = lessThanOrEqual;
    }

    public Boolean isSpecified() {
        return specified;
    }

    public RangeFilter specified(Boolean specified) {
        this.specified = specified;
        return this;
    }

    public void setSpecified(Boolean specified) {
        this.specified = specified;
    }

    public Set<Dummy> getInLists() {
        return inLists;
    }

    public RangeFilter inLists(Set<Dummy> dummies) {
        this.inLists = dummies;
        return this;
    }

    public RangeFilter addInList(Dummy dummy) {
        this.inLists.add(dummy);
        return this;
    }

    public RangeFilter removeInList(Dummy dummy) {
        this.inLists.remove(dummy);
        return this;
    }

    public void setInLists(Set<Dummy> dummies) {
        this.inLists = dummies;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RangeFilter)) {
            return false;
        }
        return id != null && id.equals(((RangeFilter) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "RangeFilter{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", expression='" + getExpression() + "'" +
            ", hide='" + isHide() + "'" +
            ", equals='" + getEquals() + "'" +
            ", greaterThan='" + getGreaterThan() + "'" +
            ", greaterThanOrEqual='" + getGreaterThanOrEqual() + "'" +
            ", inArr='" + getInArr() + "'" +
            ", lessThan='" + getLessThan() + "'" +
            ", lessThanOrEqual='" + getLessThanOrEqual() + "'" +
            ", specified='" + isSpecified() + "'" +
            "}";
    }
}
