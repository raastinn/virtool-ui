import { Request } from "../app/request";

export const find = ({ term, labels, workflows, page = 1 }) => {
    const request = Request.get("/samples").query({
        page,
    });

    if (term) {
        request.query({ find: term });
    }

    if (workflows) {
        request.query({ workflows });
    }

    if (labels) {
        labels.forEach(label => request.query({ label }));
    }

    request.sortQuery();

    return request;
};

export const filter = ({ term }) => Request.get(`/samples?find=${term}`);

export const get = ({ sampleId }) => Request.get(`/samples/${sampleId}`);

export const create = action => {
    const { name, isolate, host, locale, libraryType, subtractions, files, labels, group } = action;
    return Request.post("/samples").send({
        name,
        isolate,
        host,
        locale,
        subtractions,
        files,
        library_type: libraryType,
        labels,
        group,
    });
};

export const update = ({ sampleId, update }) => Request.patch(`/samples/${sampleId}`).send(update);

export const updateRights = ({ sampleId, update }) => Request.patch(`/samples/${sampleId}/rights`).send(update);

export const remove = ({ sampleId }) => Request.delete(`/samples/${sampleId}`);

/**
 * Fetch a page of samples
 *
 * @param page - The page to fetch
 * @param per_page - The number of samples to fetch per page
 * @param term - The search term to filter samples by
 * @param labels - Filter the samples by labels
 * @param workflows - Filter the samples by workflows
 */
export function listSamples(page: number, per_page: number, term: string, labels: string[], workflows: string[]) {
    const request = Request.get("/samples").query({ page, per_page, find: term, workflows });

    if (labels) {
        labels.forEach(label => request.query({ label }));
    }

    return request.then(res => res.body);
}
