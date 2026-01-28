# Blog Components

Компоненты для блога в стиле постов X/Telegram. Только администраторы могут создавать посты, но любой авторизованный пользователь может комментировать и лайкать.

## Компоненты

### PostCard
Карточка поста с информацией об авторе, содержимым и действиями.

**Props:**
- `post: Post` - данные поста
- `onLike?: (postId: string) => void` - callback для лайка
- `onComment?: (postId: string) => void` - callback для комментария
- `onDelete?: (postId: string) => void` - callback для удаления (только админ/автор)
- `onEdit?: (postId: string) => void` - callback для редактирования (только админ/автор)
- `isLiked?: boolean` - лайкнут ли пост текущим пользователем
- `currentUserId?: string` - ID текущего пользователя
- `isAdmin?: boolean` - является ли пользователь админом

**Особенности:**
- Клик на карточку → переход на страницу поста
- Анимации при появлении/исчезновении
- Показывает кнопки управления только для админа/автора
- Отображает статус "Draft" для неопубликованных постов

### PostsList
Список постов с пагинацией и бесконечной прокруткой.

**Props:**
- `posts: Post[]` - массив постов
- `isLoading?: boolean` - состояние загрузки
- `hasMore?: boolean` - есть ли еще посты для загрузки
- `onLoadMore?: () => void` - callback для загрузки следующей страницы
- `onLike?: (postId: string) => void` - callback для лайка
- `onComment?: (postId: string) => void` - callback для комментария
- `onDelete?: (postId: string) => void` - callback для удаления
- `onEdit?: (postId: string) => void` - callback для редактирования
- `likedPosts?: Set<string>` - Set с ID лайкнутых постов
- `currentUserId?: string` - ID текущего пользователя
- `isAdmin?: boolean` - является ли пользователь админом
- `emptyMessage?: string` - сообщение при отсутствии постов

**Особенности:**
- Автоматическая бесконечная прокрутка
- Кнопка "Load more" как fallback
- Анимации при добавлении/удалении постов
- Состояния загрузки и пустого списка

### CreatePostForm
Форма создания нового поста (только для админов).

**Props:**
- `onSubmit: (data: {...}) => Promise<void>` - callback для создания поста
- `onCancel: () => void` - callback для отмены
- `isSubmitting?: boolean` - состояние отправки

**Поля формы:**
- Title (обязательно)
- Excerpt (опционально, макс. 200 символов)
- Content (обязательно)
- Published (checkbox, по умолчанию true)

**Особенности:**
- Валидация полей
- Счетчик символов для excerpt
- Состояния загрузки
- Автоматический сброс после успешной отправки

### CommentCard
Карточка комментария с возможностью редактирования и удаления.

**Props:**
- `comment: Comment` - данные комментария
- `onDelete?: (commentId: string) => void` - callback для удаления
- `onEdit?: (commentId: string, content: string) => void` - callback для редактирования
- `currentUserId?: string` - ID текущего пользователя
- `isAdmin?: boolean` - является ли пользователь админом

**Особенности:**
- Inline редактирование
- Кнопки управления только для админа/автора
- Относительное время (time ago)
- Аватар пользователя

### CommentsSection
Секция комментариев с формой создания и списком.

**Props:**
- `postId: string` - ID поста
- `comments: Comment[]` - массив комментариев
- `isLoading?: boolean` - состояние загрузки
- `hasMore?: boolean` - есть ли еще комментарии
- `onLoadMore?: () => void` - callback для загрузки следующей страницы
- `onCreateComment?: (content: string) => Promise<void>` - callback для создания
- `onDeleteComment?: (commentId: string) => void` - callback для удаления
- `onEditComment?: (commentId: string, content: string) => void` - callback для редактирования
- `currentUserId?: string` - ID текущего пользователя
- `isAdmin?: boolean` - является ли пользователь админом
- `isAuthenticated?: boolean` - авторизован ли пользователь

**Особенности:**
- Форма создания только для авторизованных
- Счетчик символов (макс. 1000)
- Пагинация комментариев
- Состояния загрузки и пустого списка

## Страницы

### `/blog` (page.tsx)
Главная страница блога со списком всех постов.

**Функционал:**
- Просмотр всех опубликованных постов
- Создание постов (только админ)
- Лайки и комментарии (авторизованные пользователи)
- Удаление постов (только админ)
- Бесконечная прокрутка

### `/blog/[id]` (page.tsx)
Страница отдельного поста с комментариями.

**Функционал:**
- Полное содержимое поста
- Информация об авторе
- Лайки
- Комментарии с пагинацией
- Создание/редактирование/удаление комментариев
- Удаление поста (только админ)

## Сервисы

### posts.ts
API для работы с постами:
- `getPosts(page, limit, published?, token?)` - список постов
- `getPostById(id, token?)` - один пост
- `createPost(data, token)` - создать пост (admin)
- `updatePost(id, data, token)` - обновить пост (admin)
- `deletePost(id, token)` - удалить пост (admin)

### comments.ts
API для работы с комментариями:
- `getCommentsByPost(postId, page, limit, token?)` - комментарии к посту
- `getCommentById(id, token?)` - один комментарий
- `createComment(data, token)` - создать комментарий
- `updateComment(id, data, token)` - обновить комментарий
- `deleteComment(id, token)` - удалить комментарий

### likes.ts
API для работы с лайками:
- `toggleLike(postId, token)` - поставить/убрать лайк
- `getLikeStatus(postId, token)` - статус лайка
- `getLikesCount(postId)` - количество лайков
- `getUsersWhoLiked(postId, page, limit, token?)` - список пользователей

## Использование

### Пример: Просмотр постов
```tsx
import { PostsList } from '@/components/blog';
import { getPosts } from '@/services/posts';

const [posts, setPosts] = useState<Post[]>([]);

const loadPosts = async () => {
  const response = await getPosts(1, 10);
  setPosts(response.posts);
};
```

### Пример: Создание поста (админ)
```tsx
import { CreatePostForm } from '@/components/blog';
import { createPost } from '@/services/posts';

const handleCreatePost = async (data) => {
  const newPost = await createPost(data, token);
  setPosts([newPost, ...posts]);
};

<CreatePostForm
  onSubmit={handleCreatePost}
  onCancel={() => setShowForm(false)}
/>
```

### Пример: Лайк поста
```tsx
import { toggleLike } from '@/services/likes';

const handleLike = async (postId: string) => {
  const response = await toggleLike(postId, token);
  // response.liked - новый статус
  // response.likesCount - новое количество
};
```

### Пример: Комментарии
```tsx
import { CommentsSection } from '@/components/blog';
import { createComment } from '@/services/comments';

const handleCreateComment = async (content: string) => {
  const newComment = await createComment(
    { content, postId },
    token
  );
  setComments([newComment, ...comments]);
};

<CommentsSection
  postId={postId}
  comments={comments}
  onCreateComment={handleCreateComment}
  isAuthenticated={!!token}
/>
```

## Стилизация

Все компоненты используют:
- Tailwind CSS для стилей
- Framer Motion для анимаций
- Lucide React для иконок
- date-fns для форматирования дат

Цветовая схема:
- `text-primary` - основной текст
- `text-secondary` - вторичный текст
- `text-tertiary` - третичный текст (подсказки, метаданные)
- `border-tertiary/10` - границы с прозрачностью

## Типы

```typescript
type Post = {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  published: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    username: string;
    email: string;
    image: string | null;
  };
  likesCount?: number;
  commentsCount?: number;
};

type Comment = {
  id: string;
  content: string;
  postId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    username: string;
    image: string | null;
  };
};
```

## Примечания

- Посты создавать могут только администраторы
- Лайки и комментарии доступны всем авторизованным пользователям
- Неавторизованные пользователи могут только просматривать посты
- Автоматическое обновление счетчиков лайков и комментариев
- Responsive дизайн для мобильных устройств
