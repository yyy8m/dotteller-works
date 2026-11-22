import { CalculateMetadataFunction, Composition, AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/DotGothic16";

const { fontFamily } = loadFont();

type Props = { title: string; hook: string; series: string };

const calculateMetadata: CalculateMetadataFunction<Props> = () => ({});

// Short (1080x1920) top band: the title pops in letter by letter, the red hook types out under it.
// Transparent everywhere else, so it can be laid over the engine's Short for its first seconds.
export const MyComposition = () => (
  <Composition
    id="ShortTitle"
    component={ShortTitle}
    durationInFrames={105}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={{ title: "押絵と旅する男", hook: "さかさに覗いてはいけません", series: "文庫 #008" }}
    calculateMetadata={calculateMetadata}
  />
);

export const ShortTitle: React.FC<Props> = ({ title, hook }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const chars = Array.from(title);
  const hookChars = Array.from(hook);
  const typed = Math.min(hookChars.length, Math.max(0, Math.floor((frame - 14) / 1.6)));
  const out = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleSize = chars.length > 8 ? 72 : 96;
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <div style={{ position: "absolute", top: 72, left: 0, width: 1080, height: 318, background: "#05080a" }} />
      <div style={{ position: "absolute", top: 92, width: 1080, display: "flex", justifyContent: "center", fontFamily, fontSize: titleSize, color: "#ffffff", textShadow: "6px 6px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000" }}>
        {chars.map((ch, i) => {
          const s = spring({ frame: frame - i, fps, config: { damping: 9, stiffness: 180 } });
          const scale = interpolate(s, [0, 1], [1.3, 1]);
          const y = interpolate(s, [0, 1], [0, 0]);
          return <span key={i} style={{ display: "inline-block", transform: `translateY(${y}px) scale(${scale})` }}>{ch}</span>;
        })}
      </div>
      <div style={{ position: "absolute", top: 230, width: 1080, display: "flex", justifyContent: "center", fontFamily, fontSize: 64, color: "#ff3c3c", textShadow: "5px 5px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000" }}>
        <span>{hookChars.slice(0, typed).join("")}</span>
        <span style={{ opacity: typed < hookChars.length && Math.floor(frame / 4) % 2 === 0 ? 1 : 0 }}>▌</span>
      </div>
      <div style={{ position: "absolute", top: 384, left: 0, width: 1080 * interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" }), height: 6, background: "#f0a030" }} />
    </AbsoluteFill>
  );
};
