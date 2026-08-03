"use client";

import { useState, useCallback } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { VscPinned, VscUnpin } from "react-icons/vsc";
import { CgTrashEmpty } from "react-icons/cg";
import { UIMessage } from "ai";
import { cn } from "@/lib/utils";

interface ConversationItemProps {
  id: string;
  title: string;
  isActive: boolean;
  isPinned?: boolean;
  isCollapsed?: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
  onTogglePin?: (id: string) => void;
}

export default function ConversationItem({
  id,
  title,
  isActive,
  isPinned = false,
  isCollapsed = false,
  onSelect,
  onDelete,
  onRename,
  onTogglePin,
}: ConversationItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const handleRenameSubmit = useCallback(() => {
    if (editValue.trim()) {
      onRename(id, editValue.trim());
    } else {
      setEditValue(title);
    }
    setIsEditing(false);
  }, [editValue, id, onRename, title]);

  if (isCollapsed) {
    return (
      <button
        type="button"
        onClick={() => onSelect(id)}
        title={title}
        className={cn(
          "w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer border-none bg-white/5 hover:bg-white/10 outline-none shrink-0 group"
        )}
      >
        {isPinned ? (
          <VscPinned className={cn("w-4 h-4 transition-transform group-hover:scale-110", isActive ? "text-indigo-400" : "text-white/60 group-hover:text-white")} />
        ) : (
          <MdOutlineMarkUnreadChatAlt className={cn("w-4 h-4 transition-transform group-hover:scale-110", isActive ? "text-indigo-400" : "text-white/60 group-hover:text-white")} />
        )}
      </button>
    );
  }

  return (
    <div
      onClick={() => !isEditing && onSelect(id)}
      className={cn(
        "group relative flex items-center justify-between gap-2.5 w-full px-4 py-2 rounded-md text-xs transition-all cursor-pointer select-none border-none bg-white/5 hover:bg-white/10 min-w-0 mb-0.5"
      )}
    >
      <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-1 border-none">
        <span className="flex items-center shrink-0">
          {isPinned ? (
            <VscPinned className={cn("w-4 h-4 transition-transform group-hover:scale-110", isActive ? "text-indigo-400" : "text-white/60 group-hover:text-white")} />
          ) : (
            <MdOutlineMarkUnreadChatAlt className={cn("w-4 h-4 transition-transform group-hover:scale-110", isActive ? "text-indigo-400" : "text-white/60 group-hover:text-white")} />
          )}
        </span>

        {isEditing ? (
          <input
            autoFocus
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleRenameSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRenameSubmit();
              if (e.key === "Escape") {
                setEditValue(title);
                setIsEditing(false);
              }
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-transparent border-none outline-none text-xs text-white p-0 font-medium"
          />
        ) : (
          <span className={cn("truncate flex-1 text-xs transition-colors", isActive ? "text-indigo-400 font-bold" : "text-white/70 font-medium group-hover:text-white")}>
            {title}
          </span>
        )}
      </div>

      {!isEditing && (
        <div
          className={cn(
            "flex items-center gap-1 shrink-0 transition-opacity duration-150",
            isPinned
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
          )}
        >
          {onTogglePin && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin(id);
              }}
              title={isPinned ? "Unpin" : "Pin to top"}
              className={cn(
                "p-1 rounded-full text-white/60 hover:text-white hover:bg-white/20 border-none cursor-pointer transition-colors outline-none",
                isPinned && "text-indigo-400"
              )}
            >
              {isPinned ? (
                <VscUnpin className="w-3.5 h-3.5" />
              ) : (
                <VscPinned className="w-3.5 h-3.5" />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            title="Rename"
            className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/20 border-none cursor-pointer transition-colors outline-none"
          >
            <FiEdit3 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            title="Delete"
            className="p-1 rounded-full text-white/60 hover:text-red-400 hover:bg-red-500/15 border-none cursor-pointer transition-colors outline-none"
          >
            <CgTrashEmpty className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {isActive && (
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 group-hover:hidden" />
      )}
    </div>
  );
}

export interface Conversation {
  id: string;
  title: string;
  messages: UIMessage[];
  createdAt: Date;
  pinned?: boolean;
}
