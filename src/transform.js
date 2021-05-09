// assign 80 once you accept a challenge to implement Level 80 requirements
export const level = 80;

/*
  Add parameters as appropriate.
  Should allow arbitrary number of expressions.
  Should work with arbitrary function expressions passed.
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates
*/

function convertNumber(num) {
  return num * 2 + 3;
}

function convertToLovercase(str) {
  return str.toLowerCase();
}

function convertFuncName(func, arg, val) {
  return func(arg, val);
}

function convertToJSON(obj) {
  return JSON.stringify(obj);
}

function findHandler(arg) {
  switch (typeof arg) {
    case 'number':
      return convertNumber;
    case 'string':
      return convertToLovercase;
    case 'function':
      return convertFuncName;
    default:
      return convertToJSON;
  }
}

export function transform(strings, ...values) {
  let parsedString = ``;
  let i = 0;
  while (i < values.length) {
    if (typeof values[i] === 'function') {
      if (values[i + 1]) {
        parsedString += `${strings[i]}${convertFuncName(values[i], strings[i + 1], values[i + 1])}`;
        i += 2;
      } else {
        parsedString += `${strings[i]}${convertFuncName(values[i])}`;
        i += 1;
      }
    } else {
      parsedString += `${strings[i]}${findHandler(values[i])(values[i])}`;
      i += 1;
    }
  }
  return parsedString;
}

/*
  Level 1: expects no parameters. Returns its own name capitalized.
    Usage example:
      testFunction() should return 'TESTFUNCTION'
  Level 80: expects 2 parameters. Returns its own name capitalized and both parameters' values appended to it.
    Whitespaces should be trimmed from the first parameter.
    Parameters values are glued with '=' and parenthesized.
    Usage example:
      testFunction("some Text", 125) should return 'TESTFUNCTION(someText=125)'
 */

// LEVEL 1

// export function testFunction() {
//   return testFunction.name.toUpperCase();
// }

// LEVEL 2

export function testFunction(argName, valName) {
  if (valName && argName) {
    return `${testFunction.name.toUpperCase()}(${argName.replace(/\s/g, '')}=${valName})`;
  }
  return `${testFunction.name.toUpperCase()}`;
}
