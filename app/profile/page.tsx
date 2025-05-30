"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useMemo } from "react";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Loader from "@/components/loader";
interface UserProfile {
  uid: string;
  displayName: string;
  phone: string;
  email: string;
  photoURL?: string;
  role?: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [localProfile, setLocalProfile] = useState({ displayName: "", phone: "" });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from Firestore using email from session
  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.email) return;

      setLoading(true);
      const q = query(collection(db, "users"), where("email", "==", session.user.email));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];
        const data = docSnap.data() as UserProfile;
        setProfile({ ...data, uid: docSnap.id });
        setLocalProfile({
          displayName: data.displayName || "",
          phone: data.phone || "",
        });
      }

      setLoading(false);
    };

    fetchProfile();
  }, [session?.user?.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hasChanges = useMemo(() => {
    if (!profile) return false;
    return (
      localProfile.displayName !== (profile.displayName || "") ||
      localProfile.phone !== (profile.phone || "")
    );
  }, [localProfile, profile]);

  const handleSave = async () => {
    if (!profile || !hasChanges) return;

    setSaving(true);
    const ref = doc(db, "users", profile.uid);
    await updateDoc(ref, {
      displayName: localProfile.displayName,
      phone: localProfile.phone,
    });

    setProfile((prev) =>
      prev ? { ...prev, ...localProfile } : null
    );
    setSaving(false);
    alert("Profile updated");
  };

  if (status === "loading" || loading) {
    return <Loader/>;
  }

  if (!session?.user?.email || !profile) {
    return <p className="text-center text-white">No profile found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 px-6 text-white">
      <div className="flex items-center gap-5 mb-8">
        <Image
          src={profile.photoURL || "/default-avatar.png"}
          alt="Profile"
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold">{profile.displayName}</h2>
          <p className="text-sm text-gray-400">{profile.email}</p>
          <span className="inline-block mt-1 text-xs px-3 py-1 bg-gray-800 text-gray-300 rounded-full">
            Role: {profile.role || "user"}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Full Name</label>
          <Input
            name="displayName"
            value={localProfile.displayName}
            onChange={handleChange}
            className="bg-transparent text-white border-gray-700 focus-visible:ring-0 focus-visible:border-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Phone Number</label>
          <Input
            name="phone"
            value={localProfile.phone}
            onChange={handleChange}
            placeholder="e.g., +62 812 3456 7890"
            className="bg-transparent text-white border-gray-700 focus-visible:ring-0 focus-visible:border-white"
          />
        </div>

        {hasChanges && (
          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full mt-2 bg-white text-black hover:bg-white/80 transition-colors"
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        )}
      </div>
    </div>
  );
}
