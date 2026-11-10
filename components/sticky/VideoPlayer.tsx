"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

function clock(value: number) {
  if (!Number.isFinite(value) || value < 0) return "0:00";
  const total = Math.floor(value);
  const minutes = Math.floor(total / 60);
  const seconds = String(total % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function VideoPlayer({
  src,
  poster,
  width,
  height,
}: {
  src: string;
  poster: string;
  width: number;
  height: number;
}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const sync = () => {
      if (Number.isFinite(video.duration)) setDuration(video.duration);
      setTime(video.currentTime || 0);
      setPlaying(!video.paused);
    };
    const onError = () => setMissing(true);

    video.addEventListener("timeupdate", sync);
    video.addEventListener("loadedmetadata", sync);
    video.addEventListener("durationchange", sync);
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    video.addEventListener("error", onError);
    sync();
    return () => {
      video.removeEventListener("timeupdate", sync);
      video.removeEventListener("loadedmetadata", sync);
      video.removeEventListener("durationchange", sync);
      video.removeEventListener("play", sync);
      video.removeEventListener("pause", sync);
      video.removeEventListener("error", onError);
    };
  }, []);

  useEffect(() => {
    const onChange = () => setExpanded(document.fullscreenElement === shellRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video || missing) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  const seek = (value: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = value;
    setTime(value);
  };

  const changeVolume = (value: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = value;
    video.muted = value === 0;
    setVolume(value);
  };

  const toggleFullscreen = () => {
    const node = shellRef.current;
    if (!node) return;
    if (document.fullscreenElement === node) void document.exitFullscreen();
    else void node.requestFullscreen();
  };

  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === " " || event.key === "k") {
      event.preventDefault();
      toggle();
    }
    if (event.key === "ArrowRight") seek(Math.min(duration, time + 5));
    if (event.key === "ArrowLeft") seek(Math.max(0, time - 5));
  };

  return (
    <div
      ref={shellRef}
      className="mt-6 bg-black outline-none [&:fullscreen]:flex [&:fullscreen]:h-full [&:fullscreen]:flex-col [&:fullscreen]:justify-center [&:fullscreen]:bg-black [&:fullscreen]:p-4"
      tabIndex={0}
      onKeyDown={onKey}
      aria-label="Sticky music video"
    >
      <div className="relative bg-black" style={{ aspectRatio: `${width} / ${height}` }}>
        {missing ? (
          <div className="absolute inset-0 flex items-center justify-center border border-white/15 px-6">
            <p className="kicker text-center text-[#999999]">public/videos/sticky.mp4</p>
          </div>
        ) : (
          <video
            ref={videoRef}
            className="h-full w-full"
            poster={poster}
            preload="metadata"
            playsInline
            width={width}
            height={height}
            onClick={toggle}
          >
            <source src={src} type="video/mp4" />
          </video>
        )}
      </div>

      <div className="flex min-h-11 items-center gap-3 border-t border-white/15 sm:gap-4">
        <button type="button" onClick={toggle} className="link-line kicker flex h-11 w-14 shrink-0 items-center text-left" aria-label={playing ? "Pause" : "Play"}>
          {playing ? "Pause" : "Play"}
        </button>
        <p className="kicker w-[5.5rem] shrink-0 tabular-nums text-[#999999]" aria-label={`${clock(time)} of ${clock(duration)}`}>
          {clock(time)} / {clock(duration)}
        </p>
        <label className="sr-only" htmlFor="sticky-seek">
          Seek
        </label>
        <input
          id="sticky-seek"
          className="h-8 min-w-0 flex-1 cursor-pointer accent-[#C7FF3D]"
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={Math.min(time, duration || 0)}
          aria-valuemin={0}
          aria-valuemax={Math.round(duration || 0)}
          aria-valuenow={Math.round(time)}
          aria-label="Seek"
          onChange={(event) => seek(Number(event.target.value))}
        />
        <label className="sr-only" htmlFor="sticky-volume">
          Volume
        </label>
        <input
          id="sticky-volume"
          className="h-8 w-16 shrink-0 cursor-pointer accent-[#C7FF3D] sm:w-24"
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          aria-label="Volume"
          onChange={(event) => changeVolume(Number(event.target.value))}
        />
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-pressed={expanded}
          className="link-line kicker flex h-11 w-16 shrink-0 items-center justify-end"
        >
          {expanded ? "Close" : "Expand"}
        </button>
      </div>
    </div>
  );
}
