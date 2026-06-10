# ETHS Rocketry Site Content + Layout Reference

This site is organized around two top-level authoring folders:

- `Layouts/` contains every HTML layout/page.
- `Content/` contains every Markdown-style data page consumed by its matching layout.

Most layouts fetch their content file in the browser with `fetch('../Content/<name>_data.md')`, so content paths for images, videos, and PDFs should be written relative to the HTML page in `Layouts/` (for example `../assets/arc-media/arc26-media/file.png`).

## Global site conventions

### Navigation and shared UI

All layouts use the same top navigation pattern:

- Primary pages: `home.html`, `arc.html`, `r4s.html`, `history.html`, `people.html`, `releases.html`, and `join-us.html`.
- Member pages: `member-tools.html`, `info-base.html`, `arc-org.html`, and `r4s-org.html`.
- Signed-in member-only links are hidden until `sessionStorage['etrb_auth'] === '1'`.
- The sign-out button is a `member-only` top-nav item on the far-right side of the main navigation.
- The visible ARC label should remain `ARC` everywhere, not `ARC 2026`.

### Shared typography

Every page uses the same Google font stack:

- Display headings: `Space Grotesk` through `--font-display`.
- Body/interface text: `Inter` through `--font-sans`.
- Technical labels and metadata: `JetBrains Mono` through `--font-mono`.

### Shared scrollbar

The custom scrollbar style is standardized from the ARC page and applies to the document plus PDF/modal scroll containers:

- `html` / `body`
- `.viewport-window-body`
- `.pdf-embedded-body`

## Layout + content map

| Layout file | Content file | Purpose |
| --- | --- | --- |
| `Layouts/home.html` | Static HTML only | Landing page, program tiles, sponsors, and hero video. |
| `Layouts/arc.html` | `Content/arc_data.md` | American Rocketry Challenge program page with about text, yearly campaign sections, media embeds, carousels, and PDFs. |
| `Layouts/r4s.html` | `Content/r4s_data.md` | Rockets 4 Schools program page using the same year/campaign parser as ARC. |
| `Layouts/history.html` | `Content/history_data.md` | Timeline/history page parsed from standard Markdown headings and lists. |
| `Layouts/people.html` | `Content/people_data.md` | People directory parsed from custom `section`, `person`, and `contact` functions. |
| `Layouts/releases.html` | `Content/releases_data.md` | Release/news feed parsed from release blocks with metadata. |
| `Layouts/join-us.html` | `Content/join-us_data.md` | Recruitment page copy reference with page header, learning sections, and Discord CTA fields. |
| `Layouts/member-tools.html` | `Content/member-tools_data.md` | Signed-in dashboard of member resources. |
| `Layouts/info-base.html` | `Content/info-base_data.md` | Signed-in searchable knowledge/resource base. |
| `Layouts/arc-org.html` | `Content/arc-org_data.md` | Signed-in ARC organization drive/resource page. |
| `Layouts/r4s-org.html` | `Content/r4s-org_data.md` | Signed-in R4S organization drive/resource page. |
| `Layouts/index.html` | Static redirect only | Redirects to `home.html` inside `Layouts/`. |

## `Content/arc_data.md` and `Layouts/arc.html`

`arc.html` renders ARC campaign content from `arc_data.md`.

### Available syntax

#### About block

```md
[ABOUT-START]
### About the Program
Standard markdown content...
[ABOUT-END]
```

- Content between the markers appears in the program intro area.
- Standard Markdown-like headings, paragraphs, lists, bold text, links, and media macros can be used inside.

#### Year block

```md
[YEAR-START: 2026]
title: Lil' Willy: Active Control
mission: Active Airbrakes
header_image: ../assets/arc-media/arc26-media/full assembly render 1.png
header_alt: Custom telemetry background image for 2026 logs

Campaign body content...
[YEAR-END: 2026]
```

Required/recognized fields:

- `title:` campaign title.
- `mission:` short mission/sub-nav label.
- `header_image:` optional image path.
- `header_alt:` optional alt text for the header image.

#### Markdown and media functions

```md
### Heading 3
#### Heading 4
* Bullet item
- Bullet item
**bold text**
[link text](https://example.com)
```

```md
[[pdf: ../assets/arc-media/arc26-media/file.pdf, Display Title, false]]
[[carousel: ../assets/arc-media/arc26-media/image.png, ../assets/arc-media/arc26-media/video.mp4]]
[[youtube: DBYvCB82rY4, Launch #1]]
*Tags: C++ Avionics, Python SIL Sim*
```

Available functions:

- `[[pdf: path, title, embeddedFlag]]` renders a PDF asset. Use `false` for a downloadable/openable item or the layout-supported embedded mode where applicable.
- `[[carousel: item1, item2, ...]]` renders an image/video carousel. Items may be image files, MP4 files, or supported media paths.
- `[[youtube: videoId, caption]]` embeds a YouTube video by ID.
- `*Tags: ...*` renders tags/metadata in the campaign body.

## `Content/r4s_data.md` and `Layouts/r4s.html`

`r4s.html` uses the same parser and functions as `arc.html`.

### Available syntax

Use the same blocks and functions documented for `arc_data.md`:

- `[ABOUT-START]` / `[ABOUT-END]`
- `[YEAR-START: YYYY]` / `[YEAR-END: YYYY]`
- `title:`, `mission:`, `header_image:`, `header_alt:`
- Standard Markdown-like headings/lists/bold/links
- `[[pdf: path, title, embeddedFlag]]`
- `[[carousel: item1, item2, ...]]`
- `[[youtube: videoId, caption]]`
- `*Tags: ...*`

## `Content/history_data.md` and `Layouts/history.html`

`history.html` renders a chronological timeline from Markdown.

### Available syntax

```md
# Page Title

## Month YYYY · Milestone Title
- **Highlighted label**
- Plain list item
- Additional timeline detail

---

_Optional italic note._
```

Available Markdown features:

- `#` page title.
- `##` timeline event headings.
- `-` bullet details under an event.
- `**bold text**` for emphasis.
- `_italic text_` for notes.
- `---` horizontal separator.

## `Content/people_data.md` and `Layouts/people.html`

`people.html` renders team member cards from custom line-based functions.

### Available syntax

```md
// Comments are ignored
section(current members)

person(Name, ../assets/people-media/photo.jpg, "Short bio text.", "Class of 2027")
contact(LinkedIn, https://www.linkedin.com/in/example/)
contact(Email, mailto:name@example.com)
endperson
```

Available functions:

- `section(title)` starts a people section. Examples: `section(current members)`, `section(alumni)`.
- `person(name, image path, "bio", "optional meta")` starts one person entry.
  - Argument 1: name.
  - Argument 2: image path.
  - Argument 3: quoted bio text.
  - Argument 4: optional quoted metadata such as class year.
- `contact(method, url)` adds a contact button to the current person.
  - Common methods: `Email`, `LinkedIn`, `GitHub`, `Instagram`, `Website`.
  - Email links should use `mailto:`.
- `endperson` closes the current person entry.
- Lines beginning with `//` are comments.

## `Content/releases_data.md` and `Layouts/releases.html`

`releases.html` renders release/news entries from repeated release blocks.

### Available syntax

```md
## Release Title
- date: 2026-05-01
- mode: embed
- url: ../assets/arc-media/arc26-media/ARC Launch 1 Release.mp4
- summary: Optional short summary text.
---
Markdown body content for the release.
```

Recognized metadata:

- `date:` release date in `YYYY-MM-DD` format.
- `mode:` display behavior.
  - `embed` embeds the referenced media in-page where supported.
  - `tab` creates an in-page release body tab.
  - `link` opens the `url` directly.
- `url:` target URL or media file.
- `summary:` optional summary for the release list.

Body content supports standard Markdown-like text plus the page's media renderer where applicable.


## `Content/join-us_data.md` and `Layouts/join-us.html`

`join-us_data.md` stores editable recruitment copy in a simple Markdown-plus-field format for the Join Us page.

### Available syntax

```md
# Join Us Page Content

## Page Header
**eyebrow:** BUILD WITH US
**title:** Join ETHS Rocketry
**subtitle:** Short introductory copy.

## Section 1: What you will learn by doing
**heading:** What you will learn by doing

**skills:**
- **title:** Rocketry fundamentals
  **description:** Skill-card description.

## Section 2: Academic and STEM growth
**heading:** Academic and STEM growth

**items:**
- Bullet item text.

## Section 3: Preparation for collegiate rocketry
**heading:** Preparation for collegiate rocketry

**content:** Paragraph text.
**discord_button:** Join our Discord →
**discord_link:** https://discord.gg/example
```

Available fields/functions:

- `# Join Us Page Content` labels the file.
- `## Page Header` starts header metadata.
- `**eyebrow:**`, `**title:**`, and `**subtitle:**` define the page header copy.
- `## Section N: Name` starts a content section.
- `**heading:**` defines a section heading.
- `**skills:**` starts a list of skill cards.
- `- **title:**` and indented `**description:**` define each skill card.
- `**items:**` starts a bullet list for academic/STEM points.
- `**content:**` defines paragraph copy.
- `**discord_button:**` defines CTA button text.
- `**discord_link:**` defines the CTA URL.

## `Content/member-tools_data.md` and `Layouts/member-tools.html`

`member-tools.html` renders signed-in dashboard cards.

### Available syntax

```md
tag(TOOLS)
## Section Heading

card(Title, Description, IconPreset, TargetURL)
card(Title, Description, IconPreset, TargetURL, WIP)
```

Available functions:

- `tag(TEXT)` sets the small uppercase label for the next section.
- `## Section Heading` starts a card grid section.
- `card(Title, Description, IconPreset, TargetURL)` renders a tool/resource card.
- `card(Title, Description, IconPreset, TargetURL, BadgeText)` renders a card with a small status badge, such as `WIP`.

Icon presets:

- `library`
- `flight`
- `notes`
- `schedule`
- `infobase`

Target URLs may be local layout files such as `info-base.html` or external URLs.

## `Content/info-base_data.md` and `Layouts/info-base.html`

`info-base.html` renders a searchable signed-in resource base.

### Available syntax

```md
# Main Category | Short Label
## Subsection Title
link(Title, Description, TYPE, URL)
```

Available functions:

- `# Category | Label` starts a category. The text before `|` is the category title; the text after `|` is a short navigation/status label.
- `## Subsection Title` starts a subsection within the current category.
- `link(Title, Description, TYPE, URL)` renders a searchable document/resource row.
  - `TYPE` examples: `DOC`, `PDF`, `WEB`, `VIDEO`, `CAD`, `WIP`.
  - `URL` can be a local page, external webpage, Google Doc, Drive folder, or media file.

## `Content/arc-org_data.md` and `Layouts/arc-org.html`

`arc-org.html` renders signed-in ARC organizational resources.

### Available syntax

```md
// Comments are ignored
tag(OPERATIONS)
## Cloud Resources & Shared Drives

card(Master Folder, Description, library, https://drive.google.com/drive/folders/example)

embed(https://drive.google.com/drive/folders/example)
```

Available functions:

- `tag(TEXT)` sets the small uppercase label for the next section.
- `## Section Heading` starts a card/grid or embed section.
- `card(Title, Description, IconPreset, TargetURL)` renders an external resource card.
- `embed(GOOGLE_DRIVE_EMBED_URL)` renders an iframe-style live Drive view.
- Lines beginning with `//` are comments.

Icon presets:

- `library`
- `flight`
- `notes`
- `schedule`
- `infobase`

## `Content/r4s-org_data.md` and `Layouts/r4s-org.html`

`r4s-org.html` uses the same organization-resource parser as `arc-org.html`.

### Available syntax

Use the same functions documented for `arc-org_data.md`:

- `tag(TEXT)`
- `## Section Heading`
- `card(Title, Description, IconPreset, TargetURL)`
- `embed(GOOGLE_DRIVE_EMBED_URL)`
- `// comment lines`

Icon presets are the same: `library`, `flight`, `notes`, `schedule`, and `infobase`.

## Static HTML-only pages

### `Layouts/home.html`

The home page is static HTML and does not fetch a Markdown content file. Edit program tiles, sponsor rows, hero text, and hero video directly in the layout.

### `Layouts/index.html`

The index page is a redirect shim that sends visitors to `home.html` from inside the `Layouts/` folder.
