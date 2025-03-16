package com.example.workflow.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
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
@Table(name = "stock_purchase_type")
public class StockPurchaseType {
    @Id
    @Column(name = "purchase_type")
    private Long purchaseType;

    @Column(name = "purchase_type_name")
    private String purchaseTypeName;

    @Column(name = "hos_guid")
    private String hosGuid;

    @Column(name = "check_max_total")
    private boolean checkMaxTotal;

    @Column(name = "max_total")
    private BigDecimal maxTotal;

    // Add constructor to handle deserialization from number value
    public StockPurchaseType(long purchaseType) {
        this.purchaseType = purchaseType;
    }
 
        public StockPurchaseType(long purchaseType, String purchaseTypeName) {
            this.purchaseType = purchaseType;
            this.purchaseTypeName = purchaseTypeName;
        }

}
