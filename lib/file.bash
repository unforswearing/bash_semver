file () {
	libutil:argtest "$1"
	local name="$1" 
	if [[ -s "$name" ]]
	then
		true
	else
		libutil:error.nofile "$name"
	fi
}
