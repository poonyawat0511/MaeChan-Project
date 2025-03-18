package com.example.workflow.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
@Table(name = "stock_department")
public class StockDepartment {
    @Id
    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "department_name")
    private String departmentName;

    @Column(name = "oldcode")
    private String oldCode;

    @Column(name = "status_active")
    private Character statusActive;

    @Column(name = "hos_guid")
    private String hosGuid;

    @Column(name = "stock_department_type_id")
    private Long stockDepartmentTypeId;

    @Column(name = "department_board_name1")
    private String departmentBoardName1;

    @Column(name = "department_board_name2")
    private String departmentBoardName2;

    @Column(name = "department_board_position1")
    private String departmentBoardPosition1;

    @Column(name = "department_board_position2")
    private String departmentBoardPosition2;

    @Column(name = "department_type")
    private Long departmentType;

    @Column(name = "department_code")
    private String departmentCode;

    @Column(name = "store_expired_item")
    private Character storeExpiredItem;

    @Column(name = "stock_authorize_type_id")
    private Long stockAuthorizeTypeId;

    @Column(name = "stock_cost_center_id")
    private Long stockCostCenterId;

    @Column(name = "no_confirm_pay")
    private Character noConfirmPay;

    @Column(name = "exclusive_order")
    private Character exclusiveOrder;

    @Column(name = "sap_id")
    private Long sapId;

    @Column(name = "allow_adjust")
    private Character allowAdjust;

    @Column(name = "allow_sap_mig")
    private Character allowSapMig;

    @Column(name = "allow_donation")
    private Character allowDonation;

    @Column(name = "allow_manual_draw")
    private Character allowManualDraw;

    @Column(name = "allow_dep_transfer")
    private Character allowDepTransfer;

    @Column(name = "allow_wh_transfer")
    private Character allowWhTransfer;

    @Column(name = "allow_dep_rtl")
    private Character allowDepRtl;

    @Column(name = "allow_dep_pos")
    private Character allowDepPos;

    @Column(name = "allow_manual_rcv")
    private Character allowManualRcv;

    @Column(name = "owe_stock")
    private Character oweStock;

    @Column(name = "acc_department_id")
    private Long accDepartmentId;

    @Column(name = "auto_daily_calc_mrp")
    private Character autoDailyCalcMrp;

    @Column(name = "last_daily_calc_mrp")
    private LocalDate lastDailyCalcMrp;

    public StockDepartment(Long departmentId) {
        this.departmentId = departmentId;
    }
}
