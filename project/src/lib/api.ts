// API configuration and typed helpers for the ActionSteps articles backend.

// The PHP API lives on a dedicated subdomain. Set VITE_API_BASE at build time
// to override (e.g. "/api" for a same-origin setup or a staging host).
export const API_BASE =
  (import.meta.env.VITE_API_BASE as string | undefined) ||
  "https://api.actionstepscounseling.org";

export type ArticleStatus = "draft" | "published";

export type Article = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_image: string | null;
  category: "Article" | "Press" | string;
  external_url: string | null;
  author: string;
  status: ArticleStatus;
  featured: number;
  date: string;
};

export type ArticleListItem = Omit<Article, "body">;

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("actionsteps_token");
  const isForm = options.body instanceof FormData;
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> | undefined),
  };
  if (!isForm) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // ignore
    }
    throw new ApiError(res.status, message);
  }
  return res.json() as Promise<T>;
}

// ---- Public ----
export const getArticles = (category?: string) =>
  request<{ articles: ArticleListItem[] }>(
    `/index.php/articles${category ? `?category=${encodeURIComponent(category)}` : ""}`,
  );

export const getArticle = (key: string | number) =>
  request<Article>(`/index.php/articles/${key}`);

// ---- Admin ----
export type AdminUser = {
  id: number;
  username: string;
  email: string | null;
  is_active?: number;
  created?: string;
};

export const adminLogin = (username: string, password: string) =>
  request<{ token: string; user: AdminUser }>("/admin.php/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

export const adminGetMe = () => request<AdminUser>("/admin.php/me");

export const adminUpdateMe = (data: {
  username?: string;
  email?: string;
  current_password?: string;
  new_password?: string;
}) =>
  request<AdminUser>("/admin.php/me", {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const adminListUsers = () =>
  request<{ users: AdminUser[] }>("/admin.php/users");

export const adminCreateUser = (data: { username: string; email?: string; password: string }) =>
  request<{ created: boolean }>("/admin.php/users", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const adminUpdateUser = (
  id: number,
  data: { username?: string; email?: string; password?: string; is_active?: number },
) =>
  request<{ updated: boolean }>(`/admin.php/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const adminDeleteUser = (id: number) =>
  request<{ deleted: boolean }>(`/admin.php/users/${id}`, { method: "DELETE" });

export const adminListArticles = () =>
  request<{ articles: ArticleListItem[] }>("/admin.php/articles");

export const adminGetArticle = (id: number) => request<Article>(`/admin.php/articles/${id}`);

export const adminCreateArticle = (data: Partial<Article>) =>
  request<{ id: number }>("/admin.php/articles", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const adminUpdateArticle = (id: number, data: Partial<Article>) =>
  request<{ id: number }>(`/admin.php/articles/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const adminDeleteArticle = (id: number) =>
  request<{ deleted: boolean }>(`/admin.php/articles/${id}`, { method: "DELETE" });

export const adminUploadImage = (file: File) => {
  const form = new FormData();
  form.append("file", file);
  return request<{ url: string }>("/admin.php/upload", { method: "POST", body: form });
};
