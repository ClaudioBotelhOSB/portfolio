/**
 * Fetches all HTML section files and injects them into the main content area.
 * This function maintains the original structure where the hero section is separate
 * and the rest of the sections are inside a dark wrapper div.
 */
export async function loadSections() {
    const mainContainer = document.getElementById('main-content');
    if (!mainContainer) {
        console.error('Main content container with id="main-content" not found.');
        return;
    }

    const sectionFiles = [
        'home.html',
        'philosophy.html',
        'methodology.html',
        'toolbox.html',
        'projects.html',
        'articles.html',
        'testimonials.html',
        'contact.html'
    ];

    try {
        // Fetch all section HTML content in parallel for performance
        const responses = await Promise.all(
            sectionFiles.map(file => fetch(`sections/${file}`).then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch sections/${file}: ${res.statusText}`);
                }
                return res.text();
            }))
        );

        // The first section is the hero
        const heroHtml = responses.shift();

        // The rest of the sections are joined and placed inside the wrapper
        const otherHtml = responses.join('');

        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = 'bg-black relative z-20';
        wrapperDiv.innerHTML = otherHtml;

        // Clear any existing content and append the new structure
        mainContainer.innerHTML = '';

        // Create a temporary div to parse the hero HTML
        const heroTempDiv = document.createElement('div');
        heroTempDiv.innerHTML = heroHtml;
        // Append child nodes of the temp div to the main container
        while (heroTempDiv.firstChild) {
            mainContainer.appendChild(heroTempDiv.firstChild);
        }

        mainContainer.appendChild(wrapperDiv);

    } catch (error) {
        console.error('Error loading sections:', error);
        mainContainer.innerHTML = '<p class="text-center text-red-500">Failed to load page content. Please try again later.</p>';
    }
}
