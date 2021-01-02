output_dir=dist
dir_guard=@mkdir -p $(output_dir)

dist_bin_SCRIPTS = dist/osacli
CLEANFILES = $(dist_bin_SCRIPTS)

dist_doc_DATA = README.md

man1_MANS = docs/osacli.1
dist_man_MANS = docs/osacli.1

if FOUND_PANDOC
docs/osacli.1: docs/osacli.1.md
	pandoc --standalone --to man $< -o $@
endif

dist/osacli:
	$(dir_guard)
	./create-cli.sh > $@
	chmod u+x $@
