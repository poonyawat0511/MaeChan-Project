package com.example.workflow.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stock_user") 
public class StockUser {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //TODO: refactor later (dont forget to update UserHospital/SpringRequest)

    private String firstName; 

    private String lastName;

    // Add constructor to handle deserialization from number value
    public StockUser(long id) {
        this.id = id;
    }

}
