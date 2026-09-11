import path from "node:path";
import fs from "node:fs";
import os from "node:os";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition, makeCancelSignal } from "@remotion/renderer";
let bundlePromise = null;
const getBundle = async appRootDir => {
  const bundleCandidates = [process.env.FLOWTUBE_REMOTION_BUNDLE ? path.resolve(process.env.FLOWTUBE_REMOTION_BUNDLE) : null, process.resourcesPath ? path.join(process.resourcesPath, "remotion-bundle") : null, path.join(appRootDir, "dist-remotion"), path.resolve("dist-remotion")].filter(Boolean);
  for (const candidateDir of bundleCandidates) {
    const indexHtmlPath = path.join(candidateDir, "index.html");
    if (fs.existsSync(indexHtmlPath)) {
      console.log("[Remotion] Usando bundle pre-compilado en: " + candidateDir);
      return candidateDir;
    }
  }
  if (process.env.NODE_ENV !== "production") {
    bundlePromise = null;
  }
  const remotionRootDir = process.env.FLOWTUBE_REMOTION_ROOT ? path.resolve(process.env.FLOWTUBE_REMOTION_ROOT) : path.join(appRootDir, "src", "remotion");
  const isPackaged = Boolean(process.resourcesPath && !process.resourcesPath.includes("node_modules") && !process.resourcesPath.includes("electron"));
  const resourcesBaseDir = isPackaged ? process.env.FLOWSTUDIO_RESOURCES_PATH || process.resourcesPath || (process.platform === "darwin" && appRootDir.includes(".app") ? path.dirname(appRootDir) : null) : null;
  const appBaseDir = isPackaged ? process.env.FLOWSTUDIO_APP_PATH || appRootDir : appRootDir;
  const moduleSearchPaths = [resourcesBaseDir ? path.join(resourcesBaseDir, "app.asar.unpacked", "node_modules") : null, resourcesBaseDir ? path.join(resourcesBaseDir, "app.asar", "node_modules") : null, resourcesBaseDir ? path.join(resourcesBaseDir, "node_modules") : null, path.join(appBaseDir, "node_modules"), path.join(appRootDir, "node_modules"), path.join(remotionRootDir, "node_modules"), remotionRootDir, "node_modules"].filter(Boolean);
  const existingModulePaths = moduleSearchPaths.filter(modulePath => {
    if (modulePath === "node_modules" || modulePath === remotionRootDir) {
      return true;
    }
    try {
      return fs.existsSync(modulePath);
    } catch (err) {
      return false;
    }
  });
  bundlePromise ||= bundle({
    entryPoint: path.join(remotionRootDir, "entry.jsx"),
    rootDir: isPackaged ? remotionRootDir : appRootDir,
    webpackOverride: webpackConfig => {
      webpackConfig.context = isPackaged ? remotionRootDir : appRootDir;
      webpackConfig.resolve = webpackConfig.resolve || {};
      webpackConfig.resolve.modules = [...existingModulePaths, ...(webpackConfig.resolve.modules || [])];
      webpackConfig.resolve.roots = [];
      webpackConfig.resolve.symlinks = true;
      return webpackConfig;
    }
  });
  bundlePromise.catch(() => {
    bundlePromise = null;
  });
  return bundlePromise;
};
export const renderWithRemotion = async ({
  rootDir: rootDir,
  scenes: scenes,
  project: project,
  outputPath: outputPath,
  onProgress: onProgress,
  onCancelRegistered: onCancelRegistered
}) => {
  const helpers = {
    fLpbV: function (valueA, valueB) {
      return valueA === valueB;
    },
    sPMGU: "number",
    UJLtW: function (valueA, valueB) {
      return valueA * valueB;
    },
    iDIOC: function (valueA, valueB) {
      return valueA / valueB;
    },
    kUAbR: function (valueA, valueB) {
      return valueA || valueB;
    },
    iDrXz: function (valueA, valueB) {
      return valueA / valueB;
    },
    SLUbr: function (valueA, valueB) {
      return valueA || valueB;
    },
    DOOIn: function (valueA, valueB) {
      return valueA * valueB;
    },
    twqHT: function (valueA, valueB) {
      return valueA ?? valueB;
    },
    Xisib: function (valueA, valueB) {
      return valueA ?? valueB;
    },
    VmenI: "encoding",
    AqsXw: "rendering",
    QCIRx: function (fn, arg1, arg2) {
      return fn?.(arg1, arg2);
    },
    cwxZK: function (fn, arg1) {
      return fn(arg1);
    },
    QuwCh: "1080p",
    JEmkI: function (fn, arg1) {
      return fn(arg1);
    },
    CPBQV: function (fn, arg1) {
      return fn(arg1);
    },
    mQzXD: "FlowTubeVideo",
    uFXvX: function (fn) {
      return fn();
    },
    EVale: function (valueA, valueB) {
      return valueA === valueB;
    },
    HepGu: "--no-sandbox",
    lDTWP: "--disable-gpu",
    jLqMO: "--no-first-run",
    HRrRN: "--autoplay-policy=no-user-gesture-required",
    tlCFB: "--disable-renderer-backgrounding",
    skTov: "--disable-backgrounding-occluded-windows"
  };
  helpers.QCIRx(onProgress, 2, {
    renderedFrames: 0,
    totalFrames: 100
  });
  const bundleLocation = await helpers.cwxZK(getBundle, rootDir);
  onProgress?.(8, {
    renderedFrames: 0,
    totalFrames: 100
  });
  const binariesDirectory = process.env.FLOWTUBE_REMOTION_BINARIES ? path.resolve(process.env.FLOWTUBE_REMOTION_BINARIES) : null;
  const inputProps = {
    format: project.format,
    resolution: project.resolution || helpers.QuwCh,
    fps: helpers.JEmkI(Number, project.fps || 30),
    audioTrack: project.audioTrack || null,
    musicTrack: project.musicTrack || null,
    captionTrack: project.captionTrack || null,
    transitions: project.transitions || null,
    overlays: (project.overlays || []).map(overlay => ({
      ...overlay,
      imageUrl: overlay.publicSource || overlay.imageUrl
    })),
    scenes: scenes.map(scene => ({
      ...scene,
      imageUrl: scene.sourceType === "image" ? scene.publicSource : "",
      videoUrl: scene.sourceType === "video" ? scene.publicSource : "",
      flowVideoUrl: ""
    }))
  };
  const composition = await helpers.CPBQV(selectComposition, {
    serveUrl: bundleLocation,
    id: helpers.mQzXD,
    inputProps: inputProps,
    binariesDirectory: binariesDirectory
  });
  helpers.QCIRx(onProgress, 12, {
    renderedFrames: 0,
    totalFrames: composition.durationInFrames || 1
  });
  const {
    cancelSignal: cancelSignal,
    cancel: cancelRender
  } = helpers.uFXvX(makeCancelSignal);
  if (helpers.EVale(typeof onCancelRegistered, "function")) {
    onCancelRegistered(cancelRender);
  }
  const cpuCount = os.cpus()?.length || 2;
  const concurrency = Math.max(1, Math.min(4, Math.floor(helpers.iDIOC(cpuCount, 2))));
  await helpers.CPBQV(renderMedia, {
    serveUrl: bundleLocation,
    composition: composition,
    codec: "h264",
    outputLocation: outputPath,
    inputProps: inputProps,
    enforceAudioTrack: true,
    timeoutInMilliseconds: 120000,
    cancelSignal: cancelSignal,
    concurrency: concurrency,
    chromiumOptions: {
      disableWebSecurity: true,
      gl: "angle",
      args: [helpers.HepGu, "--disable-setuid-sandbox", "--disable-dev-shm-usage", helpers.lDTWP, helpers.jLqMO, helpers.HRrRN, "--disable-background-timer-throttling", helpers.tlCFB, helpers.skTov, "--disable-features=AudioServiceOutOfProcess"]
    },
    binariesDirectory: binariesDirectory,
    onProgress: ({
      renderedFrames: renderedFrames,
      encodedFrames: encodedFrames,
      progress: progress,
      stitchStage: stitchStage
    }) => {
      const totalFrames = composition.durationInFrames || 1;
      let percent;
      if (helpers.fLpbV(typeof progress, helpers.sPMGU) && !isNaN(progress)) {
        percent = Math.min(99, Math.max(0, Math.round(helpers.UJLtW(progress, 100))));
      } else {
        const renderRatio = Math.min(1, helpers.iDIOC(helpers.kUAbR(renderedFrames, 0), totalFrames));
        const encodeRatio = Math.min(1, helpers.iDrXz(helpers.SLUbr(encodedFrames, 0), totalFrames));
        percent = Math.min(99, Math.round(helpers.UJLtW(helpers.UJLtW(renderRatio, 0.7) + helpers.DOOIn(encodeRatio, 0.3), 100)));
      }
      onProgress?.(percent, {
        renderedFrames: helpers.twqHT(renderedFrames, 0),
        encodedFrames: helpers.Xisib(encodedFrames, 0),
        totalFrames: totalFrames,
        stitchStage: stitchStage || (renderedFrames >= totalFrames ? helpers.VmenI : helpers.AqsXw),
        remotionProgress: progress
      });
    }
  });
  return outputPath;
};