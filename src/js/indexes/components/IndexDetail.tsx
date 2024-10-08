import {
    ContainerNarrow,
    LoadingPlaceholder,
    NotFound,
    RelativeTime,
    SubviewHeader,
    SubviewHeaderAttribution,
    SubviewHeaderTitle,
} from "@base";
import Contributors from "@indexes/components/Contributors";
import Files from "@indexes/components/IndexFiles";
import IndexOTUs from "@indexes/components/IndexOTUs";
import { useFetchIndex } from "@indexes/queries";
import { DownloadLink } from "@references/components/Detail/DownloadLink";
import { useGetReference } from "@references/queries";
import React from "react";
import { match } from "react-router-dom";
import styled from "styled-components";

const IndexDetailSubtitle = styled.div`
    align-items: center;
    display: flex;

    a {
        margin-left: auto;
    }
`;

type IndexDetailProps = {
    /** Match object containing path information */
    match: match<{ indexId: string; refId: string }>;
};

/**
 * The index detailed view
 */
export default function IndexDetail({ match }: IndexDetailProps) {
    const { indexId, refId } = match.params;
    const { data: index, isPending: isPendingIndex, isError } = useFetchIndex(indexId);
    const { data: reference, isPending: isPendingReference } = useGetReference(refId);

    if (isError) {
        return <NotFound />;
    }
    if (isPendingIndex || isPendingReference) {
        return <LoadingPlaceholder />;
    }

    const { contributors, created_at, files, id, otus, user, version } = index;

    return (
        <>
            <SubviewHeader>
                <SubviewHeaderTitle>Index {version}</SubviewHeaderTitle>
                <IndexDetailSubtitle>
                    <SubviewHeaderAttribution>
                        {user.handle} built <RelativeTime time={created_at} />
                    </SubviewHeaderAttribution>
                    {reference.latest_build?.has_json && (
                        <DownloadLink href={`/api/indexes/${id}/files/reference.json.gz`}>Download</DownloadLink>
                    )}
                </IndexDetailSubtitle>
            </SubviewHeader>

            <ContainerNarrow>
                <Contributors contributors={contributors} />
                <Files files={files} />
                <IndexOTUs otus={otus} refId={refId} />
            </ContainerNarrow>
        </>
    );
}
