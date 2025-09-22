# .github.io

## Development

This project is built from multiple source files located in the `src/` directory. The final, deployable website is generated into the `dist/` directory.

### Prerequisites

You need a Unix-like environment with `bash` to run the build script.

### Building the Website

To build the website, run the following command from the root of the project:

```bash
./build.sh
```

This will:
1.  Create a `dist/` directory if it doesn't exist.
2.  Concatenate all the HTML sections from `src/sections/` into a single `dist/index.html` file.
3.  Copy all necessary CSS and JavaScript assets into the `dist/` directory.

The final, static website will be available in the `dist/` directory. You can open `dist/index.html` in your browser to view the site. For deployment to GitHub Pages, you should deploy the contents of the `dist/` directory.