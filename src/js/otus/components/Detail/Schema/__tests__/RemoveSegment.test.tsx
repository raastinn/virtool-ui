import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createBrowserHistory } from "history";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { createFakeOTU, mockApiEditOTU } from "../../../../../../tests/fake/otus";
import { renderWithRouter } from "../../../../../../tests/setupTests";
import RemoveSegment from "../RemoveSegment";

describe("<RemoveSegment />", () => {
    let props;
    let otu;
    let history;

    beforeEach(() => {
        otu = createFakeOTU();
        props = {
            abbreviation: otu.abbreviation,
            name: otu.name,
            otuId: otu.id,
            schema: otu.schema,
        };
        history = createBrowserHistory();
    });

    it("should render when [show=true]", () => {
        renderWithRouter(
            <MemoryRouter initialEntries={[{ state: { removeSegment: props.schema[0].name } }]}>
                <RemoveSegment {...props} />)
            </MemoryRouter>,
            {},
            history,
        );

        expect(screen.getByText("Remove Segment")).toBeInTheDocument();
        expect(screen.getByText(/Are you sure you want to remove/)).toBeInTheDocument();
        expect(screen.getByText(`${props.schema[0].name}`)).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should render when [show=false]", () => {
        renderWithRouter(
            <MemoryRouter initialEntries={[{ state: { removeSegment: "" } }]}>
                <RemoveSegment {...props} />)
            </MemoryRouter>,
            {},
            history,
        );

        expect(screen.queryByText("Remove Segment")).toBeNull();
        expect(screen.queryByText(/Are you sure you want to remove/)).toBeNull();
        expect(screen.queryByText(`${props.schema[0].name}`)).toBeNull();
        expect(screen.queryByRole("button")).toBeNull();
    });

    it("should call onSubmit() when onConfirm() called on <RemoveDialog />", async () => {
        const scope = mockApiEditOTU(otu, {
            abbreviation: otu.abbreviation,
            name: otu.name,
            otuId: otu.d,
            schema: [props.schema[1]],
        });
        renderWithRouter(
            <MemoryRouter initialEntries={[{ state: { removeSegment: props.schema[0].name } }]}>
                <RemoveSegment {...props} />)
            </MemoryRouter>,
            {},
            history,
        );

        await userEvent.click(screen.getByRole("button"));

        scope.done();
    });

    it("should call onHide() when onHide() called on <RemoveDialog />", () => {
        renderWithRouter(
            <MemoryRouter initialEntries={[{ state: { removeSegment: props.schema[0].name } }]}>
                <RemoveSegment {...props} />)
            </MemoryRouter>,
            {},
            history,
        );

        fireEvent.keyDown(document, { key: "Escape" });

        expect(screen.queryByText("Remove Segment")).toBeNull();
    });
});
