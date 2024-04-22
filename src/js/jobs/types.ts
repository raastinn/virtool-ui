import { UserNested } from "@users/types";
import { SearchResult } from "@utils/types";

export type JobState =
    | "complete"
    | "cancelled"
    | "error"
    | "preparing"
    | "running"
    | "terminated"
    | "timeout"
    | "waiting";

export type IconColor = "blue" | "green" | "grey" | "red" | "orange" | "purple";

/** A Job with essential information */
export type JobNested = {
    id: string;
};

export enum workflows {
    pathoscope_bowtie = "pathoscope_bowtie",
    nuvs = "nuvs",
    aodp = "aodp",
    build_index = "build_index",
    create_sample = "create_sample",
    create_subtraction = "create_subtraction",
}

/** Minimal Job used for websocket messages and resource listings */
export type JobMinimal = JobNested & {
    archived: boolean;
    /*** The iso formatted date of creation */
    created_at: string;
    progress: number;
    stage?: string;
    state: JobState;
    user: UserNested;
    workflow: workflows;
};

/** Provides information on when a Job was pinged */
export type JobPing = {
    pinged_at: Date;
};

/** Provides Job error information */
export type JobError = {
    details: Array<string>;
    traceback: Array<string>;
    type: string;
};

/** Provides Job Status information */
export type JobStatus = {
    error?: JobError | null;
    progress: number;
    /** Stage description for job */
    stage?: string | null;
    state: JobState;
    step_description?: string | null;
    step_name?: string | null;
    timestamp: string;
};

/** A complete Job */
export type Job = JobMinimal & {
    acquired: boolean;
    /** Provides information on subtraction and the related files */
    args: { [key: string]: any };
    /** Array containing status history of job */
    status: Array<JobStatus>;
    ping?: JobPing;
};

/** Gives information about number of jobs in each state */
export type JobCounts = {
    [state in JobState]?: { [key: string]: number | null };
};

/** Job search results from the API */
export type JobSearchResult = SearchResult & {
    counts: JobCounts;
    /** Gives information about each job */
    documents: Array<JobMinimal>;
};
