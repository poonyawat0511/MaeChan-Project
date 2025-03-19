package com.example.workflow.model;

import java.util.Collection;
import java.util.List;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "user_hospital")
public class UserHospital implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary key (auto-generated)

    private String UserHospitalName; // Username

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private String lineId;

    //TODO: add boolean Active

    @Column(name = "signature_path", nullable = true)
    private String signaturePath;

    // Add relation to stock user
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "stock_user_id", referencedColumnName = "id")
    @NotFound(action = NotFoundAction.IGNORE)
    private StockUser stockUserId;

    private Role role;

    // Ensure role is never null by assigning a default role if null
    @PrePersist
    private void ensureRoleIsSet() {
        if (role == null) {
            role = Role.USER; // Default to USER if no role is assigned
        }
    }

    // Add constructor to handle deserialization from number value
    public UserHospital(long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long userHospitalId) {
        this.id = userHospitalId;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (role == null) {
            return List.of(new SimpleGrantedAuthority(Role.USER.name())); // Default to USER if role is null
        }
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
