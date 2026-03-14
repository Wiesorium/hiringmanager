import { ArrowLeft, ArrowRight, Clock, ExternalLink, Tag } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { blogPosts, type BlogSection } from '../data/blogPosts';
import { useEffect } from 'react';

/** Split a string on https:// URLs and render links inline */
function renderWithLinks(text: string) {
    const urlRegex = /(https?:\/\/[^\s,)]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
        if (urlRegex.test(part)) {
            urlRegex.lastIndex = 0; // reset regex state
            return (
                <a
                    key={i}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-highlight font-medium underline underline-offset-2 hover:text-highlight/80 transition-colors break-all"
                >
                    {part.replace(/^https?:\/\//, '')} <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
            );
        }
        return <span key={i}>{part}</span>;
    });
}

function renderSection(section: BlogSection, index: number) {
    switch (section.type) {
        case 'heading':
            return (
                <h2 key={index} className="text-2xl font-serif font-bold text-ink mt-12 mb-4 leading-snug">
                    {section.text}
                </h2>
            );
        case 'subheading':
            return (
                <h3 key={index} className="text-lg font-bold text-ink mt-8 mb-3">
                    {section.text}
                </h3>
            );
        case 'paragraph':
            return (
                <p key={index} className="text-ink/80 leading-relaxed mb-4 text-[17px]">
                    {section.text}
                </p>
            );
        case 'list':
            return (
                <ul key={index} className="space-y-2 mb-6 pl-0">
                    {section.items?.map((item, i) => (
                        <li key={i} className="text-ink/80 leading-relaxed text-[17px] bg-stone-50 border border-stone-100 rounded-lg px-4 py-3">
                            {renderWithLinks(item)}
                        </li>
                    ))}
                </ul>
            );
        case 'numbered-list':
            return (
                <ol key={index} className="space-y-4 mb-6 list-none pl-0">
                    {section.items?.map((item, i) => (
                        <li key={i} className="flex gap-4 text-[17px] text-ink/80 leading-relaxed">
                            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-highlight/10 text-highlight text-sm font-bold flex items-center justify-center mt-0.5">
                                {i + 1}
                            </span>
                            <span>{renderWithLinks(item)}</span>
                        </li>
                    ))}
                </ol>
            );
        case 'callout':
            return (
                <div key={index} className="my-8 bg-highlight/5 border-l-4 border-highlight rounded-r-xl px-6 py-5">
                    <p className="text-ink font-medium leading-relaxed text-[17px] italic">
                        {section.text}
                    </p>
                </div>
            );
        case 'divider':
            return (
                <div key={index} className="my-12 flex items-center gap-4">
                    <div className="flex-1 h-px bg-stone-200" />
                    <div className="w-2 h-2 rounded-full bg-highlight" />
                    <div className="flex-1 h-px bg-stone-200" />
                </div>
            );
        default:
            return null;
    }
}


function OtherPostCard({ slug, title, category, onNavigate }: { slug: string; title: string; category: string; onNavigate: (slug: string) => void }) {
    return (
        <button
            onClick={() => onNavigate(slug)}
            className="w-full text-left bg-white border border-stone-100 hover:border-highlight/40 rounded-xl p-5 transition-all group"
        >
            <span className="text-xs text-highlight font-bold">{category}</span>
            <p className="font-serif font-bold text-ink group-hover:text-highlight transition-colors mt-1">{title}</p>
            <p className="text-xs text-muted mt-1 flex items-center gap-1">Artikel lesen <ArrowRight className="w-3 h-3" /></p>
        </button>
    );
}

export function BlogPostPage() {
    const { setGameState, setActiveBlogSlug, activeBlogSlug } = useGame();

    const post = blogPosts.find(p => p.slug === activeBlogSlug) ?? blogPosts[0];

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `${post.title} | Hiring Manager Simulator`;
        let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = 'description';
            document.head.appendChild(meta);
        }
        meta.content = post.metaDescription;
    }, [post]);

    const navigateToPost = (slug: string) => {
        setActiveBlogSlug(slug);
        setGameState('blog_post' as any);
        window.scrollTo(0, 0);
    };

    return (
        <div className="min-h-screen bg-paper flex flex-col font-sans text-ink">
            {/* Top bar */}
            <header className="sticky top-0 z-50 w-full bg-white border-b border-stone-100 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
                    <button
                        onClick={() => setGameState('blog' as any)}
                        className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Alle Artikel</span>
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

            <main className="flex-grow w-full px-6 py-12">
                {/* Article header */}
                <div className="max-w-2xl mx-auto mb-10">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="px-2.5 py-0.5 bg-highlight/10 text-highlight text-xs font-bold rounded-full flex items-center gap-1">
                            <Tag className="w-3 h-3" /> {post.category}
                        </span>
                        <span className="text-xs text-muted flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {post.readingTime}
                        </span>
                        <span className="text-xs text-muted">{post.date}</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-ink leading-tight mb-4">
                        {post.title}
                    </h1>
                    <p className="text-muted text-lg leading-relaxed">
                        {post.subtitle}
                    </p>

                    <div className="mt-8 h-px bg-stone-200" />
                </div>

                {/* Article body */}
                <article className="max-w-2xl mx-auto">
                    {post.content.map((section, i) => renderSection(section, i))}
                </article>

                {/* CTA at bottom */}
                <div className="max-w-2xl mx-auto mt-16 bg-highlight/5 border border-highlight/20 rounded-2xl p-8 text-center">
                    <h2 className="text-xl font-serif font-bold text-ink mb-3">
                        Erlebe Recruiting von innen
                    </h2>
                    <p className="text-muted mb-6 text-sm leading-relaxed max-w-lg mx-auto">
                        Setze das Gelesene in die Praxis um. Der Hiring Manager Simulator gibt erfahrenen Berufstätigen direkte Erfahrung mit den Entscheidungen, die darüber bestimmen, wer eingestellt wird.
                    </p>
                    <button
                        onClick={() => setGameState('applicant_intro')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-highlight text-white rounded-lg font-bold text-sm hover:bg-highlight/90 transition-all shadow-md hover:shadow-lg"
                    >
                        Simulator kostenlos testen <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Other articles */}
                <div className="max-w-2xl mx-auto mt-12">
                    <h3 className="font-bold text-ink mb-4">Weitere Artikel</h3>
                    <div className="space-y-3">
                        {blogPosts.filter(p => p.slug !== post.slug).map(other => (
                            <OtherPostCard
                                key={other.slug}
                                slug={other.slug}
                                title={other.title}
                                category={other.category}
                                onNavigate={navigateToPost}
                            />
                        ))}
                    </div>
                </div>
            </main>

            <footer className="border-t border-stone-100 py-8 px-6 text-center text-xs text-muted mt-8">
                <p>© {new Date().getFullYear()} Hiring Manager Simulator. Alle Rechte vorbehalten.</p>
            </footer>
        </div>
    );
}
