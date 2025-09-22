#!/bin/bash

# Exit on error
set -e

# Create the dist directory if it doesn't exist
echo "Creating dist directory..."
mkdir -p dist/css dist/js dist/images

# I will use a heredoc to create the index.html file.
# This is cleaner than using sed or grep.

echo "Building index.html..."
cat > dist/index.html << EOL
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfólio | Claudio Botelho - Senior DevSecOps & SRE Engineer</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <main>
EOL

cat src/sections/home.html >> dist/index.html
cat src/sections/metodologia.html >> dist/index.html
cat src/sections/toolbox.html >> dist/index.html
cat src/sections/about_us.html >> dist/index.html
cat src/sections/process.html >> dist/index.html
cat src/sections/projects.html >> dist/index.html
cat src/sections/articles.html >> dist/index.html
cat src/sections/testimonials.html >> dist/index.html

# Also need to add the modal overlay back in
cat >> dist/index.html << EOL
        <!-- Modals and Overlays -->
        <div id="article-viewer-overlay"></div>
        <div id="article-viewer-card" class="article-viewer-card">
            <div class="p-8 max-h-[90vh] overflow-y-auto">
                <div class="article-viewer-content">
                    <h3 id="article-modal-title" class="text-3xl font-bold mb-4"></h3>
                    <p id="article-modal-category" class="font-semibold uppercase tracking-wider text-sm mb-6"></p>
                    <div id="article-modal-content" class="text-gray-300 space-y-4 prose prose-invert prose-lg max-w-none"></div>
                </div>
                <button id="close-article-modal" class="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
            </div>
        </div>
    </main>

    <!-- JS will be linked here -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
    <script src="js/data.js"></script>
    <script src="js/home.js"></script>
    <script src="js/metodologia.js"></script>
    <script src="js/toolbox.js"></script>
    <script src="js/about_us.js"></script>
    <script src="js/process.js"></script>
    <script src="js/projects.js"></script>
    <script src="js/articles.js"></script>
    <script src="js/testimonials.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
EOL

echo "Copying assets..."
cp src/css/main.css dist/css/
cp src/js/*.js dist/js/

echo "Build complete! The final output is in the dist/ directory."
