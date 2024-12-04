import type { PipelineDefinition } from "@/lib/sync/types";

/** The "Deals → Projects" pipeline shown in the builder: Salesforce closed-won deals become projects. */
export const dealsToProjects: PipelineDefinition = {
  id: "pl_deals_to_projects",
  name: "Deals → Projects",
  source: { connector: "salesforce", object: "Opportunity" },
  trigger: [{ field: "Opportunity.StageName", op: "eq", value: "Closed Won" }],
  filters: [{ field: "Account.Type", op: "eq", value: "New Business" }],
  mapping: [
    { source: "Opportunity.Name", target: "project.title" },
    { source: "Account.Name", target: "project.client" },
    { source: "Opportunity.Amount", target: "project.budget_cents", transform: "multiply100" },
    { source: "Opportunity.CloseDate", target: "project.start_date" },
    { source: "Owner.Email", target: "project.lead_email" },
    { source: "Opportunity.Id", target: "project.external_id", key: true },
  ],
  destination: { object: "project", mode: "upsert" },
  cursorField: "SystemModstamp",
  schedule: { everyMinutes: 15 },
  conflict: "source_of_truth",
};

export const pipelines: PipelineDefinition[] = [dealsToProjects];
