// #!/usr/bin/env qjs
// This script is an attempt to port semver.bash <github.com/unforswearing/semver-bash> to JavaScript (QuickJS <https://bellard.org/quickjs/>).

import * as std from 'std';

// console.log(scriptArgs)

//semver.js [ option [ -M | -m | -p | -s | -d <metadata> ]] version
// if option or version is missing, error and exit
const option = scriptArgs[1]
// console.log(option)
const version = scriptArgs[2]
// std.out.puts(`${version}\n`)
const metadata = scriptArgs[3]
// console.log(metadata)

if (!option || !version) {
  // console.log("error: option or version is missing")
  std.err.puts("error: option or version is missing\n")
  exit(1)
}

// read version into array, splitting on period "."
// given a version "1.2.3-rc-1", the versionArray value
// should read as follows:
let versionArray;
let subpatchArray;
let patchValue;
let subpatchString;

// For the purposes of this script, a subpatch counts as metadata,
// therefore, if subpatch exists, metadata also exists. However
// metadata in the subpatchArray will have a length > 1.
let versionOptionalElements = {
  "hasSubpatch": false,
  "hasMetadata": false
}

versionArray = version.split(".")

// TODO: first check if the subpatch exists, then exec the following:
subpatchArray = versionArray[2].split("-")
patchValue = subpatchArray[0]
versionArray[2] = patchValue

if (!subpatchArray[1]) {
  subpatchString = false
} else {
  subpatchArray.shift()
  subpatchString = subpatchArray.join("-")
  // the following could be more strict at some point
  if (subpatchArray.length == 1) {
    versionOptionalElements.hasSubpatch = true
  }
  if (metadata) {
    versionOptionalElements.hasMetadata = true
    // console.log(versionOptionalElements.hasMetadata)
  }
}

versionArray.push(subpatchString)

// console.log(versionArray)

// TODO: use the versionElements object to indicate which elements
//       of the version passed to script contain values - specifically
//       Subpatch or Metadata values. Note: All versions passed to script
//       should contain at least Major, Minor, and Patch.

// Helper functions
function log(logText) {
  std.puts(`${logText}\n`);
}

/**/
// Note: this script will mirror semver.bash in that it
//       does not recognize "subpatch" characters after z.
//       The result for any item after "z" will be "undefined"
const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
// const alphaindex = new Array(26);

function getAlphaFromIndex(index) {
  // console.log(alphabet[index]);
  return alphabet[index];
}
function getIndexOfAlpha(char) {
  // console.log(alphabet.indexOf(char));
  return alphabet.indexOf(char);
}
// console.log(versionArray)
// console.log(option)
if (option == "-M" || option == "--major") {
  // increment major version. 1.0.0 -> 2.0.0
  let versionMajor;
  versionMajor = ++versionArray[0]
  // console.log(versionMajor)
  // only pop() if array contains subpatch and/or metadata
  versionArray.pop()
  versionArray.fill(0)
  versionArray[0] = versionMajor
  // console.log(versionArray)
  log(versionArray.join("."))
} else if (option == "-m" || option == "--minor") {
  // increment minor version. 2.0.0 -> 2.1.0
  let versionMinor;
  versionMinor = ++versionArray[1]
  // only pop() if array contains subpatch and/or metadata
  versionArray.pop()
  versionArray[2] = 0
  versionArray[1] = versionMinor
  log(versionArray.join("."))
} else if (option == "-p" || option == "--patch") {
  // increment patch version. 2.1.0 -> 2.1.1
  let versionPatch;
  versionPatch = ++versionArray[2]
  // only pop() if array contains subpatch and/or metadata
  versionArray.pop()
  versionArray[2] = versionPatch
  log(versionArray.join("."))
} else if (option == "-s" || option == "--subpatch") {
  // add or increment supbatch. 2.1.1 -> 2.1.1-a ; 2.1.1-a -> 2.1.1-b
  // check for subpatch, if not found, add "-a" to version
  // and print version with new subpatch.
  if (!versionOptionalElements.hasSubpatch) {
    let newSubpatch = "-a"
    // versionArray.push(newSubpatch)
    log(`${versionArray.filter(Boolean).join(".")}${newSubpatch}`)
  } else {
    // if subpatch is found at the end of version:
    let subpatchIndexNum;
    let newSubpatchChar;
    // get index of subpatch char
    subpatchIndexNum = getIndexOfAlpha(subpatchArray[0])
    // get next char using getAlphaFromIndex(newIndex)
    // increment index of current char to get next char
    newSubpatchChar = getAlphaFromIndex(++subpatchIndexNum)
    newSubpatchChar = `-${newSubpatchChar}`

    // remove the current subpatch from versionArray
    versionArray.pop()

    // recompile and print version with new subpatch
    log(`${versionArray.join(".")}${newSubpatchChar}`);
  }
} else if (option == "-d" || option == "--metadata") {
  // add metadata to version. 2.1.1-b -> 2.1.1-dev-2
  // note: metadata replaces any subpatch and does not
  //       increment any other element of the version.
  // Since metadata replaces any current subpatch, no
  // need to check for current subpatch (or metadata).
  // Just add the metadata to the version and return the value.
  // console.log(versionOptionalElements.hasMetadata)
  // if (!versionOptionalElements.hasMetadata) {
  if (!metadata) {
    log("metadata error: arugment missing!")
    exit(1)
  }

  versionArray.pop()
  log(`${versionArray.join(".")}-${metadata}`)
}
