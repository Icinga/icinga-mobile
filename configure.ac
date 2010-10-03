#                                               -*- Autoconf -*-
# Process this file with autoconf to produce a configure script.

AC_PREREQ(2.61)
AC_INIT(index.html)
AC_PREFIX_DEFAULT(/usr/local/icinga-mobile)

# Checks for programs.
AC_PROG_INSTALL
AC_PROG_GREP
AC_PROG_SED

# Checks for libraries.

# Checks for header files.

# Checks for typedefs, structures, and compiler characteristics.

# Checks for library functions.

# Define install options
AC_ARG_WITH([web_user],
	AS_HELP_STRING([--with-web-user=USER], [username for web writable files (default www-data)]),
	web_user=$withval,
	web_user=www-data
)

AC_ARG_WITH([web_group],
	AS_HELP_STRING([--with-web-group=GROUP], [group for web writable files (default www-data)]),
	web_group=$withval,
	web_group=www-data
)


AC_ARG_WITH([web_path],
	AS_HELP_STRING([--with-web-path=PATH], [web sub path (default /icinga-mobile)]),
	web_path=$withval,
	web_path=/icinga-mobile
)

AC_ARG_WITH([web_apache_path],
	AS_HELP_STRING([--with-web-apache-path=PATH], [Include folder apache2 (default /etc/apache2/conf.d]),
	web_apache_path=$withval,
	web_apache_path=/etc/apache2/conf.d
)

AC_SUBST(DEFAULT_URL)
AC_SUBST(web_user)
AC_SUBST(web_group)
AC_SUBST(web_path)
AC_SUBST(web_apache_path)
INSTALL_OPTS="-o $web_user -g $web_group"
AC_SUBST(INSTALL_OPTS)

AC_CONFIG_FILES([
	Makefile
	etc/apache/icinga-mobile.conf
])

AC_OUTPUT