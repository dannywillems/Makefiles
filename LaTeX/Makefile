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

##### Intermediate files.
AUX_FILES = $(addprefix $(OUTPUT_DIR)/, $(addsuffix .aux, $(INCLUDED_TEX_FILES)))

################################################################################

################################################################################
############################### Rules ##########################################
all: $(NAME)

$(OUTPUT_DIR):
	mkdir -p $@

$(NAME): $(OUTPUT_DIR)
	TEXINPUTS="$(SRC_DIR):" \
    TEXMFOUTPUTS="$(OUTPUT_DIR)" \
    $(CC) \
    -output-directory=$(OUTPUT_DIR) \
    $(NAME).tex
ifeq ($(USE_BIB),true)
	cd $(OUTPUT_DIR) && \
    BIBINPUTS="$(CURRENT_DIR)/$(SRC_DIR)" \
    BSTINPUT="$(CURRENT_DIR)/$(SRC_DIR)" \
    TEXMFOUTPUTS="./" \
    $(CC_BIB) \
    $(NAME) && \
    cd $(CURRENT_DIR)
	TEXINPUTS="$(SRC_DIR):" \
    TEXMFOUTPUTS="$(OUTPUT_DIR)/" \
    $(CC) \
    -output-directory=$(OUTPUT_DIR) \
    $(SRC_DIR)/$(NAME).tex
else
endif
	TEXINPUTS="$(SRC_DIR):" \
    TEXMFOUTPUTS="$(OUTPUT_DIR)/" \
    $(CC) \
    -output-directory=$(OUTPUT_DIR) \
    $(SRC_DIR)/$(NAME).tex

zip: fclean $(NAME)
	$(MAKE) clean
	zip -r $(NAME).zip $(OUTPUT_DIR)/* -x *.git*

clean:
	$(RM) $(OUTPUT_DIR)/$(NAME).{out,aux,toc,log,tex.backup,nav,snm,bbl,blg}
	$(RM) $(AUX_FILES)

# $(OUTPUT_DIR) is only removed when the directory is empty (never be the case
# if it's the project root directory).
fclean: clean
	$(RM) $(OUTPUT_DIR)/$(NAME).{pdf,zip,dvi}
	-rmdir $(OUTPUT_DIR)

re: fclean $(NAME)
################################################################################

.PHONY: all $(NAME) zip clean fclean re $(BBL_FILES)
