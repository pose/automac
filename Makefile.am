dist_bin_SCRIPTS = automac
dist_doc_DATA = README.md
man1_MANS = automac.1
dist_man_MANS = automac.1

CLEANFILES = $(dist_bin_SCRIPTS)

rwildcard = $(foreach d, $(wildcard $1*), $(call rwildcard, $d/, $2) $(filter $2, $d))
JS_FILES = $(call rwildcard,$(srcdir)/src,%.js)

# To generate package documentation, pandoc is required
if FOUND_PANDOC
automac.1: $(srcdir)/docs/automac.1.md
	pandoc --standalone --to man $(srcdir)/docs/automac.1.md -o $@
else
automac.1:
	cp $(srcdir)/docs/automac.1 $@
endif

# Tests require jq and shunit2 to run
if FOUND_JQ
if FOUND_SHUNIT2
TESTS = tests/safari.sh tests/notes.sh tests/debug.sh
TESTS_ENVIRONMENT = \
  automac=$(abs_top_builddir)/automac;\
  export automac;
endif
endif

automac: $(JS_FILES) $(srcdir)/create-cli.sh
	$(srcdir)/create-cli.sh > $@
	chmod u+x $@
