import { useFetchAccount } from "@account/queries";
import { ContainerNarrow, ContainerWide, LoadingPlaceholder, ViewHeader, ViewHeaderTitle } from "@base";
import { ManageUsers } from "@users/components/ManageUsers";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Groups from "../../groups/components/Groups";
import UserDetail from "../../users/components/UserDetail";
import { AdministratorRoles } from "../types";
import { hasSufficientAdminRole } from "../utils";
import { ManageAdministrators } from "./administrators/Administrators";
import { AdministratorTabs } from "./AdministratorTabs";
import { ServerSettings } from "./ServerSettings";

export default function Settings() {
    const { data: account, isPending } = useFetchAccount();

    const redirect = hasSufficientAdminRole(AdministratorRoles.SETTINGS, account?.administrator_role)
        ? "settings"
        : "users";

    return (
        <ContainerWide>
            <ViewHeader title="Administration">
                <ViewHeaderTitle>Administration</ViewHeaderTitle>
            </ViewHeader>

            {isPending ? (
                <LoadingPlaceholder />
            ) : (
                <>
                    <AdministratorTabs administratorRole={account.administrator_role} />
                    <ContainerNarrow>
                        <Switch>
                            <Redirect from="/administration" to={`/administration/${redirect}`} exact />
                            <Route path="/administration/settings" component={ServerSettings} />
                            <Route path="/administration/users" component={ManageUsers} exact />
                            <Route path="/administration/users/:userId" component={UserDetail} />
                            <Route path="/administration/groups" component={Groups} />
                            <Route path="/administration/administrators" component={ManageAdministrators} />
                        </Switch>
                    </ContainerNarrow>
                </>
            )}
        </ContainerWide>
    );
}
