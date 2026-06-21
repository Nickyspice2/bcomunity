"use client";

import { PostCard } from "./PostCard";
import type { BikerPost } from "@/lib/types";
import { KA } from "@/lib/i18n/ka";

interface BikerFeedProps {
  posts: BikerPost[];
}

export function BikerFeed({ posts }: BikerFeedProps): React.ReactElement {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-zinc-600">
        <span className="text-4xl mb-3" aria-hidden="true">🏍</span>
        <p className="text-sm">{KA.noPostsYet}</p>
      </div>
    );
  }

  return (
    <section aria-label={KA.feedTitle}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-zinc-100">{KA.feedTitle}</h2>
        <span className="text-xs text-zinc-600">{posts.length} პოსტი</span>
      </div>

      <ol className="flex flex-col gap-4 list-none">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ol>
    </section>
  );
}
