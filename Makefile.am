output_dir=dist
dir_guard=@mkdir -p $(output_dir)

dist_bin_SCRIPTS = dist/osacli
CLEANFILES = $(dist_bin_SCRIPTS)

dist/osacli:
	$(dir_guard)
	./create-cli.sh > $@
	chmod u+x $@
