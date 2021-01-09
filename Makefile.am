dist_bin_SCRIPTS = osacli
dist_doc_DATA = README.md
man1_MANS = osacli.1
dist_man_MANS = osacli.1

CLEANFILES = $(dist_bin_SCRIPTS)

rwildcard = $(foreach d, $(wildcard $1*), $(call rwildcard, $d/, $2) $(filter $2, $d))
JS_FILES = $(call rwildcard,$(srcdir)/src,%.js)

TESTS = tests/safari.sh
TESTS_ENVIRONMENT = \
  osacli=$(abs_top_builddir)/osacli;\
  export osacli;

if FOUND_PANDOC
osacli.1: $(srcdir)/docs/osacli.1.md
	pandoc --standalone --to man $(srcdir)/docs/osacli.1.md -o $@
else
osacli.1:
	cp $(srcdir)/docs/osacli.1 $@
endif

osacli: $(JS_FILES) $(srcdir)/create-cli.sh
	$(srcdir)/create-cli.sh > $@
	chmod u+x $@
