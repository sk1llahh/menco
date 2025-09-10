export type ProgressItem = {
  id: string;
  taskId: string;
  taskTitle: string;
  status: "PENDING" | "COMPLETED" | "SKIPPED";
  completedAt: Date | null;
  notes: string | null;
};

export const toProgressItem = (row: any): ProgressItem => ({
  id: row.id,
  taskId: row.taskId,
  taskTitle: row.task.title,
  status: row.status,
  completedAt: row.completedAt,
  notes: row.notes ?? null,
});
