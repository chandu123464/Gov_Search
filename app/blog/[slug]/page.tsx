import React from "react";
import { notFound } from "next/navigation";
import { BLOG_ARTICLES, getArticle } from "@/lib/blog-data";

export function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ slug: a.slug }));
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  return (
    <article className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
      <a href="/blog" className="text-xs font-bold text-blue-600">
        ← Blog
      </a>
      <span className="inline-block bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
        {article.category}
      </span>
      <h1 className="text-2xl font-black text-slate-900">{article.title}</h1>
      <p className="text-xs text-slate-500">
        {article.date} · {article.readTime}
      </p>
      {article.content.map((para) => (
        <p key={para} className="text-sm text-slate-700 leading-relaxed">
          {para}
        </p>
      ))}
    </article>
  );
}
