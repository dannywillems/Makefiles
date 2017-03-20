include Makefile.config

################################################################################
############################# Constant variables ###############################
##### Shell
SHELL		= /bin/bash

##### Current directory. it's the directory containing the makefile.
CURRENT_DIR = $(shell pwd)

##### Compilers
PDFLATEX	= pdflatex
DVILUATEX	= dviluatex
BIBTEX		= bibtex

CC_WITH_OPTIONS = \
    TEXINPUTS="$(SRC_DIR):$(RES_DIR):$(THEME_DIR):$(LIB_DIR):" \
    TEXMFOUTPUTS="$(OUTPUT_DIR)" \
    $(CC) \
    -output-directory=$(OUTPUT_DIR)

################################################################################

################################################################################
############################### Rules ##########################################
all: $(NAME)

$(OUTPUT_DIR):
	mkdir -p $@

$(NAME): $(OUTPUT_DIR)
	$(CC_WITH_OPTIONS) $@.tex
ifeq ($(USE_BIB),true)
	cd $(OUTPUT_DIR) && \
    BIBINPUTS="$(CURRENT_DIR)/$(SRC_DIR)" \
    BSTINPUT="$(CURRENT_DIR)/$(SRC_DIR)" \
    TEXMFOUTPUTS="./" \
    $(CC_BIB) \
    $(NAME) && \
    cd $(CURRENT_DIR)
	$(CC_WITH_OPTIONS) $@.tex
else
endif
	$(CC_WITH_OPTIONS) $@.tex

zip: fclean $(NAME)
	$(MAKE) clean
	zip -r $(NAME).zip $(OUTPUT_DIR)/* -x *.git*

clean:
	$(RM) $(OUTPUT_DIR)/$(NAME).{out,aux,toc,log,tex.backup,nav,snm,bbl,blg}
	$(RM) $(OUTPUT_DIR)/texput.log

# $(OUTPUT_DIR) is only removed when the directory is empty (never be the case
# if it's the project root directory).
fclean: clean
	$(RM) $(OUTPUT_DIR)/$(NAME).{pdf,zip,dvi}
	-rmdir $(OUTPUT_DIR)

re: fclean $(NAME)
################################################################################

.PHONY: all $(NAME) zip clean fclean re
