export default function TypographyTest() {
    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Heading 1 - ALTIPLANO</h1>
            <h2>Heading 2 - What is Altiplano?</h2>
            <h3>Heading 3 - Completely Private</h3>
            <h4>Heading 4 - Requirements</h4>
            <p>Body text - Altiplano is a local-first search engine that searches through an AI model's training knowledge.</p>
            <p className="large-text">Large text - This is a tagline or important callout.</p>
            
            {/* Color test */}
            <div style={{ marginTop: '2rem' }}>
                <h3>Color Palette Test</h3>
                <div style={{ color: '#3D2817', marginBottom: '0.5rem' }}>■ Dark Brown (#3D2817)</div>
                <div style={{ color: '#5C4033', marginBottom: '0.5rem' }}>■ Mid Brown (#5C4033)</div>
                <div style={{ color: '#E67E22', marginBottom: '0.5rem' }}>■ Orange (#E67E22)</div>
                <div style={{ color: '#F5E6D3', background: '#3D2817', padding: '0.5rem', marginBottom: '0.5rem' }}>
                    ■ Cream on Brown (#F5E6D3)
                </div>
            </div>

            {/* Typography scale test */}
            <div style={{ marginTop: '2rem' }}>
                <h3>Typography Scale</h3>
                <div style={{ fontSize: '4rem', fontWeight: 800, letterSpacing: '-1px', lineHeight: '1.1', color: '#3D2817', marginBottom: '1rem' }}>
                    Hero Title (4rem)
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.5px', lineHeight: '1.2', color: '#3D2817', marginBottom: '1rem' }}>
                    Section Title (2.5rem)
                </div>
                <div style={{ fontSize: '1.25rem', lineHeight: '1.6', color: '#5C4033', marginBottom: '1rem' }}>
                    Tagline Text (1.25rem)
                </div>
                <div style={{ fontSize: '1rem', lineHeight: '1.8', color: '#5C4033' }}>
                    Body Text (1rem)
                </div>
            </div>

            {/* Font weight test */}
            <div style={{ marginTop: '2rem' }}>
                <h3>Font Weights</h3>
                <div style={{ fontWeight: 400, marginBottom: '0.5rem' }}>Regular (400)</div>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Semi-bold (600)</div>
                <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Bold (700)</div>
                <div style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Extra-bold (800)</div>
            </div>

            {/* Line height test */}
            <div style={{ marginTop: '2rem' }}>
                <h3>Line Heights</h3>
                <div style={{ lineHeight: '1.1', marginBottom: '1rem' }}>
                    Tight (1.1) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <div style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
                    Normal (1.6) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <div style={{ lineHeight: '1.8' }}>
                    Loose (1.8) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
            </div>
        </div>
    )
}
