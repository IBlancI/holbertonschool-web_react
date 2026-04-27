import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  headerRow: {
    backgroundColor: '#deb5b545',
  },
  row: {
    backgroundColor: '#f5f5f5ab',
  },
});

// Renders a single row in the course table (header or data)
export default function CourseListRow({
  isHeader = false,
  textFirstCell = '',
  textSecondCell = null,
  isSelected = false,
  onChangeRow = () => {},
  id,
}) {
  const appliedStyle = isHeader ? styles.headerRow : styles.row;

  if (isHeader) {
    return (
      <tr className={css(appliedStyle)}>
        <th colSpan={textSecondCell ? 1 : 2}>{textFirstCell}</th>
        {textSecondCell ? <th>{textSecondCell}</th> : null}
      </tr>
    );
  }

  return (
    <tr className={css(appliedStyle)}>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onChangeRow(id, e.target.checked)}
        />
        {textFirstCell}
      </td>
      <td>{textSecondCell}</td>
    </tr>
  );
}
