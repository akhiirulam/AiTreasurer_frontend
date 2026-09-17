import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Trash2,
  AlertTriangle,
} from "lucide-react";

import api from "../../api/axios";

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [deletePassword, setDeletePassword] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [showDeletePassword, setShowDeletePassword] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [showDeleteSection, setShowDeleteSection] = useState(false);

  const handleCurrentPasswordChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirmation do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setErrorMessage(
        "New password must be different from the current password.",
      );
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      setSuccessMessage(
        response.data?.message || "Password changed successfully.",
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Unable to change password. Please try again.";

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setDeleteError("");

    if (!deletePassword) {
      setDeleteError("Please enter your password.");
      return;
    }

    if (deleteConfirmation !== "DELETE") {
      setDeleteError("Please type DELETE to confirm account deletion.");
      return;
    }

    try {
      setDeleteLoading(true);

      await api.delete("/auth/account", {
        data: {
          password: deletePassword,
          confirmation: deleteConfirmation,
        },
      });

      // Clear authentication after successful deletion.
      localStorage.clear();

      window.location.href = "/login";
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Unable to delete your account. Please try again.";

      setDeleteError(message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f2]">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e4f2de] text-[#173f35]">
              <ShieldCheck size={21} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#173f35]">Settings</h1>

              <p className="mt-1 text-sm text-[#68736c]">
                Manage your account and security settings
              </p>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <section className="rounded-xl border border-[#dce5da] bg-white shadow-sm">
          <div className="border-b border-[#dce5da] px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e4f2de] text-[#173f35]">
                <Lock size={19} />
              </div>

              <div>
                <h2 className="font-semibold text-[#173f35]">
                  Change Password
                </h2>

                <p className="mt-1 text-sm text-[#68736c]">
                  Update your password to keep your account secure.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-5 py-6 sm:px-6">
            {/* Success */}
            {successMessage && (
              <div className="mb-5 flex items-start gap-3 rounded-lg border border-[#cfe5c8] bg-[#f1faee] px-4 py-3">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-[#238636]"
                />

                <p className="text-sm font-medium text-[#238636]">
                  {successMessage}
                </p>
              </div>
            )}

            {/* Error */}
            {errorMessage && (
              <div className="mb-5 flex items-start gap-3 rounded-lg border border-[#f0caca] bg-[#fff5f5] px-4 py-3">
                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0 text-[#c43d3d]"
                />

                <p className="text-sm font-medium text-[#c43d3d]">
                  {errorMessage}
                </p>
              </div>
            )}

            <div className="max-w-xl space-y-5">
              {/* Current Password */}
              <div>
                <label
                  htmlFor="currentPassword"
                  className="mb-2 block text-sm font-medium text-[#17231f]"
                >
                  Current Password
                </label>

                <div className="relative">
                  <input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={handleCurrentPasswordChange}
                    placeholder="Enter your current password"
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-[#dce5da] bg-[#f9fbf7] px-4 py-3 pr-11 text-sm text-[#17231f] outline-none transition placeholder:text-[#9aa49e] focus:border-[#173f35] focus:ring-2 focus:ring-[#e4f2de]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrentPassword((previous) => !previous)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#68736c] transition hover:text-[#173f35]"
                    aria-label={
                      showCurrentPassword
                        ? "Hide current password"
                        : "Show current password"
                    }
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="mb-2 block text-sm font-medium text-[#17231f]"
                >
                  New Password
                </label>

                <div className="relative">
                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    placeholder="Enter your new password"
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-[#dce5da] bg-[#f9fbf7] px-4 py-3 pr-11 text-sm text-[#17231f] outline-none transition placeholder:text-[#9aa49e] focus:border-[#173f35] focus:ring-2 focus:ring-[#e4f2de]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNewPassword((previous) => !previous)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#68736c] transition hover:text-[#173f35]"
                    aria-label={
                      showNewPassword
                        ? "Hide new password"
                        : "Show new password"
                    }
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <p className="mt-2 text-xs text-[#68736c]">
                  Password must contain at least 8 characters.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-[#17231f]"
                >
                  Confirm New Password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder="Confirm your new password"
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-[#dce5da] bg-[#f9fbf7] px-4 py-3 pr-11 text-sm text-[#17231f] outline-none transition placeholder:text-[#9aa49e] focus:border-[#173f35] focus:ring-2 focus:ring-[#e4f2de]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((previous) => !previous)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#68736c] transition hover:text-[#173f35]"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password confirmation"
                        : "Show password confirmation"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-lg bg-[#173f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102e27] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Changing Password..." : "Change Password"}
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* Danger Zone */}
        <section className="mt-6 rounded-xl border border-[#f0caca] bg-white shadow-sm">
          <div className="border-b border-[#f0caca] px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fff5f5] text-[#c43d3d]">
                <Trash2 size={19} />
              </div>

              <div>
                <h2 className="font-semibold text-[#c43d3d]">Delete Account</h2>

                <p className="mt-1 text-sm text-[#68736c]">
                  Permanently delete your AiTreasurer account.
                </p>
              </div>
            </div>
          </div>

          <div className="px-5 py-6 sm:px-6">
            {!showDeleteSection ? (
              <div>
                <div className="mb-5 flex items-start gap-3 rounded-lg border border-[#f0caca] bg-[#fff5f5] px-4 py-3">
                  <AlertTriangle
                    size={18}
                    className="mt-0.5 shrink-0 text-[#c43d3d]"
                  />

                  <div>
                    <p className="text-sm font-semibold text-[#c43d3d]">
                      This action cannot be undone.
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#68736c]">
                      Deleting your account will permanently remove your account
                      and associated data.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteSection(true);
                    setDeleteError("");
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#c43d3d] px-5 py-3 text-sm font-semibold text-[#c43d3d] transition hover:bg-[#fff5f5]"
                >
                  <Trash2 size={17} />
                  Delete Account
                </button>
              </div>
            ) : (
              <form onSubmit={handleDeleteAccount} className="max-w-xl">
                {/* Warning */}
                <div className="mb-5 rounded-lg border border-[#f0caca] bg-[#fff5f5] p-4">
                  <p className="text-sm font-semibold text-[#c43d3d]">
                    Are you absolutely sure?
                  </p>

                  <p className="mt-2 text-xs leading-5 text-[#68736c]">
                    Your account will be permanently deleted. This action cannot
                    be undone.
                  </p>
                </div>

                {/* Error */}
                {deleteError && (
                  <div className="mb-5 flex items-start gap-3 rounded-lg border border-[#f0caca] bg-[#fff5f5] px-4 py-3">
                    <AlertCircle
                      size={18}
                      className="mt-0.5 shrink-0 text-[#c43d3d]"
                    />

                    <p className="text-sm font-medium text-[#c43d3d]">
                      {deleteError}
                    </p>
                  </div>
                )}

                {/* Password */}
                <div>
                  <label
                    htmlFor="deletePassword"
                    className="mb-2 block text-sm font-medium text-[#17231f]"
                  >
                    Enter your password
                  </label>

                  <div className="relative">
                    <input
                      id="deletePassword"
                      type={showDeletePassword ? "text" : "password"}
                      value={deletePassword}
                      onChange={(event) =>
                        setDeletePassword(event.target.value)
                      }
                      placeholder="Enter your current password"
                      autoComplete="current-password"
                      className="w-full rounded-lg border border-[#dce5da] bg-[#f9fbf7] px-4 py-3 pr-11 text-sm text-[#17231f] outline-none transition placeholder:text-[#9aa49e] focus:border-[#c43d3d] focus:ring-2 focus:ring-[#f0caca]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowDeletePassword((previous) => !previous)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#68736c] transition hover:text-[#c43d3d]"
                      aria-label={
                        showDeletePassword ? "Hide password" : "Show password"
                      }
                    >
                      {showDeletePassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirmation */}
                <div className="mt-5">
                  <label
                    htmlFor="deleteConfirmation"
                    className="mb-2 block text-sm font-medium text-[#17231f]"
                  >
                    Type <span className="font-technical">DELETE</span> to
                    confirm
                  </label>

                  <input
                    id="deleteConfirmation"
                    type="text"
                    value={deleteConfirmation}
                    onChange={(event) =>
                      setDeleteConfirmation(event.target.value)
                    }
                    placeholder="DELETE"
                    autoComplete="off"
                    className="w-full rounded-lg border border-[#dce5da] bg-[#f9fbf7] px-4 py-3 text-sm text-[#17231f] outline-none transition placeholder:text-[#9aa49e] focus:border-[#c43d3d] focus:ring-2 focus:ring-[#f0caca]"
                  />
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={deleteLoading || deleteConfirmation !== "DELETE"}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c43d3d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a83232] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 size={17} />

                    {deleteLoading
                      ? "Deleting Account..."
                      : "Permanently Delete Account"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowDeleteSection(false);
                      setDeletePassword("");
                      setDeleteConfirmation("");
                      setDeleteError("");
                    }}
                    disabled={deleteLoading}
                    className="rounded-lg border border-[#dce5da] bg-white px-5 py-3 text-sm font-semibold text-[#173f35] transition hover:bg-[#e4f2de] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
