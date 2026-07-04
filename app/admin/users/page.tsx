"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, LogOut } from "lucide-react";
import AdminAuthGuard from "@/app/components/AdminAuthGuard";

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [editTarget, setEditTarget] = useState<User | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  });

  const handleAuthError = (status: number) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("adminToken");
      router.replace("/admin/login");
      return true;
    }
    return false;
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/users", {
        headers: getAuthHeaders(),
      });

      if (handleAuthError(res.status)) return;

      const data = await res.json();
      if (data.success) setUsers(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openEdit = (user: User) => {
    setEditTarget(user);
    setEditName(user.fullName);
    setEditEmail(user.email);
    setEditRole(user.role);
  };

  const handleSaveEdit = async () => {
    if (!editTarget) return;
    setSaving(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/users/${editTarget._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify({
            fullName: editName,
            email: editEmail,
            role: editRole,
          }),
        }
      );

      if (handleAuthError(res.status)) return;

      const data = await res.json();
      if (data.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === editTarget._id ? data.data : u))
        );
        setEditTarget(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/users/${deleteTarget._id}`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        }
      );

      if (handleAuthError(res.status)) return;

      setUsers((prev) => prev.filter((u) => u._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  return (
    <AdminAuthGuard>
      <main className="min-h-screen bg-[#FFF9EB] p-10">
        <div className="mx-auto max-w-6xl">

          <div className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-[#9A4D00]">
                User Management
              </h1>
              <p className="mt-2 text-[#7B7269]">
                View, edit, and remove platform users.
              </p>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-xl border border-[#D8BDA8] px-5 py-3 text-[#A65200] transition hover:bg-[#F8F1E5]"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-[#E3CDBB] bg-white shadow-sm">
            {loading ? (
              <div className="p-10 text-center text-[#7B7269]">
                Loading users...
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-[#F8F1E5] text-sm uppercase text-[#8B7E71]">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-t border-[#F0E6D6]">
                      <td className="px-6 py-4 font-semibold">{user.fullName}</td>
                      <td className="px-6 py-4 text-[#6D645B]">{user.email}</td>
                      <td className="px-6 py-4 capitalize text-[#6D645B]">{user.role}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => openEdit(user)}
                            className="rounded-lg p-2 text-[#A65200] transition hover:bg-[#FFF3E0]"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(user)}
                            className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* EDIT MODAL */}
        {editTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-[28px] bg-white p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-[#2D241C]">Edit User</h2>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#594D43]">
                    Full Name
                  </label>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="h-12 w-full rounded-xl border border-[#E3CDBB] px-4 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#594D43]">
                    Email
                  </label>
                  <input
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="h-12 w-full rounded-xl border border-[#E3CDBB] px-4 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#594D43]">
                    Role
                  </label>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="h-12 w-full rounded-xl border border-[#E3CDBB] px-4 outline-none"
                  >
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => setEditTarget(null)}
                  className="flex-1 rounded-xl border border-[#D8BDA8] py-3"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={saving}
                  className="flex-1 rounded-xl bg-[#A65200] py-3 font-semibold text-white disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DELETE CONFIRMATION MODAL */}
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <Trash2 size={28} className="text-red-500" />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-[#2D241C]">
                Delete User?
              </h2>

              <p className="mt-2 text-[#7B6E62]">
                Are you sure you want to delete <strong>{deleteTarget.fullName}</strong>? This action cannot be undone.
              </p>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 rounded-2xl bg-green-500 px-6 py-3 font-semibold text-white hover:bg-green-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 rounded-2xl bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600 disabled:opacity-60"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </AdminAuthGuard>
  );
}