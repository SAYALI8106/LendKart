export const calculateRentalDays = (start, end) => {
  if (!start || !end) return 0;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = endDate - startDate;
  if (diffTime <= 0) return 0;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isDateBlocked = (date, bookedRanges = []) => {
  const checkTime = new Date(date).setHours(0, 0, 0, 0);
  return bookedRanges.some((range) => {
    const start = new Date(range.startDate).setHours(0, 0, 0, 0);
    const end = new Date(range.endDate).setHours(23, 59, 59, 999);
    return checkTime >= start && checkTime <= end;
  });
};

export const formatISODate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
};
