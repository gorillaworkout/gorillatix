"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="loader-spinner" />
        <p className="text-white text-sm font-medium tracking-wide">Loading GorillaTix...</p>
      </div>
    </div>
  );
}
