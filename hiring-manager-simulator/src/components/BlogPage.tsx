import { ArrowLeft, ArrowRight, Clock, Tag } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { blogPosts } from '../data/blogPosts';
import { useEffect } from 'react';

export function BlogPage() {
    const { setGameState, setActiveBlogSlug } = useGame();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Blog – Bewerbungstipps & Strategien | Hiring Manager Simulator';
    }, []);

    return (
        <div className="min-h-screen bg-paper flex flex-col font-sans text-ink">
            {/* Top bar */}
            <header className="sticky top-0 z-50 w-full bg-white border-b border-stone-100 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
                    <button
                        onClick={() => setGameState('b2c_home')}
                        className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Zurück zur Startseite</span>
                    </button>
                    <div className="flex-1 flex justify-center">
                        <button onClick={() => setGameState('b2c_home')} className="flex items-center gap-0 text-lg font-bold">
                            <span className="text-ink">Hiring</span>
                            <span className="text-highlight font-extrabold">Simulator</span>
                        </button>
                    </div>
                    <div className="w-24 sm:w-32" />
                </div>
            </header>

            <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-16">
                {/* Page header */}
                <div className="mb-14">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-highlight/10 text-highlight rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                        <Tag className="w-3 h-3" /> Blog
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink mb-4 leading-tight">
                        Bewerbungstipps & Strategien
                    </h1>
                    <p className="text-muted text-lg max-w-2xl leading-relaxed">
                        Praxisnahe Leitfäden für erfahrene Berufstätige, die kompetitive Bewerbungsprozesse meistern wollen — aus der Perspektive beider Seiten des Tisches.
                    </p>
                </div>

                {/* Blog post cards */}
                <div className="space-y-8">
                    {blogPosts.map((post) => (
                        <article
                            key={post.slug}
                            className="group bg-white rounded-2xl border border-stone-100 hover:border-highlight/40 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                            onClick={() => {
                                setActiveBlogSlug(post.slug);
                                setGameState('blog_post' as any);
                            }}
                        >
                            <div className="p-8">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <span className="px-2.5 py-0.5 bg-highlight/10 text-highlight text-xs font-bold rounded-full">
                                        {post.category}
                                    </span>
                                    <span className="text-xs text-muted flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {post.readingTime}
                                    </span>
                                    <span className="text-xs text-muted">{post.date}</span>
                                </div>

                                <h2 className="text-2xl font-serif font-bold text-ink mb-3 group-hover:text-highlight transition-colors leading-snug">
                                    {post.title}
                                </h2>
                                <p className="text-muted leading-relaxed mb-6">
                                    {post.subtitle}
                                </p>

                                <div className="flex items-center text-sm font-semibold text-highlight gap-1.5">
                                    Artikel lesen <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* CTA section */}
                <div className="mt-16 bg-highlight/5 border border-highlight/20 rounded-2xl p-8 text-center">
                    <h2 className="text-xl font-serif font-bold text-ink mb-3">
                        Erlebe die andere Seite des Bewerbungstisches
                    </h2>
                    <p className="text-muted mb-6 max-w-xl mx-auto text-sm leading-relaxed">
                        Bewerbungsstrategien zu lesen ist eine Sache. Den Entscheidungsprozess aus der Perspektive der Personalverantwortlichen zu erleben verändert, wie du dich bewirbt.
                    </p>
                    <button
                        onClick={() => setGameState('applicant_intro')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-highlight text-white rounded-lg font-bold text-sm hover:bg-highlight/90 transition-all shadow-md hover:shadow-lg"
                    >
                        Simulator kostenlos testen <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </main>

            <footer className="border-t border-stone-100 py-8 px-6 text-center text-xs text-muted">
                <p>© {new Date().getFullYear()} Hiring Manager Simulator. Alle Rechte vorbehalten.</p>
            </footer>
        </div>
    );
}
