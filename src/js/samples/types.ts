/**
 * Sample Types
 *
 * @remark
 * Types in this file represent the data returned from the API, or are useful for working
 * with sample data.
 */

import { JobMinimal } from "../jobs/types";
import { LabelNested } from "../labels/types";
import { UserNested } from "../users/types";
import { SearchResult } from "../utils/types";

/** All workflow states */
export enum WorkflowState {
    COMPLETE = "complete",
    PENDING = "pending",
    NONE = "none",
    INCOMPATIBLE = "incompatible",
}

/** All Library types */
export enum LibraryType {
    amplicon = "amplicon",
    srna = "srna",
    other = "other",
    normal = "normal",
}

/** All workflow states for a sample */
export type SampleWorkflows = {
    /** The state of AODP workflows */
    aodp: WorkflowState;
    /** The state of NuVs workflows */
    nuvs: WorkflowState;
    /** The state of Pathoscope workflows */
    pathoscope: WorkflowState;
};

/** A Sample ID */
export type SampleID = {
    id: string;
};

/** A Sample with essential information */
export type SampleNested = SampleID & {
    name: string;
};

/** Minimal Sample used for websocket messages and resource listings */
export type SampleMinimal = SampleNested & {
    /** The iso formatted date of creation */
    created_at: string;
    host: string;
    isolate: string;
    /** Information about the job associated with the sample */
    job?: JobMinimal;
    /** Labels associated with the sample */
    labels: Array<LabelNested>;
    library_type: LibraryType;
    notes: string;
    nuvs: boolean | string;
    pathoscope: boolean | string;
    ready: boolean;
    /** The user who created the sample */
    user: UserNested;
    workflows: SampleWorkflows;
};

/** The quality charts associated with the sample */
export type Quality = {
    /** Data for bases chart  */
    bases: Array<Array<number>>;
    /** Data for composition chart */
    composition: Array<Array<number>>;
    /** The read count of the sample */
    count: number;
    encoding: string;
    /** The GC content of the sample (percentage) */
    gc: number;
    /** The length range */
    length: Array<number>;
    /** Data for sequences chart */
    sequences: Array<number>;
};

/** The read file used to create the sample */
export type Read = {
    download_url: string;
    id: number;
    name: string;
    name_on_disk: string;
    sample: string;
    size: number;
    upload?: File;
    /** The iso formatted date of upload */
    uploaded_at: string;
};

/** Sample search results from the API */
export type SampleSearchResult = SearchResult & {
    documents: Array<SampleMinimal>;
};
