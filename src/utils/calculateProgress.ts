export function calculateProgress(
  plannedPerDay: number,
  completed: number,
  days: string[]
): number {
  const totalPlanned = plannedPerDay * days.length;
  if (totalPlanned === 0) return 0;
  return Math.min(100, Math.round((completed / totalPlanned) * 100));
}