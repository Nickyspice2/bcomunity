"use client";

import { useState } from "react";
import { Heart, MessageCircle, BadgeCheck } from "lucide-react";
import type { BikerPost } from "@/lib/types";
import { KA } from "@/lib/i18n/ka";
import { timeAgo, cn } from "@/lib/utils";

// ─── Avatar ───────────────────────────────────────────────────────────────────

function UserAvatar({
  name,
  color,
  size = "md",
}: {
  name:  string;
  color: string;
  size?: "sm" | "md" | "lg";
}): React.ReactElement {
  const sizeMap = { sm: "h-7 w-7 text-xs", md: "h-9 w-9 text-sm", lg: "h-11 w-11 text-base" };
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-bold text-zinc-900",
        sizeMap[size]
      )}
      style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}
      aria-hidden="true"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

// ─── Motorcycle badge ─────────────────────────────────────────────────────────

function MotoBadge({ model }: { model: string }): React.ReactElement {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[11px] font-medium text-amber-400">
      🏍 {model}
    </span>
  );
}

// ─── Action button ────────────────────────────────────────────────────────────

function ActionBtn({
  icon,
  label,
  count,
  active = false,
  onClick,
}: {
  icon:     React.ReactNode;
  label:    string;
  count?:   number;
  active?:  boolean;
  onClick?: () => void;
}): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium",
        "transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40",
        active
          ? "text-red-400 bg-red-400/10"
          : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.05]"
      )}
    >
      {icon}
      {count !== undefined && <span>{count}</span>}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

// ─── Post card ────────────────────────────────────────────────────────────────

interface PostCardProps {
  post: BikerPost;
}

export function PostCard({ post }: PostCardProps): React.ReactElement {
  const [liked,     setLiked]     = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  const handleLike = () => {
    setLiked((v) => !v);
    setLikeCount((v) => (liked ? v - 1 : v + 1));
  };

  return (
    <article
      className={cn(
        "rounded-2xl border border-[var(--color-surface-border)]",
        "bg-[var(--color-surface-card)] p-5",
        "transition-all duration-200 hover:border-zinc-700/60"
      )}
    >
      {/* ── Header ── */}
      <header className="flex items-start gap-3 mb-3.5">
        <UserAvatar name={post.author.name} color={post.author.avatarColor} />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-sm font-semibold text-zinc-100">
              {post.author.name}
            </span>
            {post.author.isVerified && (
              <BadgeCheck size={14} className="text-amber-400 shrink-0" />
            )}
            <span className="text-[11px] text-zinc-600 ml-auto">
              {timeAgo(post.createdAt)}
            </span>
          </div>
          <div className="mt-1">
            <MotoBadge model={post.author.motorcycleModel} />
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <p className="text-sm leading-relaxed text-zinc-300 mb-4">
        {post.content}
      </p>

      {/* ── Tags ── */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-zinc-600 hover:text-zinc-400 cursor-pointer transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* ── Actions ── */}
      <footer className="flex items-center gap-1 pt-2 border-t border-[var(--color-surface-border)]">
        <ActionBtn
          icon={<Heart size={14} fill={liked ? "currentColor" : "none"} />}
          label={KA.likeAction}
          count={likeCount}
          active={liked}
          onClick={handleLike}
        />
        <ActionBtn
          icon={<MessageCircle size={14} />}
          label={KA.commentAction}
          count={post.commentCount}
        />

      </footer>
    </article>
  );
}
