import React from "react";
import { Composition } from "remotion";
import { YouTubeComposition } from "./YouTubeComposition";
import { projectFrames } from "./timelineMath";

const metadata = ({ props }) => {
  const fps = Number(props.fps || 30);
  const res = String(props.resolution || "1080p").toLowerCase();
  let baseWidth = 1920;
  let baseHeight = 1080;

  if (res === "720p") {
    baseWidth = 1280;
    baseHeight = 720;
  } else if (res === "2k" || res === "1440p") {
    baseWidth = 2560;
    baseHeight = 1440;
  } else if (res === "4k" || res === "2160p") {
    baseWidth = 3840;
    baseHeight = 2160;
  } else {
    baseWidth = 1920;
    baseHeight = 1080;
  }

  const format = props.format === "short"
    ? { width: baseHeight, height: baseWidth }
    : { width: baseWidth, height: baseHeight };

  const durationInFrames = projectFrames(props.scenes || [], fps, props.audioTrack?.durationMs || 0);
  return { ...format, fps, durationInFrames };
};

export const RemotionRoot = () => (
  <Composition
    id="FlowTubeVideo"
    component={YouTubeComposition}
    width={1920}
    height={1080}
    fps={30}
    durationInFrames={300}
    defaultProps={{ format: "youtube", fps: 30, scenes: [] }}
    calculateMetadata={metadata}
  />
);
