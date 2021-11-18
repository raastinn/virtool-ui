import { map } from "lodash-es";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getFontSize, getFontWeight } from "../../app/theme";
import { Icon, InitialIcon, Label, StyledInitialIcon } from "../../base";
import { getAccountAdministrator, getAccountHandle } from "../selectors";
import Email from "./Email";
import ChangePassword from "./Password";

const AccountProfileGroups = styled.div`
    margin-top: 3px;

    ${Label} {
        text-transform: capitalize;

        &:not(:last-of-type) {
            margin-right: 3px;
        }
    }
`;

const AccountProfileHeader = styled.div`
    align-items: center;
    display: flex;
    margin-bottom: 15px;
    > ${StyledInitialIcon} {
        flex: 0 0 auto;
    }
    > div {
        flex: 2 0 auto;
        margin-left: 15px;

        h3 {
            align-items: center;
            display: flex;
            flex: 2 0 auto;
            font-size: ${getFontSize("xl")};
            font-weight: ${getFontWeight("thick")};
            line-height: 1.2;
            margin: 0;

            ${Label} {
                font-size: ${getFontSize("md")};
                margin-left: auto;
            }
        }
    }
`;

export const AccountProfile = ({ handle, groups, administrator }) => {
    const groupLabels = map(groups, groupId => (
        <Label key={groupId}>
            <Icon name="users" /> {groupId}
        </Label>
    ));

    let adminLabel;

    if (administrator) {
        adminLabel = (
            <Label key="administrator" color="purple">
                <Icon name="user-shield" /> Administrator
            </Label>
        );
    }

    return (
        <div>
            <AccountProfileHeader>
                <InitialIcon handle={handle} size="xxl" />
                <div>
                    <h3>
                        {handle}
                        {adminLabel}
                    </h3>
                    <AccountProfileGroups>{groupLabels}</AccountProfileGroups>
                </div>
            </AccountProfileHeader>

            <Email />
            <ChangePassword />
        </div>
    );
};

export const mapStateToProps = state => ({
    handle: getAccountHandle(state),
    groups: state.account.groups,
    administrator: getAccountAdministrator(state)
});

export default connect(mapStateToProps)(AccountProfile);