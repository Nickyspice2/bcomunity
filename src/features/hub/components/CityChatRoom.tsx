"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Send, LogIn } from "lucide-react";
import type { ChatMessage, CityRoom } from "@/lib/types";
import { useAuth }  from "@/features/auth/context/AuthContext";
import { KA }       from "@/lib/i18n/ka";
import { timeAgo, cn } from "@/lib/utils";

// ─── Single message bubble ────────────────────────────────────────────────────

function MessageBubble({ msg }: { msg: ChatMessage }): React.ReactElement {
  return (
    <div className="flex items-start gap-2.5 py-2.5 border-b border-zinc-800/40 last:border-0">
      {/* Avatar */}
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-zinc-900 mt-0.5"
        style={{ background: `linear-gradient(135deg, ${msg.author.avatarColor}, ${msg.author.avatarColor}99)` }}
        aria-hidden="true"
      >
        {msg.author.name.charAt(0).toUpperCase()}
      </span>

      <div className="min-w-0 flex-1">
        {/* Author row */}
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          <span className="text-xs font-semibold text-zinc-200">
            {msg.author.name}
          </span>
          <span className="text-[10px] text-amber-500/70 truncate">
            🏍 {msg.author.motorcycleModel}
          </span>
          <span className="text-[10px] text-zinc-600 ml-auto shrink-0">
            {timeAgo(msg.createdAt)}
          </span>
        </div>

        {/* Message text */}
        <p className="text-xs text-zinc-300 leading-relaxed">{msg.content}</p>
      </div>
    </div>
  );
}

// ─── Chat room ────────────────────────────────────────────────────────────────

interface CityChatRoomProps {
  room: CityRoom;
}

export function CityChatRoom({ room }: CityChatRoomProps): React.ReactElement {
  const { user, isAuthenticated, openModal } = useAuth();
  const [messages,  setMessages]  = useState<ChatMessage[]>(room.messages);
  const [inputText, setInputText] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    const text = inputText.trim();
    if (!text || !user) return;

    const newMsg: ChatMessage = {
      id:        `local-${Date.now()}`,
      author:    {
        id:              user.id,
        name:            user.name,
        username:        user.email.split("@")[0] ?? user.name,
        motorcycleModel: user.motorcycleModel || "—",
        avatarColor:     user.avatarColor,
        isVerified:      false,
        followersCount:  0,
        rideCount:       0,
      },
      content:   text,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
  };

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-md overflow-hidden",
        "h-full min-h-[380px]"
      )}
      aria-label={`${room.city} ჩატი`}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/60 shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-zinc-100">{room.city}</h3>
          {/* Pulsing live indicator */}
          <span className="flex items-center gap-1 rounded-full bg-green-500/12 border border-green-500/22 px-1.5 py-0.5">
            <span
              className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse-live"
              aria-hidden="true"
            />
            <span className="text-[10px] font-semibold text-green-400">{KA.liveLabel}</span>
          </span>
        </div>
        <span className="text-[11px] text-zinc-600">{messages.length} შეტ.</span>
      </div>

      {/* ── Message list (scrollable) ── */}
      <div
        ref={listRef}
        className="flex-1 overflow-y-auto px-4"
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
      </div>

      {/* ── Input ── */}
      <div className="shrink-0 border-t border-zinc-800/60 px-3 py-3">
        {isAuthenticated ? (
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={KA.chatPlaceholder}
              className={cn(
                "flex-1 h-8 rounded-xl bg-zinc-800/70 border border-zinc-700/60",
                "px-3 text-xs text-zinc-200 placeholder:text-zinc-600",
                "focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20",
                "transition-all duration-150"
              )}
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              aria-label={KA.chatSendBtn}
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
                "bg-amber-500 text-zinc-900",
                "hover:bg-amber-400 active:scale-95 transition-all duration-150",
                "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-amber-500",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
              )}
            >
              <Send size={13} strokeWidth={2.5} />
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] text-zinc-600">{KA.chatLoginRequired}</p>
            <button
              type="button"
              onClick={() => openModal("login")}
              className="flex items-center gap-1 shrink-0 rounded-lg bg-amber-500/12 border border-amber-500/22 px-2.5 py-1.5 text-[11px] font-semibold text-amber-400 hover:bg-amber-500/22 transition-colors"
            >
              <LogIn size={11} />
              {KA.chatLoginBtn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
