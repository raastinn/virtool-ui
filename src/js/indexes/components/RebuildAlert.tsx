import { Alert, Icon } from "@base";
import { ReferenceRight, useCheckReferenceRight } from "@references/hooks";
import React from "react";
import { Link } from "react-router-dom";
import { useInfiniteFindIndexes } from "../queries";

type RebuildAlertProps = {
    refId: string;
};

/**
 * An alert that appears when the reference has unbuilt changes.
 */
export default function RebuildAlert({ refId }: RebuildAlertProps) {
    const { data, isLoading } = useInfiniteFindIndexes(refId);
    const { hasPermission: hasRights } = useCheckReferenceRight(refId, ReferenceRight.build);

    if (isLoading) {
        return null;
    }

    const indexes = data.pages[0];

    if (indexes.total_otu_count === 0 && hasRights) {
        return (
            <Alert color="orange" level>
                <Icon name="exclamation-circle" />
                <strong>At least one OTU must be added to the database before an index can be built.</strong>
            </Alert>
        );
    }

    if (indexes.change_count && hasRights) {
        const to = {
            pathname: `/refs/${refId}/indexes`,
            state: { rebuild: true },
        };

        return (
            <Alert color="orange" level>
                <Icon name="info-circle" />
                <span>
                    <span>There are unbuilt changes. </span>
                    <Link to={to}>Rebuild the index</Link>
                    <span> to use the changes in future analyses.</span>
                </span>
            </Alert>
        );
    }

    return null;
}
