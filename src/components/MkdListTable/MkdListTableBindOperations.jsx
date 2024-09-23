export const operations = {
  EQUAL: "eq",
  NOT_EQUAL: "neq",
  IS_NULL: "isn",
  IS_NOT_NULL: "isnn",
  CONTAINS: "cs",
  START_WITH: "sw",
  END_WITH: "ew",
  LESS_THAN: "lt",
  GREATER_THAN: "gt",
};
export const runOperation = (row, column, operator, value) => {
  const rowValue = row[column];

  switch (operator) {
    case operations.EQUAL:
      return rowValue === value;
      
    case operations.NOT_EQUAL:
      return rowValue !== value;
      
    case operations.IS_NULL:
      return rowValue === null;
      
    case operations.IS_NOT_NULL:
      return rowValue !== null;
      
    case operations.CONTAINS:
      return typeof rowValue === 'string' && rowValue.includes(value);
      
    case operations.START_WITH:
      return typeof rowValue === 'string' && rowValue.startsWith(value);
      
    case operations.END_WITH:
      return typeof rowValue === 'string' && rowValue.endsWith(value);
      
    case operations.GREATER_THAN:
      return rowValue > value;
      
    case operations.LESS_THAN:
      return rowValue < value;
      
    default:
      return false; // Return false if the operator is not recognized
  }
};

export const logicalOR = (action, row) => {
  if (
    !Array.isArray(action?.bind?.column) ||
    !Array.isArray(action?.bind?.ifValue)
  ) {
    return false;
  }
  if (action?.bind?.column?.length !== action?.bind?.ifValue?.length) {
    return false;
  }

  const result = action?.bind?.ifValue.map((value, index) =>
    runOperation(
      row,
      action?.bind?.column[index],
      action?.bind?.operator,
      value
    )
  );
  return result.some((res) => res === true);
};

export const logicalAND = (action, row) => {
  if (
    !Array.isArray(action?.bind?.column) ||
    !Array.isArray(action?.bind?.ifValue)
  ) {
    return false;
  }
  if (action?.bind?.column?.length !== action?.bind?.ifValue?.length) {
    return false;
  }

  const result = action?.bind?.ifValue.map((value, index) =>
    runOperation(
      row,
      action?.bind?.column[index],
      action?.bind?.operator,
      value
    )
  );
  return result.every((res) => res === true);
};

export const processBind = (action, row) => {
  if (action?.bind?.logic) {
    switch (action?.bind?.logic) {
      case "or":
        return logicalOR(action, row);
      case "and":
        return logicalAND(action, row);
    }
  } else {
    return runOperation(
      row,
      action?.bind?.column,
      action?.bind?.operator,
      action?.bind?.ifValue
    );
  }
};
