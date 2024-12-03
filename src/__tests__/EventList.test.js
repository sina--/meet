// src/__tests__/EventList.test.js

import { render } from "@testing-library/react";
import EventList from "../components/EventList.js";

describe("<EventList /> component", () => {
  test('has an element with "list" role', () => {
    const EventListComponent = render(<EventList />);
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });
  test("renders correct number of events", () => {
    const EventListComponent = render(<EventList events={[{}, {}, {}, {}]} />);
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(4);
  });
});
