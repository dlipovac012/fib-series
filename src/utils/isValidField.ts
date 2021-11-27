export const isValidField = ({
	value,
	row,
	col,
	gridSize,
}: {
	value?: number;
	row: number;
	col: number;
	gridSize: number;
}) => {
	// If cell is out of bounds
	if (row < 0 || col < 0 || row >= gridSize || col >= gridSize) return false;

	// If cell does not have the value (it equals to zero)
	if (value === 0) return false;

	// Otherwise, it can be visited
	return true;
};
