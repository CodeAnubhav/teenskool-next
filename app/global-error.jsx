"use client";

export default function GlobalError({ error, reset }) {
    return (
        <html>
            <body className="bg-black text-white antialiased">
                <div className="min-h-screen flex items-center justify-center p-6">
                    <div className="text-center max-w-lg">
                        <h1 className="text-4xl font-bold mb-4 text-red-500">Critical System Error</h1>
                        <p className="text-zinc-400 mb-8">
                            A critical error occurred that prevented the application from rendering.
                        </p>
                        <button
                            onClick={() => reset()}
                            className="bg-white text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
                        >
                            Restart Application
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}
