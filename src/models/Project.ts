
export interface Task {
    status: string;
    end_date: string;
    name: string;
    parent: string;
    title: string;
    task_weight: number;
    description: string;
    creation: string;
    task_id: string;
    modified: string;
    doctype: string;
    idx: number;
    parenttype: string;
    docstatus: number;
    parentfield: string;
    owner: string
}

export interface Onload {
    activity_summary: any[];
}

export interface User {
    modified_by: string;
    name: string;
    parent: string;
    creation: string;
    welcome_email_sent: number;
    modified: string;
    doctype: string;
    idx: number;
    parenttype: string;
    user: string;
    owner: string;
    docstatus: number;
    parentfield: string;
}

export interface Project {
    tasks?: Task[];
    total_sales_amount?: number;
    total_expense_claim?: number;
    creation?: string;
    doctype?: string;
    total_billed_amount?: number;
    per_gross_margin?: number;
    owner?: string;
    total_consumed_material_cost?: number;
    __onload?: Onload;
    modified_by?: string;
    total_billable_amount?: number;
    total_costing_amount?: number;
    priority?: string;
    idx?: number;
    total_purchase_cost?: number;
    docstatus?: number;
    company?: string;
    status: string;
    project_name: string;
    users?: User[];
    copied_from?: string;
    percent_complete_method?: string;
    estimated_costing?: number;
    is_active?: string;
    gross_margin?: number;
    percent_complete?: number;
    name?: string;
    notes?: string;
    modified?: string;
    actual_time?: number;
}


