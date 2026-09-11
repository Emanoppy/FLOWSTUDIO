import { describe, it, expect } from "vitest";
import { motionStyle } from "./YouTubeComposition";

describe("Remotion motionStyle & Keyframe Motion Engine", () => {
  it("computes default preset zoom correctly", () => {
    const start = motionStyle("gentle-zoom-in", 0, 100);
    const end = motionStyle("gentle-zoom-in", 99, 100);

    expect(Number(start.scale)).toBeCloseTo(1.03, 1);
    expect(Number(end.scale)).toBeCloseTo(1.11, 1);
  });

  it("handles still motion with fixed scale and no translation", () => {
    const style = motionStyle("still", 50, 100);
    expect(style.scale).toBe("1.01");
  });

  it("renders custom keyframe motion with custom scale, pan and rotation", () => {
    const customConfig = {
      startScale: 1.0,
      endScale: 1.5,
      startX: -5,
      endX: 10,
      startY: 2,
      endY: -8,
      startRotation: -3,
      endRotation: 4,
      easing: "linear"
    };

    const atStart = motionStyle("custom", 0, 100, customConfig);
    expect(Number(atStart.scale)).toBeCloseTo(1.0, 2);
    expect(atStart.translate).toBe("-5% 2%");
    expect(atStart.rotate).toBe("-3deg");

    const atEnd = motionStyle("custom", 99, 100, customConfig);
    expect(Number(atEnd.scale)).toBeCloseTo(1.5, 2);
    expect(atEnd.translate).toBe("10% -8%");
    expect(atEnd.rotate).toBe("4deg");

    // At frame 49 (approx 50% progress with linear easing)
    const atMid = motionStyle("custom", 49.5, 100, customConfig);
    expect(Number(atMid.scale)).toBeCloseTo(1.25, 1);
  });

  it("supports dramatic impact easing for crash zooms", () => {
    const customConfig = {
      startScale: 1.0,
      endScale: 2.0,
      easing: "dramatic"
    };

    const atQuarter = motionStyle("custom", 25, 100, customConfig);
    expect(Number(atQuarter.scale)).toBeGreaterThan(1.0);
    expect(Number(atQuarter.scale)).toBeLessThan(2.0);
  });
});
