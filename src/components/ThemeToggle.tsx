interface Props {
  theme: "light" | "dark";
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <button className="btn ghost" onClick={onToggle}>
      {theme === "light" ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
}
