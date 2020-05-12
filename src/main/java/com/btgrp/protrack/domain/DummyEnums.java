package com.btgrp.protrack.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import com.btgrp.protrack.domain.enumeration.DummyEnum;

/**
 * A DummyEnums.
 */
@Entity
@Table(name = "dummy_enums")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DummyEnums implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "dummy")
    private DummyEnum dummy;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DummyEnum getDummy() {
        return dummy;
    }

    public DummyEnums dummy(DummyEnum dummy) {
        this.dummy = dummy;
        return this;
    }

    public void setDummy(DummyEnum dummy) {
        this.dummy = dummy;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DummyEnums)) {
            return false;
        }
        return id != null && id.equals(((DummyEnums) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DummyEnums{" +
            "id=" + getId() +
            ", dummy='" + getDummy() + "'" +
            "}";
    }
}
