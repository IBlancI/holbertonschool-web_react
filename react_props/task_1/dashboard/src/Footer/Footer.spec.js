import { render, screen } from "@testing-library/react";
import { getCurrentYear, getFooterCopy } from "../utils/utils";
import Footer from "./Footer";

test('renders correct footer content when isIndex is true', () => {
  render(<Footer />);

  const year = getCurrentYear();
  const copy = getFooterCopy(true);
  const expectedText = `Copyright ${year} - ${copy}`;

  const footerText = screen.getByText(new RegExp(expectedText, 'i'));
  expect(footerText).toBeInTheDocument();
});
