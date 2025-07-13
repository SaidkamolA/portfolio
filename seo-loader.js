// SEO Loader - Dynamically loads SEO meta tags
(function() {
    'use strict';
    
    // SEO Meta Tags Configuration
    const seoConfig = {
        title: "Saidkamolxon - Senior Full-Stack Developer & AI Enthusiast | Портфолио",
        description: "Saidkamolxon - эксперт веб-разработки с 2+ лет опыта. Создаю сайты, приложения, Telegram боты и AI решения. Python, React, Django, FastAPI разработка.",
        keywords: "веб-разработчик, портфолио, React, Django, Python, FastAPI, Telegram Bot, мобильные приложения, AI разработка, Full-Stack разработчик, Узбекистан",
        author: "Saidkamolxon Agzamov",
        canonical: "https://gulqand.uz",
        ogImage: "https://gulqand.uz/me3.jpg",
        twitterImage: "https://gulqand.uz/me3.jpg"
    };

    // Function to create meta tag
    function createMetaTag(name, content, property = null) {
        const meta = document.createElement('meta');
        if (property) {
            meta.setAttribute('property', property);
        } else {
            meta.setAttribute('name', name);
        }
        meta.setAttribute('content', content);
        return meta;
    }

    // Function to create link tag
    function createLinkTag(rel, href, type = null, sizes = null) {
        const link = document.createElement('link');
        link.setAttribute('rel', rel);
        link.setAttribute('href', href);
        if (type) link.setAttribute('type', type);
        if (sizes) link.setAttribute('sizes', sizes);
        return link;
    }

    // Function to create script tag
    function createScriptTag(content) {
        const script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.textContent = content;
        return script;
    }

    // Initialize SEO
    function initSEO() {
        const head = document.head;
        
        // Update title
        document.title = seoConfig.title;
        
        // Add meta tags
        const metaTags = [
            createMetaTag('description', seoConfig.description),
            createMetaTag('keywords', seoConfig.keywords),
            createMetaTag('author', seoConfig.author),
            createMetaTag('robots', 'index, follow'),
            createMetaTag('language', 'Russian'),
            createMetaTag('revisit-after', '7 days'),
            createMetaTag('distribution', 'global'),
            createMetaTag('rating', 'general'),
            createMetaTag('theme-color', '#6366f1'),
            createMetaTag('msapplication-TileColor', '#6366f1'),
            createMetaTag('apple-mobile-web-app-capable', 'yes'),
            createMetaTag('apple-mobile-web-app-status-bar-style', 'default'),
            createMetaTag('apple-mobile-web-app-title', 'Saidkamolxon Portfolio'),
            
            // Open Graph
            createMetaTag('og:type', 'website', 'property'),
            createMetaTag('og:url', seoConfig.canonical, 'property'),
            createMetaTag('og:title', seoConfig.title, 'property'),
            createMetaTag('og:description', seoConfig.description, 'property'),
            createMetaTag('og:image', seoConfig.ogImage, 'property'),
            createMetaTag('og:image:width', '1200', 'property'),
            createMetaTag('og:image:height', '630', 'property'),
            createMetaTag('og:locale', 'ru_RU', 'property'),
            createMetaTag('og:site_name', 'Saidkamolxon Portfolio', 'property'),
            
            // Twitter
            createMetaTag('twitter:card', 'summary_large_image', 'property'),
            createMetaTag('twitter:url', seoConfig.canonical, 'property'),
            createMetaTag('twitter:title', seoConfig.title, 'property'),
            createMetaTag('twitter:description', seoConfig.description, 'property'),
            createMetaTag('twitter:image', seoConfig.twitterImage, 'property')
        ];

        // Add link tags
        const linkTags = [
            createLinkTag('canonical', seoConfig.canonical),
            createLinkTag('sitemap', 'https://gulqand.uz/sitemap.xml', 'application/xml'),
            createLinkTag('icon', 'favicon.svg', 'image/svg+xml'),
            createLinkTag('icon', 'favicon.ico', 'image/x-icon'),
            createLinkTag('apple-touch-icon', 'favicon.svg', null, '180x180'),
            createLinkTag('icon', 'favicon.svg', 'image/png', '32x32'),
            createLinkTag('icon', 'favicon.svg', 'image/png', '16x16'),
            createLinkTag('preconnect', 'https://fonts.googleapis.com'),
            createLinkTag('preconnect', 'https://fonts.gstatic.com', null, null, 'crossorigin'),
            createLinkTag('preconnect', 'https://cdnjs.cloudflare.com'),
            createLinkTag('preconnect', 'https://images.unsplash.com'),
            createLinkTag('dns-prefetch', '//fonts.googleapis.com'),
            createLinkTag('dns-prefetch', '//cdnjs.cloudflare.com'),
            createLinkTag('dns-prefetch', '//images.unsplash.com')
        ];

        // Add structured data
        const structuredData = [
            {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Saidkamolxon Agzamov",
                "jobTitle": "Senior Full-Stack Developer & AI Enthusiast",
                "description": "Создаю инновационные веб-приложения, мобильные приложения и AI решения с использованием современных технологий",
                "url": "https://gulqand.uz",
                "image": "https://gulqand.uz/me3.jpg",
                "sameAs": [
                    "https://github.com/saidkamolxon",
                    "https://linkedin.com/in/saidkamolxon",
                    "https://t.me/saidkamolxon",
                    "https://instagram.com/saidkamolxon"
                ],
                "worksFor": {
                    "@type": "Organization",
                    "name": "INHA UNIVERSITY"
                },
                "alumniOf": {
                    "@type": "Organization",
                    "name": "ITSTEP ACADEMY"
                },
                "knowsAbout": [
                    "Python", "React", "Django", "FastAPI", "Telegram Bot API", 
                    "JavaScript", "HTML", "CSS", "SQL", "Docker", "AI Development"
                ],
                "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "UZ",
                    "addressLocality": "Uzbekistan"
                },
                "email": "saidkamolagzamov7@gmail.com",
                "telephone": "+998950013716"
            },
            {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Saidkamolxon Portfolio",
                "url": "https://gulqand.uz",
                "logo": "https://gulqand.uz/favicon.svg",
                "description": "Full-Stack разработчик с 2+ летним опытом. Специализируюсь на Python разработке, создании Telegram ботов и веб-приложений",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+998950013716",
                    "contactType": "customer service",
                    "availableLanguage": ["Russian", "English", "Uzbek"]
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Saidkamolxon Portfolio",
                "url": "https://gulqand.uz",
                "description": "Портфолио Saidkamolxon - Senior Full-Stack Developer & AI Enthusiast",
                "author": {
                    "@type": "Person",
                    "name": "Saidkamolxon Agzamov"
                },
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://gulqand.uz/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Веб-разработка и AI решения",
                "provider": {
                    "@type": "Person",
                    "name": "Saidkamolxon Agzamov"
                },
                "description": "Создание веб-приложений, мобильных приложений, Telegram ботов и AI решений",
                "areaServed": "Worldwide",
                "serviceType": "Web Development",
                "offers": {
                    "@type": "Offer",
                    "price": "1000",
                    "priceCurrency": "USD",
                    "description": "Веб-разработка от $1,000"
                }
            }
        ];

        // Append all meta tags
        metaTags.forEach(tag => head.appendChild(tag));
        
        // Append all link tags
        linkTags.forEach(tag => head.appendChild(tag));
        
        // Append structured data
        structuredData.forEach(data => {
            const script = createScriptTag(JSON.stringify(data, null, 2));
            head.appendChild(script);
        });

        console.log('SEO meta tags loaded successfully');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSEO);
    } else {
        initSEO();
    }

})(); 