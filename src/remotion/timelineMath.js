export const sceneFrames = (scene, fps) => Math.max(1, Math.round(Math.max(0, Number(scene?.duration) || 4) * fps));

export const buildSceneSegments = (scenes, fps) => {
  let startFrame = 0;
  return scenes.map((scene, index) => {
    const durationInFrames = sceneFrames(scene, fps);
    const segment = {
      scene,
      index,
      startFrame,
      endFrame: startFrame + durationInFrames,
      durationInFrames,
      startSeconds: startFrame / fps,
      durationSeconds: durationInFrames / fps
    };
    startFrame += durationInFrames;
    return segment;
  });
};

export const projectFrames = (scenes, fps, audioDurationMs = 0) => {
  const sceneFrames = Math.max(fps, buildSceneSegments(scenes, fps).reduce((total, segment) => total + segment.durationInFrames, 0));
  const audioFrames = audioDurationMs ? Math.ceil((audioDurationMs / 1000) * fps) : 0;
  return Math.max(sceneFrames, audioFrames);
};

export const formatTimelineTime = seconds => {
  const safe = Math.max(0, Number(seconds) || 0);
  const minutes = Math.floor(safe / 60);
  const remainder = Math.floor(safe % 60);
  const tenths = Math.floor((safe % 1) * 10);
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}.${tenths}`;
};
