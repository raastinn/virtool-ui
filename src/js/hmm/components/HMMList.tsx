import React from "react";
import { Badge, LoadingPlaceholder, NoneFoundBox, Pagination, ViewHeader, ViewHeaderTitle } from "../../base";
import { useUrlSearchParams } from "../../utils/hooks";
import { useListHmms } from "../querys";
import { HMMMinimal } from "../types";
import HMMInstaller from "./HMMInstaller";
import HMMItem from "./HMMItem";
import HMMToolbar from "./HMMToolbar";

/**
 * A list of HMMs
 */
export default function HMMList() {
    const [urlPage] = useUrlSearchParams("page");
    const [term, setTerm] = useUrlSearchParams("find");
    const { data, isLoading } = useListHmms(Number(urlPage) || 1, 25, term);

    if (isLoading) {
        return <LoadingPlaceholder />;
    }

    const { documents, page, page_count, found_count, total_count } = data;

    function renderRow(document: HMMMinimal) {
        return <HMMItem key={document.id} hmm={document} />;
    }

    return (
        <div>
            <ViewHeader title="HMMs">
                <ViewHeaderTitle>HMMs {total_count > 0 && <Badge>{found_count}</Badge>}</ViewHeaderTitle>
            </ViewHeader>

            {total_count ? (
                <>
                    <HMMToolbar term={term} onChange={e => setTerm(e.target.value)} />

                    {documents.length ? (
                        <Pagination
                            items={documents}
                            storedPage={page}
                            currentPage={Number(urlPage) || 1}
                            renderRow={renderRow}
                            pageCount={page_count}
                        />
                    ) : (
                        <NoneFoundBox noun="HMMs" />
                    )}
                </>
            ) : (
                <HMMInstaller />
            )}
        </div>
    );
}
