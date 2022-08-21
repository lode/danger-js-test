# danger-js-test

Repro:

0. Run `yarn install` and `git checkout test-branch`
1. Add a line 'dos' to `two.md`
2. Add a line 'tres' to `three.md`
3. Run `git add two.md` to stage `two.md`, but not commit; leave `three.md` as is
4. Run `yarn danger local -b main`
5. The output should end with:
   ```
   true true
   one.md true true true
   two.md true true true
   three.md true true true
   ```
6. Run `yarn danger local -b main -s`
7. The output should end with:
   ```
   true false
   one.md false false false
   two.md false false false
   three.md true true true
   ```
8. All the `false`s are bugs
