export const round2 = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100;

export const convertDocToObj = <T extends { _id?: unknown }>(doc: T): T => {
  if (typeof doc === "object" && doc !== null && "_id" in doc && doc._id) {
    doc._id = doc._id.toString();
  }
  return doc;
};

export const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatDate = (dateString: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatId = (id: string) => {
  return `..${id.substring(20, 24)}`;
};
