import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import BlogPost from '@/components/blog/BlogPost';
import { getBlogPostBySlug, UnifiedBlogPost } from '@/services/blogService';
import { blogPosts } from '@/data/blogPosts';
import { Loader2 } from 'lucide-react';

const BlogPostTemplate = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<UnifiedBlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) return;
            setLoading(true);
            try {
                const data = await getBlogPostBySlug(slug);
                setPost(data);
            } catch (err) {
                console.error('Erro ao buscar artigo:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
            </div>
        );
    }

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    // Convert string content to JSX (dangerouslySetInnerHTML is used here for simplicity with the data structure, 
    // but in a real app dealing with user input, we'd sanitize. Since we author the content, it's safeish).
    // Alternatively, we could parse the HTML string to React components if needed.
    const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a');

        if (anchor) {
            const href = anchor.getAttribute('href');
            if (href && href.startsWith('/') && !href.startsWith('//')) {
                e.preventDefault();
                navigate(href);
                window.scrollTo(0, 0);
            }
        }
    };

    const content = (
        <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            onClick={handleContentClick}
            className="blog-content"
        />
    );

    // Usar FAQs do post (banco ou estático) ou FAQ padrão amigável a Moçambique
    const postFaqs = (post.faqs && post.faqs.length > 0) ? post.faqs : [
        {
            question: "Este conteúdo é atualizado e adaptado a Moçambique?",
            answer: "Sim, os nossos artigos são revisados periodicamente para garantir que refletem as práticas de contratação e as exigências do mercado moçambicano."
        },
        {
            question: "Como posso criar meu currículo profissional no formato correto?",
            answer: "Basta aceder à seção de Modelos de CV do MozVita, escolher o modelo ideal para o seu nível de experiência e descarregar em PDF pronto para envio."
        }
    ];

    const related = blogPosts
        .filter(p => p.category === post.category && p.id !== post.id)
        .slice(0, 3)
        .map(p => ({ title: p.title, slug: p.slug }));

    return (
        <BlogPost
            title={post.title}
            metaDescription={post.metaDescription || post.excerpt}
            author={post.author}
            date={post.date}
            readTime={post.readTime}
            category={post.category}
            content={content}
            faqs={postFaqs}
            relatedPosts={related}
            featuredImage={post.image}
            slug={post.slug}
        />
    );
};

export default BlogPostTemplate;
