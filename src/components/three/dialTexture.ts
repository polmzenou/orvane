import * as THREE from "three";
import type { Complication } from "@/data/watches";

type DialOptions = {
  color: string;
  accent: string;
  complication: Complication;
  size?: number;
};

function shade(hex: string, amount: number) {
  const c = new THREE.Color(hex);
  const hsl = { h: 0, s: 0, l: 0 };
  c.getHSL(hsl);
  c.setHSL(hsl.h, hsl.s, Math.min(1, Math.max(0, hsl.l + amount)));
  return `#${c.getHexString()}`;
}

export function isLightColor(hex: string) {
  const c = new THREE.Color(hex);
  return c.r * 0.299 + c.g * 0.587 + c.b * 0.114 > 0.55;
}

function subdial(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, base: string, ink: string, ticks = 60) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, shade(base, -0.04));
  g.addColorStop(1, shade(base, -0.1));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  // azurage: concentric circles
  ctx.strokeStyle = shade(base, 0.06);
  ctx.globalAlpha = 0.35;
  ctx.lineWidth = 1;
  for (let i = 4; i < r; i += 4) {
    ctx.beginPath();
    ctx.arc(x, y, i, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.strokeStyle = ink;
  for (let i = 0; i < ticks; i++) {
    const a = (i / ticks) * Math.PI * 2;
    const long = i % (ticks / 12) === 0;
    const r1 = r * (long ? 0.74 : 0.84);
    ctx.lineWidth = long ? 3 : 1.2;
    ctx.beginPath();
    ctx.moveTo(x + Math.sin(a) * r1, y - Math.cos(a) * r1);
    ctx.lineTo(x + Math.sin(a) * r * 0.94, y - Math.cos(a) * r * 0.94);
    ctx.stroke();
  }
  ctx.lineWidth = 2;
  ctx.strokeStyle = shade(base, 0.12);
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
}

function moonAperture(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, accent: string) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, Math.PI, 0, false);
  ctx.closePath();
  ctx.clip();
  const sky = ctx.createLinearGradient(x, y - r, x, y);
  sky.addColorStop(0, "#08102a");
  sky.addColorStop(1, "#1c2d63");
  ctx.fillStyle = sky;
  ctx.fillRect(x - r, y - r, r * 2, r);
  for (let i = 0; i < 40; i++) {
    const sx = x - r + ((i * 97) % (r * 2));
    const sy = y - r + ((i * 53) % r);
    ctx.fillStyle = `rgba(243,238,228,${0.3 + ((i * 7) % 10) / 14})`;
    ctx.beginPath();
    ctx.arc(sx, sy, 1 + (i % 3) * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }
  const moon = ctx.createRadialGradient(x - r * 0.08, y - r * 0.55, 2, x, y - r * 0.5, r * 0.32);
  moon.addColorStop(0, "#fff3cf");
  moon.addColorStop(1, "#c9a86a");
  ctx.fillStyle = moon;
  ctx.beginPath();
  ctx.arc(x, y - r * 0.48, r * 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x, y, r, Math.PI, 0, false);
  ctx.closePath();
  ctx.stroke();
}

export function createDialTexture({ color, accent, complication, size = 1024 }: DialOptions) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const c = size / 2;
  const R = size / 2;
  const light = isLightColor(color);

  // Base: radial gradient
  const base = ctx.createRadialGradient(c, c * 0.8, size * 0.05, c, c, R);
  base.addColorStop(0, shade(color, light ? 0.04 : 0.1));
  base.addColorStop(0.7, color);
  base.addColorStop(1, shade(color, light ? -0.12 : -0.06));
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);

  // Sunburst rays (skip for enamel-like light dials)
  if (!light || complication === "chrono") {
    ctx.save();
    ctx.translate(c, c);
    for (let i = 0; i < 360; i++) {
      ctx.rotate((Math.PI * 2) / 360);
      ctx.fillStyle = i % 2 ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.04)";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(R, -2);
      ctx.lineTo(R, 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Aventurine sparkle for tourbillon
  if (complication === "tourbillon") {
    for (let i = 0; i < 900; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = Math.sqrt(Math.random()) * R * 0.95;
      ctx.fillStyle = `rgba(${200 + Math.random() * 55},${200 + Math.random() * 55},255,${Math.random() * 0.8})`;
      ctx.fillRect(c + Math.cos(a) * d, c + Math.sin(a) * d, Math.random() * 2.2, Math.random() * 2.2);
    }
  }

  const ink = light ? "#1a1a1a" : accent;
  // Minute track
  ctx.strokeStyle = ink;
  ctx.globalAlpha = 0.85;
  for (let i = 0; i < 60; i++) {
    const a = (i / 60) * Math.PI * 2;
    const five = i % 5 === 0;
    ctx.lineWidth = five ? 3 : 1.5;
    const r1 = R * (five ? 0.885 : 0.9);
    ctx.beginPath();
    ctx.moveTo(c + Math.sin(a) * r1, c - Math.cos(a) * r1);
    ctx.lineTo(c + Math.sin(a) * R * 0.94, c - Math.cos(a) * R * 0.94);
    ctx.stroke();
  }
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(c, c, R * 0.885, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Painted Roman numerals on light dials
  if (light && complication !== "chrono") {
    const romans = ["XII", "I", "II", "III", "IIII", "V", "VI", "VII", "VIII", "IX", "X", "XI"];
    ctx.fillStyle = ink;
    ctx.font = `500 ${size * 0.062}px "Cormorant Garamond", Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    romans.forEach((n, i) => {
      if (i === 6 && complication !== "date") return;
      const a = (i / 12) * Math.PI * 2;
      ctx.save();
      ctx.translate(c + Math.sin(a) * R * 0.76, c - Math.cos(a) * R * 0.76);
      ctx.rotate(a);
      ctx.fillText(n, 0, 0);
      ctx.restore();
    });
  }

  // Branding
  ctx.fillStyle = light ? "#1a1a1a" : accent;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `600 ${size * 0.05}px "Cormorant Garamond", Georgia, serif`;
  if ("letterSpacing" in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${size * 0.012}px`;
  ctx.fillText("ORVANE", c, c - R * 0.42);
  ctx.font = `400 ${size * 0.018}px Arial, sans-serif`;
  if ("letterSpacing" in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${size * 0.008}px`;
  ctx.fillText("GENÈVE", c, c - R * 0.34);
  ctx.globalAlpha = 0.7;
  ctx.font = `400 ${size * 0.014}px Arial, sans-serif`;
  ctx.fillText("SWISS MADE", c, c + R * 0.84);
  ctx.globalAlpha = 1;

  const sub = light ? shade(color, -0.05) : shade(color, 0.04);
  switch (complication) {
    case "moon":
      subdial(ctx, c, c + R * 0.45, R * 0.24, sub, ink, 31);
      moonAperture(ctx, c, c + R * 0.47, R * 0.17, accent);
      break;
    case "tourbillon":
      ctx.fillStyle = "#05070f";
      ctx.beginPath();
      ctx.arc(c, c + R * 0.45, R * 0.24, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = accent;
      ctx.lineWidth = 4;
      ctx.stroke();
      break;
    case "small-seconds":
      subdial(ctx, c, c + R * 0.45, R * 0.22, sub, ink);
      break;
    case "chrono":
      subdial(ctx, c - R * 0.42, c + R * 0.05, R * 0.2, accent, light ? "#e6e2d6" : "#111", 30);
      subdial(ctx, c + R * 0.42, c + R * 0.05, R * 0.2, accent, light ? "#e6e2d6" : "#111", 60);
      ctx.fillStyle = ink;
      ctx.font = `400 ${size * 0.016}px Arial, sans-serif`;
      ctx.fillText("MONOPOUSSOIR", c, c + R * 0.42);
      break;
    case "perpetual": {
      subdial(ctx, c - R * 0.42, c + R * 0.02, R * 0.19, sub, ink, 7);
      subdial(ctx, c + R * 0.42, c + R * 0.02, R * 0.19, sub, ink, 12);
      subdial(ctx, c, c + R * 0.45, R * 0.21, sub, ink, 31);
      moonAperture(ctx, c, c + R * 0.47, R * 0.14, ink);
      ctx.fillStyle = ink;
      ctx.font = `600 ${size * 0.02}px Arial, sans-serif`;
      ctx.fillText("LUN", c - R * 0.42, c + R * 0.11);
      ctx.fillText("OCT", c + R * 0.42, c + R * 0.11);
      break;
    }
    case "date": {
      const now = new Date();
      ctx.fillStyle = "#f3eee4";
      ctx.fillRect(c + R * 0.6, c - R * 0.06, R * 0.16, R * 0.12);
      ctx.strokeStyle = accent;
      ctx.lineWidth = 3;
      ctx.strokeRect(c + R * 0.6, c - R * 0.06, R * 0.16, R * 0.12);
      ctx.fillStyle = "#111";
      ctx.font = `600 ${size * 0.045}px Arial, sans-serif`;
      ctx.fillText(String(now.getDate()), c + R * 0.68, c + R * 0.005);
      ctx.fillStyle = ink;
      ctx.font = `500 ${size * 0.018}px Arial, sans-serif`;
      ctx.fillText("300 M · 1000 FT", c, c + R * 0.32);
      break;
    }
    case "gmt": {
      ctx.fillStyle = ink;
      ctx.font = `500 ${size * 0.018}px Arial, sans-serif`;
      ctx.fillText("GMT · 200 M", c, c + R * 0.32);
      break;
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

export function createBezelTexture(color: string, accent: string, size = 1024) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const c = size / 2;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = accent;
  ctx.strokeStyle = accent;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let i = 0; i < 60; i++) {
    const a = (i / 60) * Math.PI * 2;
    const rOuter = c * 0.97;
    if (i === 0) {
      ctx.save();
      ctx.translate(c + Math.sin(a) * c * 0.9, c - Math.cos(a) * c * 0.9);
      ctx.beginPath();
      ctx.moveTo(0, 18);
      ctx.lineTo(-22, -16);
      ctx.lineTo(22, -16);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      continue;
    }
    if (i % 10 === 0) {
      ctx.save();
      ctx.translate(c + Math.sin(a) * c * 0.9, c - Math.cos(a) * c * 0.9);
      ctx.rotate(a);
      ctx.font = `600 ${size * 0.05}px Arial, sans-serif`;
      ctx.fillText(String(i), 0, 0);
      ctx.restore();
    } else if (i < 15 || i % 5 === 0) {
      ctx.lineWidth = i % 5 === 0 ? 6 : 3;
      ctx.beginPath();
      ctx.moveTo(c + Math.sin(a) * c * 0.84, c - Math.cos(a) * c * 0.84);
      ctx.lineTo(c + Math.sin(a) * rOuter, c - Math.cos(a) * rOuter);
      ctx.stroke();
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}
