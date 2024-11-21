const smarter = require('../smarter'); // Update path if needed

test('fewer errors should result in a higher score', () => {
  const score1 = smarter(10, 5, 0, 50); // 0 errors
  const score2 = smarter(10, 5, 5, 50); // 5 errors
  expect(score1).toBeGreaterThan(score2); // Test that fewer errors result in a higher score
});

test('more unique letters should result in a higher score', () => {
  const score1 = smarter(10, 10, 0, 50); // More unique letters
  const score2 = smarter(10, 5, 0, 50);  // Fewer unique letters
  expect(score1).toBeGreaterThan(score2); // Test that more unique letters result in a higher score
});
