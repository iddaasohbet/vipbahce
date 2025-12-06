"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag, Clock, Share2, Facebook, Twitter, Linkedin, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string | null;
  image_url: string;
  category: string | null;
  author: string | null;
  created_at: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      loadPost(params.id as string);
    }
  }, [params.id]);

  const loadPost = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/${id}`);
      const data = await response.json();
      
      if (data.success && data.post) {
        setPost(data.post);
      } else {
        setError(data.message || "Blog yazısı bulunamadı");
      }
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Yazısı Bulunamadı</h1>
          <p className="text-gray-600 mb-8">{error || "Aradığınız blog yazısı mevcut değil."}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-800 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Ana Sayfaya Dön
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-24 md:pt-28 pb-16">
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-teal-700 transition-colors">
              Ana Sayfa
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/#haberler" className="hover:text-teal-700 transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">
              {post.title}
            </span>
          </nav>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10"
        >
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
            {post.image_url && (
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover"
                priority
                unoptimized={post.image_url.startsWith('http')}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Category Badge */}
            {post.category && (
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-teal-800">
                  {post.category}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-5 w-5 text-teal-600" />
                <span>{formatDate(post.created_at)}</span>
              </div>
              {post.author && (
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="h-5 w-5 text-teal-600" />
                  <span>{post.author}</span>
                </div>
              )}
              {post.category && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Tag className="h-5 w-5 text-teal-600" />
                  <span>{post.category}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-5 w-5 text-teal-600" />
                <span>5 dk okuma</span>
              </div>
            </div>

            {/* Excerpt */}
            <div className="mb-8">
              <p className="text-xl text-gray-700 leading-relaxed font-medium">
                {post.excerpt}
              </p>
            </div>

            {/* Content */}
            {post.content ? (
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-teal-700 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
              />
            ) : (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            )}

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Share2 className="h-5 w-5" />
                  <span className="font-semibold">Bu yazıyı paylaş:</span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-12">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-teal-800 text-teal-800 rounded-lg hover:bg-teal-800 hover:text-white transition-all font-semibold"
              >
                <ArrowLeft className="h-5 w-5" />
                Geri Dön
              </button>
            </div>
          </motion.article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

