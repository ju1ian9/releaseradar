export function groupByDate(items) {
  return items.reduce((acc, item) => {
    (acc[item.date] ||= []).push(item);
    return acc;
  }, {});
}

export function fmtDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { month: "long", day: "numeric" });
}