package com.btgrp.protrack.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.Duration;

/**
 * A AllFields.
 */
@Entity
@Table(name = "all_fields")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AllFields implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @DecimalMin(value = "2")
    @DecimalMax(value = "5")
    @Column(name = "double_field")
    private Double doubleField;

    @DecimalMin(value = "2")
    @DecimalMax(value = "5")
    @Column(name = "float_field")
    private Float floatField;

    @Min(value = 2L)
    @Max(value = 5L)
    @Column(name = "long_field")
    private Long longField;

    @Column(name = "instant_field")
    private Instant instantField;

    @Column(name = "duration_field")
    private Duration durationField;

    @Size(min = 3, max = 25)
    @Pattern(regexp = "^[A-Z][a-z]+\\d$")
    @Column(name = "string_field", length = 25)
    private String stringField;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getDoubleField() {
        return doubleField;
    }

    public AllFields doubleField(Double doubleField) {
        this.doubleField = doubleField;
        return this;
    }

    public void setDoubleField(Double doubleField) {
        this.doubleField = doubleField;
    }

    public Float getFloatField() {
        return floatField;
    }

    public AllFields floatField(Float floatField) {
        this.floatField = floatField;
        return this;
    }

    public void setFloatField(Float floatField) {
        this.floatField = floatField;
    }

    public Long getLongField() {
        return longField;
    }

    public AllFields longField(Long longField) {
        this.longField = longField;
        return this;
    }

    public void setLongField(Long longField) {
        this.longField = longField;
    }

    public Instant getInstantField() {
        return instantField;
    }

    public AllFields instantField(Instant instantField) {
        this.instantField = instantField;
        return this;
    }

    public void setInstantField(Instant instantField) {
        this.instantField = instantField;
    }

    public Duration getDurationField() {
        return durationField;
    }

    public AllFields durationField(Duration durationField) {
        this.durationField = durationField;
        return this;
    }

    public void setDurationField(Duration durationField) {
        this.durationField = durationField;
    }

    public String getStringField() {
        return stringField;
    }

    public AllFields stringField(String stringField) {
        this.stringField = stringField;
        return this;
    }

    public void setStringField(String stringField) {
        this.stringField = stringField;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AllFields)) {
            return false;
        }
        return id != null && id.equals(((AllFields) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AllFields{" +
            "id=" + getId() +
            ", doubleField=" + getDoubleField() +
            ", floatField=" + getFloatField() +
            ", longField=" + getLongField() +
            ", instantField='" + getInstantField() + "'" +
            ", durationField='" + getDurationField() + "'" +
            ", stringField='" + getStringField() + "'" +
            "}";
    }
}
