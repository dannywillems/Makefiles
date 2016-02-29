Makefiles
=========

A repository containing Makefiles for different languages and building
methods.

Feel free to add your own Makefile and make a pull request.

- **Makefile.c.dynamic.lib**: C, build dynamic library
- **Makefile.c.exe**: C, compile into a binary file
- **Makefile.css.js**: Minify CSS and JS files. Dev and prod mode available
- **Makefile.latex**: LaTeX, Compile latex files
- **Makefile.ocaml**: OCaml, compile ocaml projects
- **Makefile.js.of.ocaml**: [js_of_ocaml](http://ocsigen.org/js_of_ocaml/) project. Compile your ml files into js
  scripts to use them in a web browser.
- **Makefile.cordova**: Makefile to build cordova project. You can develop into an
  *app* directory (default: app) and when you launch *make*, it minifies your js
  files, compile your less files into css files (sass coming soon). A complete
  article and tutorial will be available on http://blog.danny-willems.be.
- **Makefile.cordova.js_of_ocaml**: Use [js_of_ocaml](http://ocsigen.org/js_of_ocaml/) in your cordova application. It compiles your ocaml files into a js file. It's very similar to Makefile.cordova.
