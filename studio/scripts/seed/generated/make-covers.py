import json
import os

COURSES = [
    ("nextjs-app-router-in-depth", "Next.js App Router in Depth", "#0d1117", "#3fb1ff"),
    ("react-performance-engineering", "React Performance Engineering", "#111827", "#61dafb"),
    ("typescript-for-application-developers", "TypeScript for Application Developers", "#0f172a", "#3178c6"),
    ("building-ai-apps-with-llms", "Building AI Apps with LLMs", "#171018", "#c084fc"),
    ("retrieval-augmented-generation-from-scratch", "Retrieval-Augmented Generation from Scratch", "#130f1f", "#a78bfa"),
    ("python-for-data-work", "Python for Data Work", "#0f1a12", "#ffd43b"),
    ("system-design-foundations", "System Design Foundations", "#0b1220", "#38bdf8"),
    ("postgresql-for-developers", "PostgreSQL for Developers", "#0d1420", "#4f8fd6"),
    ("devops-with-docker-and-kubernetes", "DevOps with Docker and Kubernetes", "#0e1613", "#2496ed"),
    ("practical-web-security", "Practical Web Security", "#180f0f", "#f97066"),
]

OUT_DIR = os.path.join(os.path.dirname(__file__), "assets", "covers")
os.makedirs(OUT_DIR, exist_ok=True)


def wrap(title, max_chars=18):
    words = title.split()
    lines, cur = [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if len(trial) > max_chars and cur:
            lines.append(cur)
            cur = w
        else:
            cur = trial
    if cur:
        lines.append(cur)
    return lines


for slug, title, bg, accent in COURSES:
    lines = wrap(title)
    line_height = 64
    start_y = 450 - (len(lines) - 1) * line_height / 2
    text_svg = "\n".join(
        f'<text x="120" y="{start_y + i * line_height:.0f}" font-family="Helvetica, Arial, sans-serif" '
        f'font-size="52" font-weight="700" fill="#f8fafc">{line}</text>'
        for i, line in enumerate(lines)
    )
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{bg}"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#bg)"/>
  <circle cx="1420" cy="140" r="220" fill="{accent}" opacity="0.18"/>
  <circle cx="1500" cy="780" r="160" fill="{accent}" opacity="0.14"/>
  <rect x="120" y="120" width="90" height="10" fill="{accent}"/>
  {text_svg}
  <text x="120" y="820" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="{accent}">Vertex</text>
</svg>"""
    with open(os.path.join(OUT_DIR, f"{slug}.svg"), "w") as f:
        f.write(svg)

print(f"wrote {len(COURSES)} covers to {OUT_DIR}")
