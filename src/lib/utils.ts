export const round2 = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100;

export function convertDocToObj<T extends { _id?: unknown }>(doc: T): T {
  if (typeof doc === 'object' && doc !== null && '_id' in doc && doc._id) {
    doc._id = doc._id.toString();
  }
  return doc;
}