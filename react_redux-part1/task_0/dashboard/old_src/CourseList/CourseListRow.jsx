import React from "react";

export default function CourseListRow({
  isHeader = false,
  textFirstCell = "",
  textSecondCell = null,
}) {
  // Couleur de fond avec opacité RGBA
  const headerBg = "rgba(222, 181, 181, 0.66)"; // #deb5b5 + 66 %
  const rowBg = "rgba(205, 205, 205, 0.45)";   // #CDCDCD + 45 %

  const rowStyle = {
    backgroundColor: isHeader ? headerBg : rowBg,
  };

  // Bordure grise, padding-left de 8px, texte noir
  const cellClass = "border border-gray-400 pl-2 text-black";

  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr style={rowStyle}>
          <th colSpan="2" className={`${cellClass} font-bold`}>
            {textFirstCell}
          </th>
        </tr>
      );
    }
    return (
      <tr style={rowStyle}>
        <th className={`${cellClass} font-bold w-[70%]`}>{textFirstCell}</th>
        <th className={`${cellClass} font-bold`}>{textSecondCell}</th>
      </tr>
    );
  }

  return (
    <tr style={rowStyle}>
      <td className={cellClass}>{textFirstCell}</td>
      <td className={cellClass}>{textSecondCell}</td>
    </tr>
  );
}
