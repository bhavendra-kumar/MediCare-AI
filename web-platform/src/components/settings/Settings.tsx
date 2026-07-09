"use client";

import React, { useRef } from "react";
import { Moon, Sun, Monitor, Shield, User, Camera, Eye, EyeOff, LogOut } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/context/ThemeContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { TypographyH1, TypographyH3, TypographyP } from "@/components/ui/typography";
import { toast } from "sonner";

export function Settings() {
  const { theme, setTheme } = useTheme();
  const { user, updateUser, logout } = useAuth();
  const [isEditingProfile, setIsEditingProfile] = React.useState(false);

  // Profile State
  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [avatarPreview, setAvatarPreview] = React.useState("");

  const handleEditProfile = () => {
    setName(user?.name || "");
    setBio(user?.bio || "");
    setAvatarPreview(user?.avatar || "");
    setIsEditingProfile(true);
  };

  // Security State
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showNew, setShowNew] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [isEditingPassword, setIsEditingPassword] = React.useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File is too large. Max size is 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        toast.success("Profile photo updated temporarily. Save changes to keep it.");
        setIsEditingProfile(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    updateUser({ name, bio, avatar: avatarPreview });
    setIsEditingProfile(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancelProfile = () => {
    setIsEditingProfile(false);
    setName(user?.name || "");
    setBio(user?.bio || "");
    setAvatarPreview(user?.avatar || "");
  };

  const handleUpdatePassword = () => {
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.");
      return;
    }
    if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword) || !/[^A-Za-z0-9]/.test(newPassword)) {
      toast.error("New password must contain uppercase, lowercase, number, and special character.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    // Mock successful password change
    setNewPassword("");
    setConfirmPassword("");
    setIsEditingPassword(false);
    toast.success("Password updated successfully!");
  };

  const handleCancelPassword = () => {
    setNewPassword("");
    setConfirmPassword("");
    setIsEditingPassword(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <TypographyH1 className="text-2xl text-left tracking-tight text-slate-900 dark:text-white">Settings</TypographyH1>
        <TypographyP className="text-slate-500 mt-1 dark:text-slate-400 not-first:mt-1">Manage your application preferences and security.</TypographyP>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5" /> Appearance
            </CardTitle>
            <CardDescription>Customize how MediCare AI looks on your device.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                className="justify-start gap-2"
                onClick={() => setTheme("light")}
              >
                <Sun className="h-4 w-4" /> Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                className="justify-start gap-2"
                onClick={() => setTheme("dark")}
              >
                <Moon className="h-4 w-4" /> Dark
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                className="justify-start gap-2"
                onClick={() => setTheme("system")}
              >
                <Monitor className="h-4 w-4" /> System
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" /> User Profile
            </CardTitle>
            <CardDescription>Update your personal information and profile picture.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
              <div className="relative">
                <Avatar className="h-20 w-20 border-2 border-slate-100 dark:border-slate-800">
                  <AvatarImage src={isEditingProfile ? avatarPreview : (user?.avatar || "")} />
                  <AvatarFallback className="text-xl">{(isEditingProfile ? name : user?.name)?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  accept="image/png, image/jpeg, image/gif"
                  onChange={handleAvatarChange}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-1.5 rounded-full bg-sky-600 text-white hover:bg-sky-700 transition-colors border-2 border-white dark:border-slate-950 shadow-sm"
                >
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="space-y-1">
                <TypographyH3 className="font-medium text-slate-900 dark:text-white text-base">Profile Photo</TypographyH3>
                <TypographyP className="text-sm text-slate-500 dark:text-slate-400 not-first:mt-0">JPG, GIF or PNG. Max size 2MB.</TypographyP>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                {isEditingProfile && <Label htmlFor="name">Full Name</Label>}
                <Input
                  id="name"
                  value={isEditingProfile ? name : (user?.name || "")}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isEditingProfile ? "Your full name" : ""}
                  disabled={!isEditingProfile}
                  className={!isEditingProfile ? "border-transparent bg-transparent disabled:opacity-100 disabled:cursor-default px-0 shadow-none font-medium text-slate-900 dark:text-slate-100 dark:border-transparent dark:bg-transparent dark:disabled:opacity-100" : ""}
                />
              </div>
              <div className="space-y-2">
                {isEditingProfile && <Label htmlFor="email">Email Address</Label>}
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  placeholder={isEditingProfile ? "Your email address" : ""}
                  disabled
                  className={!isEditingProfile ? "border-transparent bg-transparent disabled:opacity-100 disabled:cursor-default px-0 shadow-none font-medium text-slate-900 dark:text-slate-100 dark:border-transparent dark:bg-transparent dark:disabled:opacity-100" : ""}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                {isEditingProfile && <Label htmlFor="bio">Bio</Label>}
                <Input
                  id="bio"
                  value={isEditingProfile ? bio : (user?.bio || "")}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder={isEditingProfile ? "A brief description about yourself or your medical history..." : ""}
                  disabled={!isEditingProfile}
                  className={!isEditingProfile ? "border-transparent bg-transparent disabled:opacity-100 disabled:cursor-default px-0 shadow-none font-medium text-slate-900 dark:text-slate-100 dark:border-transparent dark:bg-transparent dark:disabled:opacity-100" : ""}
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              {!isEditingProfile ? (
                <Button onClick={handleEditProfile}>Edit Profile</Button>
              ) : (
                <>
                  <Button onClick={handleSaveProfile} className="bg-sky-600 hover:bg-sky-700 text-white">Save Profile Changes</Button>
                  <Button variant="outline" onClick={handleCancelProfile}>Cancel</Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" /> Security
            </CardTitle>
            <CardDescription>Update your password to keep your account secure.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 max-w-md">
              {!isEditingPassword ? (
                <>
                  <div className="space-y-2">
                    <Input 
                      id="password-display"
                      type="password"
                      value="••••••••"
                      disabled
                      className="border-transparent bg-transparent disabled:opacity-100 disabled:cursor-default px-0 shadow-none font-medium text-slate-900 dark:text-slate-100 dark:border-transparent dark:bg-transparent dark:disabled:opacity-100"
                    />
                  </div>
                  <div className="pt-2">
                    <Button onClick={() => setIsEditingPassword(true)}>Change Password</Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showNew ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="pr-10"
                      />
                      <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="pr-10"
                      />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="pt-2 flex gap-3">
                    <Button onClick={handleUpdatePassword} className="bg-sky-600 hover:bg-sky-700 text-white">Save Password Changes</Button>
                    <Button variant="outline" onClick={handleCancelPassword}>Cancel</Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Log Out */}
        <Card className="border-red-200/50 dark:border-red-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <LogOut className="h-5 w-5" /> Log Out
            </CardTitle>
            <CardDescription>Sign out of your MediCare AI account on this device.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="destructive" 
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-950 dark:hover:bg-red-900 dark:text-red-200"
            >
              Log Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
