semver.bash
===========

Increment semantic versioning strings in shell scripts.

```bash
$ ./semver.bash
usage: semver.bash [ -M | -m | -p | -s | -d ] version
use option --help for full help text.

$ ./semver.bash -M 1.1.15
2.0.0

$ ./semver.bash -m 0.0.3
0.1.0

$ ./semver.bash -p 0.0.0
0.0.1

$ ./semver.bash -s 1.0.3-a
1.0.3-b

$ ./semver.bash -d "beta-2.1.4" 2.1.3
2.1.3-beta-2.1.4

# Only one option can be used at a time, but commands can be chained:
$ ./semver.bash -p 1.1.15 | ./semver.bash -s $(cat -)
1.16-a
```
