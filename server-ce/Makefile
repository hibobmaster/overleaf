# Makefile

export SHARELATEX_BASE_TAG := sharelatex-base:v4.1.1
export SHARELATEX_TAG := sharelatex:v4.1.1
export MONOREPO_REVISION := $(shell git rev-parse HEAD)
MONOREPO_ROOT := ../

all: build-base build-community

build-base:
	cp .dockerignore $(MONOREPO_ROOT)
	docker build -f Dockerfile-base -t $(SHARELATEX_BASE_TAG) $(MONOREPO_ROOT)


build-community:
	cp .dockerignore $(MONOREPO_ROOT)
	docker build --build-arg SHARELATEX_BASE_TAG --build-arg MONOREPO_REVISION -f Dockerfile -t $(SHARELATEX_TAG) $(MONOREPO_ROOT)


.PHONY: all build-base build-community
