import { UserNested } from "../users/types";
import { SearchResult } from "../utils/types";

export enum FileType {
    hmm = "hmm",
    reference = "reference",
    reads = "reads",
    subtraction = "subtraction",
}

export type FileResponse = SearchResult & {
    items: Array<File>;
};

export type UnpaginatedFileResponse = {
    documents: Array<File>;
};

export type File = {
    id: string;
    created_at: string;
    name: string;
    name_on_disk: string;
    ready: boolean;
    removed: boolean;
    removed_at?: string;
    reserved: boolean;
    size: number;
    type: string;
    uploaded_at: string;
    user: UserNested;
};
