################################################################################
############################## Variables to change #############################
##### Set DEBUG to True if you don't want to minify css files (just compile).
##### Set to false if you're in dev.
DEBUG						= True

##### PROJECT VARIABLES
PROJECT_NAME				= HelloWorld
VERSION						= 1.0.0

#####
DEV_DIRECTORY				= app
PROD_DIRECTORY				= www

##### LESS, SASS, CSS CONFIGURATION
##### If you're using less, fill with less files
LESS_DIR					= $(DEV_DIRECTORY)/less
LESS_FILES					=

##### TODO: sass option

##### Output directories for css files
CSS_DIR						= $(PROD_DIRECTORY)/css
CSS_FILES					= $(patsubst $(LESS_DIR)/%.less, $(CSS_DIR)/%.css, $(LESS_FILES))

##### If you're on prod, you can minify into only one file. Put a name
CSS_MINIFY_OUTPUT			= styles.css

##### JS CONFIGURATION
##### JS dev location
JS_DIR						= $(DEV_DIRECTORY)/js
JS_FILES					=
##### JS output location
JS_OUTPUT_DIR				= $(PROD_DIRECTORY)/js
JS_OUTPUT_FILE				= $(JS_OUTPUT_DIR)/styles.js

##### Location of yuicompressor jar to minify js files
YUICOMPRESSOR_LOC			= $(HOME)/.lib/yuicompressor-2.4.8.jar

##### DIRECTORIES AND FILES TO COPY FROM DEV LOCATION TO WWW LOCATION
##### By default, it copies img directory and index.html
DEV_DIRECTORY_LIST			= $(DEV_DIRECTORY)/img \
							  $(DEV_DIRECTORY)/index.html
##### Don't change this variable if you you want to keep the same directory structure into the prod directory
PROD_DIRECTORY_LIST			= $(patsubst $(DEV_DIRECTORY)/%, $(PROD_DIRECTORY)/%, $(DEV_DIRECTORY_LIST))

##### BUILD DIRECTORY
BUILD_DIRECTORY				= $(shell pwd)/build
BUILD_NAME_TEMPLATE			= $(PROJECT_NAME)-$(VERSION)-$(shell date +%Y%m%d.%H%M%S)
BUILD_RELEASE_NAME_TEMPLATE = $(PROJECT_NAME)-$(VERSION)

##### PLUGINS
PLUGINS						= cordova-plugin-whitelist
################################################################################

################################################################################
############################## Variables #######################################
##### You don't need to change it.
JS_EXEC						= java -jar $(YUICOMPRESSOR_LOC)

ifeq ($(DEBUG),True)
	    LESSC=lessc
	else
	    LESSC=lessc --clean-css
	endif
################################################################################

################################################################################
################# Variables for binary/executables #############################
# TODO: Define variables for binary and executables to check if they exist. Use
# $(shell command -v COMMAND_NAME) and ifndef
################################################################################

################################################################################
###################################### Rules ###################################
.PHONY: clean js css clean_js clean_jss_minify clean_css re_css re_js re prod re_prod init android init_dir init_dep

all: init_dir css js $(PROD_DIRECTORY_LIST)

##### MINIFY JS
js:
	$(JS_EXEC) -o $(JS_OUTPUT_FILE) $(JS_FILES)

##### MINIFY CSS
css: clean_css_minify $(CSS_FILES)

$(CSS_DIR)/%.css: $(LESS_DIR)/%.less
ifeq ($(DEBUG),True)
		$(LESSC) $< $@
else
	    $(LESSC) $< >> $(CSS_MINIFY_OUTPUT)
endif

$(PROD_DIRECTORY)/%: $(DEV_DIRECTORY)/%
	cp -r $< $@

##### Cordova rules
build_android: all
ifeq ($(DEBUG),False)
	@echo "-----> Build Android: release version"
	@cordova build android --release
	@echo "-----> Copy the apk into $(BUILD_DIRECTORY)/android"
	@cp platforms/android/build/outputs/apk/android-release-unsigned.apk $(BUILD_DIRECTORY)/android/$(BUILD_RELEASE_NAME_TEMPLATE).apk
else
	@echo "-----> Build Android: debug version"
	@cordova build android
	@echo "-----> Copy the apk into $(BUILD_DIRECTORY)/android"
	cp platforms/android/build/outputs/apk/android-debug.apk $(BUILD_DIRECTORY)/android/$(BUILD_NAME_TEMPLATE).apk
endif

install_android: build_android
ifeq ($(DEBUG),False)
	@echo "-----> Install release version on Android device. Be sure adb server is launched!"
	@adb install -r platforms/android/build/outputs/apk/android-release-unsigned.apk
else
	@echo "-----> Install debug version on Android device. Be sure adb server is launched!"
	@adb install -r platforms/android/build/outputs/apk/android-debug.apk
endif

run_android: all
	@echo "-----> Run the application on the connected device"
	@cordova run android

build_ios: all
	@cordova build ios

add_android:
	@echo "-----> Add android platform. Be sure you installed the Android SDK!"
	@cordova platform add android

add_ios:
	@echo "-----> Add iOS platform. Be sure you installed the iOS SDK!"
	@cordova platform add ios

rm_android:
	@echo "-----> Remove Android platform."
	@cordova platform rm android

rm_ios:
	@echo "-----> Remove iOS platform."
	@cordova platform rm ios

##### clean
clean: clean_js clean_css clean_css_minify
	@echo "-----> Remove production directory list"
	$(RM) -r $(PROD_DIRECTORY_LIST)
	@echo "-----> Clean cordova"
	@cordova clean

clean_js:
	@echo "-----> Remove JS compiled file"
	$(RM) $(JS_OUTPUT_FILE)

clean_css_minify:
	@echo "-----> Remove CSS minified file"
	$(RM) $(CSS_MINIFY_OUTPUT)

clean_css:
	@echo "-----> Remove CSS files"
	$(RM) $(CSS_FILES)

##### re
re_css: clean_css css

re_js: clean_js js

re: clean all

##### special rules for prod
prod:
	make DEBUG=False css
	make DEBUG=False js

re_prod:
	make DEBUG=False re_css
	make DEBUG=False re_js

##### Initialisation
init_dir:
	mkdir -p $(PROD_DIRECTORY) $(JS_OUTPUT_DIR) $(CSS_DIR) $(BUILD_DIRECTORY)/android $(BUILD_DIRECTORY)/ios

init_plugins: $(PLUGINS)

$(PLUGINS):
	cordova plugin add $@

init_dep: init_plugins
	# TODO: Initialise the directory with required packages and executables
