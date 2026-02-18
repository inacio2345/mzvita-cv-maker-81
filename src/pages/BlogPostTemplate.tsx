import React from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import BlogPost from '@/components/blog/BlogPost';
import { blogPosts } from '@/data/blogPosts';

const BlogPostTemplate = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const post = blogPosts.find(p => p.slug === slug);

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

    // Mock FAQs and Related posts for now - in a full implementation these could also be in the data
    const faqs = [
        {
            question: "Este conteúdo é atualizado?",
            answer: "Sim, revisamos nossos artigos periodicamente para garantir que refletem o mercado moçambicano atual."
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
            faqs={faqs}
            relatedPosts={related}
            featuredImage={post.image}
            slug={post.slug}
        />
    );
};

export default BlogPostTemplate;
