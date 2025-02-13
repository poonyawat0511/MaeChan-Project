package com.example.workflow.model;

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
@Table(name = "stock_warehouse")
public class StockWarehouse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "warehouse_id")
    private Long warehouseId;

    @Column(name = "warehouse_name")
    private String warehouseName;

    @Column(name = "warehouse_officer_po_name")
    private String warehouseOfficerPoName;

    @Column(name = "warehouse_officer_po_position")
    private String warehouseOfficerPoPosition;

    @Column(name = "warehouse_officer_director_name")
    private String warehouseOfficerDirectorName;

    @Column(name = "warehouse_officer_director_position")
    private String warehouseOfficerDirectorPosition;

    @Column(name = "warehouse_officer_chairman_name")
    private String warehouseOfficerChairmanName;

    @Column(name = "warehouse_officer_chairman_position")
    private String warehouseOfficerChairmanPosition;

    @Column(name = "warehouse_officer_board_name1")
    private String warehouseOfficerBoardName1;

    @Column(name = "warehouse_officer_board_position1")
    private String warehouseOfficerBoardPosition1;

    @Column(name = "warehouse_officer_board_name2")
    private String warehouseOfficerBoardName2;

    @Column(name = "warehouse_officer_board_position2")
    private String warehouseOfficerBoardPosition2;

    @Column(name = "oldcode")
    private String oldCode;

    @Column(name = "hos_guid")
    private String hosGuid;

    @Column(name = "warehouse_responsible_officer")
    private String warehouseResponsibleOfficer;

    @Column(name = "warehouse_location")
    private String warehouseLocation;

    @Column(name = "warehouse_active")
    private Boolean warehouseActive;

    @Column(name = "warehouse_code")
    private String warehouseCode;

    @Column(name = "warehouse_write_po_name")
    private String warehouseWritePoName;

    @Column(name = "warehouse_write_po_position")
    private String warehouseWritePoPosition;

    @Column(name = "warehouse_issue_name")
    private String warehouseIssueName;

    @Column(name = "warehouse_issue_position")
    private String warehouseIssuePosition;

    @Column(name = "warehouse_prefact")
    private String warehousePrefact;

    @Column(name = "warehouse_default")
    private Boolean warehouseDefault;

    @Column(name = "document_prefix")
    private String documentPrefix;

    @Column(name = "deliver_document_prefix")
    private String deliverDocumentPrefix;
}
