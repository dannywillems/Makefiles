################################################################################
############################ Variables to change ###############################

##### Executable name
NAME		=

##### Source files
SOURCES		=

##### Libraries
LIBS		=
# Examples of libraries. Just add $(LIBRARY_NAME) in the LIBS variables
GRAPHICS	= graphics.cma -cclib -lGraphics
################################################################################

################################################################################
############################ Constant variables ################################

##### Compilers
CAMLC		= ocaml
CAMLOPT		= ocamlopt
CAMLDEP		= ocamldep

################################################################################

################################################################################
################################## Rules #######################################

all: depend $(NAME)

$(NAME): opt byt
	ln -s $(NAME).byt $(NAME)

opt: $(NAME).opt
byt: $(NAME).byt

OBJS		= $(SOURCES:.ml=.cmo)
OPTOBJS		= $(SOURCES:.ml=.cmx)

$(NAME).byt: $(OBJS)
	$(CAMLC) -o $(NAME).byt $(LIBS) $(OBJS)

$(NAME).opt: $(OPTOBJS)
	$(CAMLOPT) -o $(NAME).opt $(LIBS:.cma=.cmxa) $(OPTOBJS)

##### Rules for compilation
.SUFFIXES:
.SUFFIXES: .ml .mli .cmo .cmi .cmx

.ml.cmo:
	$(CAMLC) -c $<
.mli.cmi:
	$(CAMLC) -c $<
.ml.cmx:
	$(CAMLOPT) -c $<

##### Rules for clean
clean:
	rm -f *.cm[iox] *~ .*~
	rm -f $(NAME).o

fclean: clean
	rm -f $(NAME)
	rm -f $(NAME).byt
	rm -f $(NAME).opt

depend: .depend
	$(CAMLDEP) $(SOURCES) > .depend

re: fclean all
################################################################################
