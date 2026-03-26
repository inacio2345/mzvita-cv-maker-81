import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    if (location.pathname === '/' || pathnames.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className="flex mb-4">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li>
                    <Link to="/" className="hover:text-google-blue flex items-center">
                        <Home className="w-4 h-4 mr-1" />
                        <span>Início</span>
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const label = value
                        .replace(/-/g, ' ')
                        .replace(/\b\w/g, (l) => l.toUpperCase());

                    return (
                        <li key={to} className="flex items-center">
                            <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
                            {last ? (
                                <span className="font-medium text-gray-900 truncate max-w-[200px]" aria-current="page">
                                    {label}
                                </span>
                            ) : (
                                <Link to={to} className="hover:text-google-blue truncate max-w-[200px]">
                                    {label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
            {/* Breadcrumb Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": pathnames.map((value, index) => ({
                        "@type": "ListItem",
                        "position": index + 2,
                        "name": value.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
                        "item": `https://www.mozvita.online/${pathnames.slice(0, index + 1).join('/')}`
                    })).concat([{
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Início",
                        "item": "https://www.mozvita.online/"
                    }]).sort((a, b) => a.position - b.position)
                })}
            </script>
        </nav>
    );
};

export default Breadcrumbs;
