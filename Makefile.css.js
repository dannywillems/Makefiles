################################################################################
############################# Variables to change ##############################
##### Set DEBUG to True if you don't want to minify css files (just compile).
##### Set to false if you're in dev.
DEBUG							= True

##### If you're using less, fill with less files
LESS_DIR					= less
LESS_FILES				=

##### TODO: sass option

##### Output directories for css files
CSS_DIR						= css
CSS_FILES					= $(patsubst $(LESS_DIR)/%.less, $(CSS_DIR)/%.css, $(LESS_FILES))

##### If you're on prod, you can minify into only one file. Put a name
CSS_MINIFY_OUTPUT	=

##### Location of yuicompressor jar to minify js files
YUICOMPRESSOR_LOC	= yuicompressor-2.4.8.jar

##### JS location
JS_DIR						= js
JS_FILES					=

################################################################################

################################################################################
############################## Variables #######################################
##### You don't need to change it.
JS_EXEC						= java -jar $(YUICOMPRESSOR_LOC)
JS_MINIFIED_FILES	= $(JS_FILES:.js=.min.js)

ifeq ($(DEBUG),True)
	    LESSC=lessc
	else
	    LESSC=lessc --clean-css
	endif
################################################################################

################################################################################
###################################### Rules ###################################
all: css

##### MINIFY JS
js: $(JS_MINIFIED_FILES)

%.min.js: %.js
	$(JS_EXEC) $< -o $@

##### MINIFY CSS
css: clean_css_minify $(CSS_FILES)

$(CSS_DIR)/%.css: $(LESS_DIR)/%.less
ifeq ($(DEBUG),True)
		$(LESSC) $< $@
else
	    $(LESSC) $< >> $(CSS_MINIFY_OUTPUT)
endif

##### clean
clean_js:
	$(RM) $(JS_MINIFIED_FILES)

clean_css_minify:
ifeq ($(DEBUG),False)
	mkdir -p $(CSS_DIR)
	$(RM) $(CSS_MINIFY_OUTPUT)
	touch $(CSS_MINIFY_OUTPUT)
endif

clean_css:
	$(RM) $(CSS_FILES)
	$(RM) $(CSS_MINIFY_OUTPUT)

##### re
re_css: clean_css css

re_js: clean_js js

re: re_css re_js

##### special rules for prod
prod:
	make DEBUG=False css
	make DEBUG=False js

re_prod:
	make DEBUG=False re_css
	make DEBUG=False re_js
################################################################################
