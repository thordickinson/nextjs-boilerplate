import { Model } from "mongoose";
import { NextApiRequest } from "next";

export interface Pagination {
    skip: number
    limit: number
}

export interface ParsePaginationOpts {
    /**
     * Specifies paths which should be populated with other documents.
     * @see https://mongoosejs.com/docs/populate.html 
     */
    populate?: string
    parent?: string
    /**
     * An aditional filter to apply to the query
     */
    filter?: any
}

export interface PagedResult<T> {
    page: number
    pageSize: number
    totalElements: number
    content: T[]
}

/**
 * 
 * @param req the request
 * @param model a model to query from
 * @param options pagination options used to process the request
 * @returns 
 */
export default async function pagedResult<T>(req: NextApiRequest, model: Model<any>, options: ParsePaginationOpts = {}): Promise<PagedResult<T>> {
    const { populate, parent, filter = {} } = options

    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, ...);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in|regex)\b/g, match => `$${match}`);
    // Parse String into JSON
    const json = JSON.parse(queryStr)
    const filters = { ...filter, ...json };

    // Add parent to query
    const parentId = req.query[`${parent}Id`];
    if (parentId) {
        filters[parent] = parentId;
    }

    for (let param in filters) {
        // Convert string into array
        if (filters[param]['$in']) {
            filters[param]['$in'] = filters[param]['$in'].split(',');
        }

        // Convert string into regex
        if (filters[param]['$regex']) {
            filters[param]['$regex'] = new RegExp(filters[param]['$regex'], 'i');
        }
    }

    let query = model.find(filters);
    let countQuery = model.find(filters)

    // Select Fields
    if (req.query.select) {
        const fields = (<string>req.query.select).replace(/,/g, ' ');
        query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
        const sortBy = (<string>req.query.sort).replace(/,/g, ' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-creacion');
    }

    // Pagination
    const page = parseInt(<string>req.query.page, 10) || 1;
    const limit = parseInt(<string>req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    //const endIndex = page * limit;
    const total = await countQuery.countDocuments();

    query = query.skip(startIndex).limit(limit);

    if (populate) {
        query = query.populate(populate);
    }

    const results = await query;

    return {
        page: page,
        pageSize: limit,
        totalElements: total,
        content: results
    }

}
