export interface Task {
    exp_end_date?: string;
    total_expense_claim?: number;
    expected_time?: number;
    creation?: string;
    doctype?: string;
    lft?: number;
    owner?: string;
    subject: string;
    modified_by?: string;
    task_weight?: number;
    depends_on_tasks?: string;
    total_costing_amount?: number;
    priority?: string;
    depends_on?: any[];
    docstatus?: number;
    status?: string;
    total_billing_amount?: number;
    description?: string;
    company?: string;
    is_group?: number;
    progress?: number;
    rgt?: number;
    old_parent?: string;
    name?: string;
    idx?: number;
    modified?: string;
    project?: string;
    is_milestone?: number;
    actual_time?: number;
}

export interface TaskObject {
    data?: Task[];
}

