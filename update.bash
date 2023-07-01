# used in release.bash
# usage: bash update.bash 
bash semver.bash -m "$(grep '^.*$' version)"
