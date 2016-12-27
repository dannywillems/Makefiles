include Makefile.config

################################################################################
############################# Constant variables ###############################
##### Shell
SHELL		= /bin/bash

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
	sed 's/@input{/@input{$(OUTPUT_DIR)\//g' -i $(OUTPUT_DIR)/$(NAME).aux
	BIBINPUTS="$(SRC_DIR)" \
    BSTINPUT="$(SRC_DIR)" \
    TEXMFOUTPUTS="$(OUTPUT_DIR)/" \
    $(CC_BIB) \
    $(OUTPUT_DIR)/$(NAME)
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

.PHONY: all $(NAME) zip clean fclean re
