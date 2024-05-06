import { useFetchAccount } from "@account/queries";
import { AdministratorRoles } from "@administration/types";
import { AdministratorPermissions, hasSufficientAdminRole } from "@administration/utils";
import { BoxGroup, Checkbox, SelectBoxGroupSection } from "@base";
import { Permissions } from "@groups/types";
import { map, sortBy } from "lodash-es";
import React from "react";

type APIPermissionsProps = {
    className?: string;
    keyPermissions: Permissions;
    /** Callback function to handle permission selection */
    onChange: (permissions: Permissions) => void;
};

/**
 * Manages permissions for creating/updating an API
 */
export default function APIPermissions({ className, keyPermissions, onChange }: APIPermissionsProps) {
    const { data, isLoading } = useFetchAccount();

    if (isLoading) {
        return null;
    }

    const permissions = map(keyPermissions, (value, key) => ({
        name: key,
        allowed: value,
    }));

    const rowComponents = map(sortBy(permissions, "name"), permission => {
        const disabled =
            !hasSufficientAdminRole(
                AdministratorPermissions[permission.name] as AdministratorRoles,
                data.administrator_role,
            ) && !data.permissions[permission.name];

        return (
            <SelectBoxGroupSection
                key={permission.name}
                active={permission.allowed}
                onClick={
                    disabled ? null : () => onChange({ ...keyPermissions, [permission.name]: !permission.allowed })
                }
                disabled={disabled}
            >
                <Checkbox checked={permission.allowed} />
                <code>{permission.name}</code>
            </SelectBoxGroupSection>
        );
    });

    return <BoxGroup className={className}>{rowComponents}</BoxGroup>;
}
