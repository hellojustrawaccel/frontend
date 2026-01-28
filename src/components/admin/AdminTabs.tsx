'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { UsersTab } from './UsersTab';
import { PostsTab } from './PostsTab';
import { LinksTab } from './LinksTab';
import { ExperienceTab } from './ExperienceTab';

type Tab = 'users' | 'posts' | 'links' | 'experience';

export function AdminTabs() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<Tab>('users');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'users', label: 'Пользователи' },
    { id: 'posts', label: 'Посты' },
    { id: 'links', label: 'Ссылки' },
    { id: 'experience', label: 'Опыт' },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-0">
      {/* Tabs */}
      <div className="border-secondary/20 mb-6 flex gap-1 overflow-x-auto border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-2 text-xs whitespace-nowrap transition-colors ${
              activeTab === tab.id ? 'text-primary' : 'text-secondary/60 hover:text-secondary'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="bg-primary absolute right-0 bottom-0 left-0 h-0.5" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div key={activeTab}>
        {activeTab === 'users' && <UsersTab token={session?.backendToken} />}
        {activeTab === 'posts' && <PostsTab token={session?.backendToken} />}
        {activeTab === 'links' && <LinksTab token={session?.backendToken} />}
        {activeTab === 'experience' && <ExperienceTab token={session?.backendToken} />}
      </div>
    </div>
  );
}
