require () {
	libutil:argtest "$1"
	local comm= 
	comm="$(command -v $1)" 
	if [[ -n $comm ]]
	then
		true
	else
		libutil:error.notfound "$1"
	fi
}
