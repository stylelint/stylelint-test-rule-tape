var stylelint = require('stylelint');
var test = require('tape');

function assertEquality(processCss, context) {
  var testFn = (context.only) ? test.only : test;
  testFn(context.caseDescription, function(t) {
    t.plan(context.comparisonCount);
    processCss.then(function(comparisons) {
      comparisons.forEach(function(comparison) {
        t.equal(comparison.actual, comparison.expected, comparison.description);
      });
    });
  });
}

module.exports = stylelint.createRuleTester(assertEquality);

// Anybody want to use another test engine?
//
// Here are some possible modules:
//
// AVA rule tester
//
// import createStylelintRuleTester from "./createStylelintRuleTester"
// import test from "ava"
//
// function assertEquality(processCss, context) {
//   const testFn = (context.only) ? test.only : test
//   testFn(context.caseDescription, t => {
//     return processCss.then((comparisons) => {
//       comparisons.forEach(({ actual, expected, description }) => {
//         t.is(actual, expected, description)
//       })
//     })
//   })
// }
//
// export default createStylelintRuleTester(assertEquality)

// Mocha rule tester
//
// import createStylelintRuleTester from "./createStylelintRuleTester"
// import assert from "assert"
//
// function assertEquality(processCss, context) {
//   const describeFn = (context.only) ? describe.only : describe
//   describeFn(context.caseDescription, () => {
//     it(context.completeAssertionDescription, done => {
//       processCss.then((comparisons) => {
//         comparisons.forEach(({ actual, expected, description }) => {
//           assert.equal(actual, expected, description)
//         })
//         done()
//       }).catch(done)
//     })
//   })
// }
//
// export default createStylelintRuleTester(assertEquality)
