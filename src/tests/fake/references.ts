import { faker } from "@faker-js/faker";
import { merge } from "lodash";
import { assign } from "lodash-es";
import nock from "nock";
import { ReferenceClonedFrom, ReferenceDataType, ReferenceMinimal } from "../../js/references/types";
import { createFakeUserNested } from "./user";

type CreateFakeReferenceNestedProps = {
    id?: string;
    data_type?: ReferenceDataType;
    name?: string;
};

/**
 * Create a fake reference nested
 */
export function createFakeReferenceNested(props?: CreateFakeReferenceNestedProps) {
    const defaultReferenceNested = {
        id: faker.random.alphaNumeric(8),
        data_type: faker.helpers.arrayElement(["barcode", "genome"]),
        name: faker.random.word(),
    };

    return merge(defaultReferenceNested, props);
}

type CreateFakeReferenceMinimal = CreateFakeReferenceNestedProps & {
    cloned_from?: ReferenceClonedFrom | null;
};

/**
 * Create a fake reference minimal
 */
export function createFakeReferenceMinimal(props?: CreateFakeReferenceMinimal): ReferenceMinimal {
    const defaultReferenceMinimal = {
        ...createFakeReferenceNested(),
        cloned_from: { id: faker.random.alphaNumeric(8), name: faker.random.word() },
        created_at: faker.date.past().toISOString(),
        imported_from: null,
        installed: true,
        internal_control: faker.random.word(),
        latest_built: null,
        organism: faker.random.word(),
        otu_count: faker.datatype.number(),
        release: null,
        remotes_from: null,
        task: {
            complete: true,
        },
        unbuilt_change_count: faker.datatype.number(),
        updating: false,
        user: createFakeUserNested(),
    };

    return assign(defaultReferenceMinimal, props);
}

type CreateFakeReference = CreateFakeReferenceMinimal & {
    description?: string;
};

/**
 * Create a fake reference
 */
export function createFakeReference(overrides?: CreateFakeReference) {
    const { description, ...props } = overrides || {};

    const defaultReference = {
        ...createFakeReferenceMinimal(props),
        description: description || "",
        groups: [],
        restrict_source_types: false,
        source_types: ["isolate", "strain"],
        targets: null,
        users: { ...createFakeUserNested(), modify: true, remove: true, modify_otu: true },
    };

    return assign(defaultReference, props);
}

/**
 * Sets up a mocked API route for fetching a list of references
 *
 * @param references - The documents for references
 * @returns The nock scope for the mocked API call
 */
export function mockApiGetReferences(references: ReferenceMinimal[]) {
    return nock("http://localhost").get("/api/refs").query(true).reply(200, {
        documents: references,
        found_count: references.length,
        page: 1,
        page_count: 1,
        per_page: 25,
        ready_count: references.length,
        total_count: references.length,
    });
}

/**
 * Sets up a mocked API route for cloning a reference
 *
 * @param name - The name of the clone
 * @param description - The description of the clone
 * @param reference - The reference being cloned
 * @returns The nock scope for the mocked API call
 */
export function mockApiCloneReference(name: string, description: string, reference: ReferenceMinimal) {
    const clonedReference = createFakeReference({
        cloned_from: {
            id: reference.id,
            name: reference.name,
        },
        name: name,
        description: description,
    });

    return nock("http://localhost")
        .post("/api/refs", {
            name: name,
            description: description,
            clone_from: reference.id,
        })
        .reply(201, clonedReference);
}
