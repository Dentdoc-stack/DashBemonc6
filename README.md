# DashBemonc6

This repository contains the Flood project as a git submodule.

## Submodules

### Flood
- **Path**: `Flood/`
- **Repository**: https://github.com/Dentdoc-stack/Flood.git
- **Description**: Next.js application

## Getting Started

To clone this repository with its submodules:

```bash
git clone --recurse-submodules https://github.com/Dentdoc-stack/DashBemonc6.git
```

If you've already cloned the repository without submodules, initialize them with:

```bash
git submodule update --init --recursive
```

## Updating Submodules

To update the Flood submodule to the latest version:

```bash
git submodule update --remote Flood
```