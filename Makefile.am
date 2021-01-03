dist_bin_SCRIPTS = osacli
dist_doc_DATA = README.md
man1_MANS = osacli.1
dist_man_MANS = osacli.1

CLEANFILES = $(dist_bin_SCRIPTS)

if FOUND_PANDOC
osacli.1: docs/osacli.1.md
	pandoc --standalone --to man $(srcdir)/docs/osacli.1.md -o $@
else
osacli.1:
	cp $(srcdir)/docs/osacli.1 $@
endif

osacli:
	$(srcdir)/create-cli.sh > $@
	chmod u+x $@
