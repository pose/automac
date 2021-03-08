AC_INIT([automac], [0.1])
AM_INIT_AUTOMAKE([foreign])

AC_CONFIG_FILES([Makefile])

AC_CHECK_PROG([pandoc],[pandoc],[yes],[no])
AM_CONDITIONAL([FOUND_PANDOC], [test x"$pandoc" = x"yes"])
AM_COND_IF([FOUND_PANDOC],,[AC_MSG_WARN([optional dependency 'pandoc' not found.])])

AC_CHECK_PROG([jq],[jq],[yes],[no])
AM_CONDITIONAL([FOUND_JQ], [test x"$jq" = x"yes"])
AM_COND_IF([FOUND_JQ],,[AC_MSG_WARN([optional dependency 'jq' not found.])])

AC_CHECK_PROG([shunit2],[shunit2],[yes],[no])
AM_CONDITIONAL([FOUND_SHUNIT2], [test x"$shunit2" = x"yes"])
AM_COND_IF([FOUND_SHUNIT2],,[AC_MSG_WARN([optional dependency 'shunit2' not found.])])

AC_OUTPUT
