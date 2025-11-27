import { ImageResponse } from 'next/og';
import { siteConfig } from '@/data/siteConfig';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // Get title and description from query params
        // Default to site config if not provided
        const title = searchParams.get('title') || siteConfig.name;
        const description = searchParams.get('description') || siteConfig.description;

        // Truncate description if too long
        const truncatedDescription = description.length > 160
            ? description.slice(0, 160) + '...'
            : description;

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#0B1121', // Dark background matching site theme
                        backgroundImage: 'radial-gradient(circle at 25% 25%, #1e293b 0%, #0B1121 50%)',
                        color: 'white',
                        fontFamily: 'sans-serif',
                        padding: '40px 80px',
                        position: 'relative',
                    }}
                >
                    {/* Decorative elements */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '10px',
                            background: 'linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%)',
                        }}
                    />

                    {/* Logo / Brand Name */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '40px',
                        }}
                    >
                        {/* Using text for now to avoid external image loading issues in edge, 
                but could load the logo image if needed */}
                        <div
                            style={{
                                fontSize: 32,
                                fontWeight: 'bold',
                                color: '#06b6d4', // Cyan brand color
                                letterSpacing: '-0.02em',
                            }}
                        >
                            {siteConfig.shortName}
                        </div>
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <div
                            style={{
                                fontSize: 64,
                                fontWeight: 800,
                                lineHeight: 1.1,
                                marginBottom: '20px',
                                background: 'linear-gradient(to bottom right, #ffffff, #94a3b8)',
                                backgroundClip: 'text',
                                color: 'transparent',
                                paddingBottom: '10px', // Prevent clipping of descenders
                            }}
                        >
                            {title}
                        </div>

                        {/* Description */}
                        <div
                            style={{
                                fontSize: 30,
                                color: '#94a3b8',
                                lineHeight: 1.4,
                                maxWidth: '80%',
                                textAlign: 'center',
                            }}
                        >
                            {truncatedDescription}
                        </div>
                    </div>

                    {/* Footer / URL */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 40,
                            fontSize: 24,
                            color: '#475569',
                            fontWeight: 600,
                        }}
                    >
                        lykkreacji.pl
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
