<!-- markdownlint-disable MD041 -->
[![shellcheck](https://github.com/unforswearing/bash-semver/actions/workflows/shellcheck.yml/badge.svg)](https://github.com/unforswearing/bash-semver/actions/workflows/shellcheck.yml)

`semver.bash` is a loose implementation of semantic versioning that suits a particular need and may not strictly adhere to the specification described at https://semver.org/.

This code lives at https://github.com/unforswearing/bash-semver

## Installation

Clone this repository and run `semver.bash` directly:

```shell-session
$ git clone https://github.com/unforswearing/bash_semver.git
$ cd bash_semver
# ./bash_semver --help
```

## Usage

View help by running `semver.bash --help`

```txt
semver.bash [option [ -M | -m | -p | -s | -d <metadata> ]] version
```

* Both short and long options can be used with `semver.bash`. 
* Two arguments are required for all options execpt `-d | --metadata`. 
  * If you are adding metadata to your version with option `-d` you must include the metadata string immediately after the option flag.

```bash
semver.bash -d <metadata> version
```

* You can not use more than one flag at a time. 
  * This means you will not be able to use `semver.bash` to make multiple updates with a single execution. 

```bash
# Bad Code
# This command has multiple flags and will not work
semver.bash -M -m 1.2.9

# Good Code
# Instead, use the following code to update the Major and Minor version
semver.bash -M 1.2.9 | semver.bash -m "$(cat -)"
```

## Options

### Major

> option flags: `-M, --major`

Increment major version.

```bash
# semver.bash --major 1.0.0
semver.bash -M 1.0.0
```

Output: `2.0.0`

### Minor

> option flags: `-m, --minor`

Increment minor version.

```bash
# semver.bash --minor 2.0.0
semver.bash -m 2.0.0
```

Output: `2.1.0`

### Patch 

> option flags: `-p, --patch`

Increment "patch" version.

```bash
# semver.bash --patch 2.1.0
semver.bash -p 2.1.0
```

Output: `2.1.1`

### Subpatch

> option flags: `-s, --subpatch`

Increment "subpatch" version.

```bash
# semver.bash --subpatch 2.1.1
semver.bash -s 2.1.1
```

Output: `2.1.1-a`

<p>

#### Adding or updating a subpatch

Option `-s` is append only. when passing a version to without a so-called "subpatch", option `-s` will append "a" as the subpatch to the version as "version-a". If the version already has a subpatch that is in the format `-[aA-zZ]`, the subpatch will be incrmented, eg: version `1.5.2-r` will increment to `1.5.2-s`. incrementation of single letters works through letter z.

#### Subpatches and metadata

If the version contains metadata (set with option `-d`), the subpatch will be appended to the version after the metadata. For example, version `1.5.2-r-dev-1.5.3` will be updated to `1.5.2-r-dev-1.5.3-a`.

### Metadata

> option flags: `-d, --metadata`

Add metadata to the version.

```bash
# semver.bash --metadata "dev-2.1.2" "2.1.1-a"
semver.bash -d "dev-2.1.2" "2.1.1-a"
```

Output: `2.1.1-dev-2.1.2`

**Note:** Metadata will replace the subpatch in your version. For example:

```bash
semver.bash --metadata "beta-1.5.3" 1.5.2-r
```

Output: `1.5.2-beta-1.5.3`
