import { Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchAbleFields: string[]) {
    // Search query for searchFields the fields
    if (this?.query?.searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchAbleFields.map((field: string) => ({
          [field]: { $regex: this?.query?.searchTerm, $options: 'i' },
        })),
      });
    }
    return this;
  }

  filter() {
    // Filter query for queryObject the fields
    const queryObject = { ...this.query };

    const excludeFields = ['searchTerm', 'sort', 'page', 'limit', 'fields'];
    excludeFields.forEach(field => delete queryObject[field]);

    this.modelQuery = this.modelQuery.find(queryObject);

    return this;
  }

  sort() {
    const sort = (this?.query?.sort as string) || '-createdAt';

    this.modelQuery = this.modelQuery.sort(sort);

    return this;
  }

  pagination() {
    const limit = (this?.query?.limit as number) || 10;
    const page = (this?.query?.page as number) || 1;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.limit(limit).skip(skip);

    return this;
  }

  selectFields() {
    const fields =
      (this?.query?.fields as string)?.split(',').join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
