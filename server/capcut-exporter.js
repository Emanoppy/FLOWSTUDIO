import path from "node:path";
import fs from "node:fs";
import os from "node:os";
export async function exportToCapCutDraft({
  project: project,
  draftName = null,
  rootDir = process.cwd()
}) {
  const safeDraftName = String(draftName || project.name || "FlowDraft_" + Date.now()).replace(/[\\/:*?"<>|]/g, "_");
  const localAppDataDir = process.env.LOCALAPPDATA || path.join(os.homedir(), "AppData", "Local");
  const windowsCapCutDraftsDir = path.join(localAppDataDir, "CapCut", "User Data", "Projects", "com.lveditor.draft");
  const macCapCutDraftsDir = path.join(os.homedir(), "Movies", "CapCut", "User Data", "Projects", "com.lveditor.draft");
  let capCutDraftsBaseDir = null;
  if (process.platform === "win32" && fs.existsSync(windowsCapCutDraftsDir)) {
    capCutDraftsBaseDir = windowsCapCutDraftsDir;
  } else if (process.platform === "darwin" && fs.existsSync(macCapCutDraftsDir)) {
    capCutDraftsBaseDir = macCapCutDraftsDir;
  } else {
    capCutDraftsBaseDir = path.join(rootDir, "exports", "capcut_drafts");
  }
  const draftDir = path.join(capCutDraftsBaseDir, safeDraftName);
  fs.mkdirSync(draftDir, {
    recursive: true
  });
  const templatesDir = path.join(rootDir, "public", "templates");
  const draftTemplatePath = path.join(templatesDir, "capcut_draft_empty.json");
  const draftMetaTemplatePath = path.join(templatesDir, "capcut_draft_meta_empty.json");
  let draftContent = {};
  let draftMeta = {};
  try {
    draftContent = JSON.parse(fs.readFileSync(draftTemplatePath, "utf-8"));
  } catch (err) {
    draftContent = {
      canvas_config: {
        height: project.format === "short" ? 1920 : 1080,
        width: project.format === "short" ? 1080 : 1920,
        ratio: project.format === "short" ? "9:16" : "16:9"
      },
      tracks: [],
      materials: {
        videos: [],
        audios: [],
        texts: [],
        speeds: []
      }
    };
  }
  try {
    draftMeta = JSON.parse(fs.readFileSync(draftMetaTemplatePath, "utf-8"));
  } catch (err) {
    draftMeta = {
      draft_id: "draft_" + Date.now(),
      draft_name: safeDraftName,
      draft_fold_path: draftDir
    };
  }
  const fps = Number(project.fps || 30);
  const isShort = project.format === "short";
  draftContent.canvas_config = {
    height: isShort ? 1920 : 1080,
    width: isShort ? 1080 : 1920,
    ratio: isShort ? "9:16" : "16:9"
  };
  draftContent.fps = fps;
  const videoMaterials = [];
  const videoSegments = [];
  let timelineCursorUs = 0;
  const scenes = Array.isArray(project.scenes) ? project.scenes : [];
  scenes.forEach((scene, index) => {
    const durationSec = Math.max(0.5, Number(scene.duration || 4));
    const durationUs = Math.round(durationSec * 1000000);
    const sourcePath = scene.publicSource || scene.videoUrl || scene.imageUrl || "";
    const materialId = "mat_vid_" + index + "_" + Date.now();
    const segmentId = "seg_vid_" + index + "_" + Date.now();
    videoMaterials.push({
      id: materialId,
      path: sourcePath,
      type: scene.sourceType === "video" ? "video" : "photo",
      duration: durationUs
    });
    videoSegments.push({
      id: segmentId,
      material_id: materialId,
      target_timerange: {
        duration: durationUs,
        start: timelineCursorUs
      },
      source_timerange: {
        duration: durationUs,
        start: 0
      }
    });
    timelineCursorUs += durationUs;
  });
  draftContent.materials = draftContent.materials || {};
  draftContent.materials.videos = videoMaterials;
  draftContent.tracks = [{
    id: "track_main_video_" + Date.now(),
    type: "video",
    segments: videoSegments
  }];
  if (project.audioTrack?.url) {
    const audioDurationUs = Math.round(Number(project.audioTrack.durationMs || 1000) * 1000);
    const audioMaterialId = "mat_aud_voice_" + Date.now();
    draftContent.materials.audios = [{
      id: audioMaterialId,
      path: project.audioTrack.url,
      duration: audioDurationUs
    }];
    draftContent.tracks.push({
      id: "track_audio_voice_" + Date.now(),
      type: "audio",
      segments: [{
        id: "seg_aud_voice_" + Date.now(),
        material_id: audioMaterialId,
        target_timerange: {
          duration: audioDurationUs,
          start: 0
        },
        source_timerange: {
          duration: audioDurationUs,
          start: 0
        }
      }]
    });
  }
  draftMeta.draft_name = safeDraftName;
  draftMeta.draft_fold_path = draftDir;
  draftMeta.tm_draft_create = Date.now() * 1000;
  draftMeta.tm_draft_modified = Date.now() * 1000;
  draftMeta.draft_timeline_materials_size = videoSegments.length;
  fs.writeFileSync(path.join(draftDir, "draft_content.json"), JSON.stringify(draftContent, null, 2));
  fs.writeFileSync(path.join(draftDir, "draft_meta_info.json"), JSON.stringify(draftMeta, null, 2));
  return {
    success: true,
    draftName: safeDraftName,
    projectDir: draftDir,
    isLocalCapCutDir: capCutDraftsBaseDir === windowsCapCutDraftsDir || capCutDraftsBaseDir === macCapCutDraftsDir
  };
}