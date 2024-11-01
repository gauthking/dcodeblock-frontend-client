import React, { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, Edit, LogOut, Plus, Trash2 } from "lucide-react";
import { UserInfo } from "../@types";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import bcrypt from "bcryptjs";

const UserMgmt: React.FC = () => {
  const [users, setUsers] = useState<UserInfo[]>();
  const [addUserName, setAddUserName] = useState<string>("");
  const [addUserRole, setAddUserRole] = useState<string>("admin");
  const [addUserEmail, setAddUserEmail] = useState<string>("");
  const [addUserPwd, setAddUserPwd] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] =
    useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<UserInfo | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    setUserInfo(user);

    const handleStorageChange = () => {
      const token = sessionStorage.getItem("token");
      const user = sessionStorage.getItem("user");

      if (!token || !user) {
        console.log("Session storage cleared, redirecting to login...");
        navigate("/");
      }
    };

    handleStorageChange();
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  console.log(users);

  const onLogout = async () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setIsDropdownOpen(false);
    try {
      await axios
        .post("/api/admin/action", {
          requestingUserEmail: userInfo?.userEmail,
          action: "Logged Out",
        })
        .then(() => console.log("log out action posted"));
    } catch (error) {
      alert("Action not posted");
      console.log("action post error - ", error);
    }
    navigate("/");
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/user/getAllUsers");
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      alert("Error fetching users.");
    }
  };

  const editUser = async (
    id: string,
    updatedName: string,
    updatedEmail: string,
    updatedPassword: string,
    updatedRole: string
  ) => {
    if (userInfo?.role !== "admin") {
      alert("Admin role is required to perform this operation.");
      return;
    }

    try {
      console.log(updatedPassword);
      const hashedPassword = await bcrypt.hash(updatedPassword, 10);

      await axios.put(`/api/admin/update/${id}`, {
        userName: updatedName,
        userEmail: updatedEmail,
        password: hashedPassword,
        role: updatedRole,
        requestingUserEmail: userInfo.userEmail,
      });
      fetchUsers().then(() => alert("User updated successfully"));
      setIsEditUserModalOpen(false);
    } catch (error) {
      alert("Error updating user.");
    }
  };

  const deleteUser = async (id: string) => {
    if (userInfo?.role !== "admin") {
      alert("Admin role is required to perform this operation.");
      return;
    }

    try {
      await axios
        .post(`/api/admin/delete/${id}`, {
          requestingUserEmail: userInfo.userEmail,
        })
        .then(() => fetchUsers())
        .then(() => alert("Deleted user successfully"));
    } catch (error) {
      alert("Error deleting user.");
    }
  };

  const createUser = async () => {
    if (!addUserEmail || !addUserName || !addUserPwd || !addUserRole) {
      alert("Please fill all the fields to continue..");
    } else {
      if (userInfo?.role !== "admin") {
        alert("Admin role is required to perform this operation.");
        return;
      }

      const hashedPassword = await bcrypt.hash(addUserPwd, 10);

      try {
        await axios.post("/api/admin/create", {
          userName: addUserName,
          userEmail: addUserEmail,
          password: hashedPassword,
          role: addUserRole,
          requestingUserEmail: userInfo.userEmail,
        });
        fetchUsers().then(() => alert("User created successfully"));
        setIsAddUserModalOpen(false);
      } catch (error) {
        alert("Error creating user.");
      }
    }
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl md:text-3xl font-bold text-gray-800">
            User Management
          </h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-white shadow-md">
              <Bell className="h-5 w-5" />
            </button>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 bg-white rounded-md shadow-md px-3 py-2"
              >
                <span className="text-sm md:text-lg font-mono">
                  {userInfo?.userName}
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <p className="px-4 py-2 text-sm text-gray-700 font-semibold">
                      My Account
                    </p>
                    <hr />
                    <button
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </button>
                    <hr />
                    <button
                      onClick={onLogout}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {userInfo?.role === "admin" && (
          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            <Plus className="inline-block mr-2 h-4 w-4" /> Add User
          </button>
        )}

        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              {userInfo?.role === "admin" && (
                <th className="px-4 py-2 text-left">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {users?.map((user: UserInfo) => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-2 text-sm md:text-[17px]">
                  {user.userName}
                </td>
                <td className="px-4 py-2 text-sm md:text-[17px]">
                  {user.userEmail}
                </td>
                <td className="px-4 py-2 text-sm md:text-[17px]">
                  {user.role}
                </td>
                {userInfo?.role === "admin" && (
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingUser(user);
                          setIsEditUserModalOpen(true);
                        }}
                        className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition-colors text-sm"
                      >
                        <Edit className="inline-block mr-1 h-4 w-4" /> Edit
                      </button>
                      {user.userEmail !== userInfo.userEmail && (
                        <button
                          onClick={() => {
                            deleteUser(user._id);
                          }}
                          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors text-sm"
                        >
                          <Trash2 className="inline-block mr-1 h-4 w-4" />{" "}
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add New User</h3>
            <form
              onSubmit={() => {
                createUser();
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  value={addUserName}
                  onChange={(e) => setAddUserName(e.target.value)}
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  value={addUserEmail}
                  onChange={(e) => setAddUserEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Set Password
                </label>
                <input
                  value={addUserPwd}
                  onChange={(e) => setAddUserPwd(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Role
                </label>
                <select
                  value={addUserRole}
                  onChange={(e) => setAddUserRole(e.target.value)}
                  id="role"
                  name="role"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditUserModalOpen && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Edit User</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editUser(
                  editingUser._id,
                  (e.target as any).name.value,
                  (e.target as any).email.value,
                  (e.target as any).password.value,
                  (e.target as any).role.value
                );
              }}
            >
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="editUserName"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="editUserName"
                  name="name"
                  defaultValue={editingUser.userName}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="editUserEmail"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="editUserEmail"
                  name="email"
                  defaultValue={editingUser.userEmail}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="editUserPwd"
                >
                  Password
                </label>
                <input
                  placeholder="if pwd not updating then pls enter prev password"
                  type="password"
                  id="editUserPwd"
                  name="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="editUserRole"
                >
                  Role
                </label>
                <select
                  id="editUserRole"
                  name="role"
                  defaultValue={editingUser.role}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditUserModalOpen(false)}
                  className="mr-4 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMgmt;
