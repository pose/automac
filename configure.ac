AC_INIT([osacli], [0.0.1])
AM_INIT_AUTOMAKE([foreign])

AC_CONFIG_FILES([Makefile])

AC_CHECK_PROG([pandoc],[pandoc],[yes],[no])
AM_CONDITIONAL([FOUND_PANDOC], [test x"$pandoc" = x"yes"])
AM_COND_IF([FOUND_PANDOC],,[AC_MSG_WARN([optional dependency 'pandoc' not found.])])

AC_OUTPUT
