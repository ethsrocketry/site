# ETHS Rocketry Website

This repository is a simple static website for ETHS Rocketry. The actual page templates live in `Layouts/`, and the content is stored in `Content/`.

## How the site works

- `index.html` is the main entry point and redirects visitors into `Layouts/home.html`.
- The root HTML files such as `home.html`, `arc.html`, `r4s.html`, `history.html`, and `join-us.html` are redirect wrappers that send the browser to the same page under `Layouts/`.
- Most of the pages in `Layouts/` load a matching markdown-style file from `Content/` using `fetch()`.
- Many of the `Layouts/` pages are dynamic: they parse custom syntax from the content files and render the page in the browser.
- The site does not require a build process. Open `index.html` in a browser or serve the folder with any static server.

## Folder structure

- `Layouts/` - actual HTML page templates, shared styles, navigation, and page-specific rendering logic.
- `Content/` - markdown-style data files that drive the dynamic pages.
- `site-media/`, `arc26-media/`, `people-media/`, `sponsors-media/` - image, video, PDF, and asset folders used by content pages.

## Main pages and data files

| Page | Layout | Content file | Notes |
| --- | --- | --- | --- |
| Home | `Layouts/home.html` | none | Static landing page.
| ARC | `Layouts/arc.html` | `Content/arc_data.md` | Program page with campaign sections, carousels, PDFs, and videos.
| R4S | `Layouts/r4s.html` | `Content/r4s_data.md` | Uses the same campaign parser as ARC.
| History | `Layouts/history.html` | `Content/history_data.md` | Timeline page from simple headings and lists.
| People | `Layouts/people.html` | `Content/people_data.md` | Team directory from custom person blocks.
| Releases | `Layouts/releases.html` | `Content/releases_data.md` | News feed parser with tabs and optional links.
| Join Us | `Layouts/join-us.html` | none | Static recruitment page.
| Member Tools | `Layouts/member-tools.html` | `Content/member-tools_data.md` | Member dashboard cards.
| Info Base | `Layouts/info-base.html` | `Content/info-base_data.md` | Searchable member knowledge base.
| ARC Org | `Layouts/arc-org.html` | `Content/arc-org_data.md` | Member ARC resources page.
| R4S Org | `Layouts/r4s-org.html` | `Content/r4s-org_data.md` | Member R4S resources page.
| Shared shell | `Layouts/default.html` | none | Shared navigation and font/theme template.
| Shared JS | `Layouts/default.js` | none | Theme toggle, member UI, nav activation.

## Important authoring rules

- All pages in `Layouts/` expect assets and image paths relative to the page file location in `Layouts/`.
- Content files live in `Content/`, so asset references in those files should usually start with `../` to reach the media folders from `Layouts/`.
- The site uses `sessionStorage['etrb_auth'] === '1'` to control member-only features.
- `.member-only` elements are hidden until a member logs in.

## ARC / R4S page syntax (`arc_data.md` and `r4s_data.md`)

These pages parse a simple block structure with an ABOUT section and one or more YEAR campaign blocks.

### About section

```md
[ABOUT-START]
### About the Program
Intro copy here.
[ABOUT-END]
```

### Year campaign blocks

```md
[YEAR-START: 2026]
title: Lil' Willy: Active Control
mission: Active Airbrakes
header_image: ../arc26-media/full assembly render 1.png
header_alt: Custom telemetry image

Campaign body content goes here.
[YEAR-END: 2026]
```

Supported fields:
- `title:` required campaign name.
- `mission:` short label used in the page sub-navigation.
- `header_image:` optional hero image path.
- `header_alt:` optional alt text for the hero image.

### Page body formatting

Inside the campaign block, use standard Markdown-like text:
- `###` and `####` headings
- `*` or `-` bullet lists
- `**bold**`
- `[links](https://example.com)`

### Media macros

These pages support helpful embedded media shorthand:

- `[[pdf: path, title, false]]` - render a PDF link or embedded viewer.
- `[[carousel: item1, item2, ...]]` - render an image/video carousel.
- `[[youtube: VIDEO_ID, caption]]` - embed a YouTube video.
- `*Tags: tag1, tag2*` - render metadata tags.

## History page syntax (`history_data.md`)

This file is parsed as a simple timeline layout.

```md
# Page Title

## Month YYYY - Milestone Title
- **Highlight**
- Detail item

---

_Optional note or caption._
```

Supported features:
- `#` for the page title.
- `##` for timeline entries.
- `-` for bullet details.
- `---` as a section separator.
- `_italic text_` for notes.

## People page syntax (`people_data.md`)

The people page uses custom block syntax.

```md
// Comments are ignored
section(current members)

person(Name, ../people-media/photo.jpg, "Short bio text.", "Class of 2027")
contact(LinkedIn, https://www.linkedin.com/in/example/)
contact(Email, mailto:name@example.com)
endperson
```

Supported lines:
- `section(title)` - begins a people section.
- `person(Name, ImagePath, "Bio", "Meta")` - starts an entry.
- `contact(Method, URL)` - adds a contact button.
- `endperson` - closes the current person.
- `//` - comment line.

## Releases page syntax (`releases_data.md`)

Each release starts with `##` and may include metadata lines followed by `---` and the long body.

```md
## Release Title
- date: 2026-05-01
- mode: tab
- summary: Short summary text.
- url: https://example.com
---
Release body content.
```

Recognized metadata:
- `date:` release date.
- `mode:` `tab`, `link`, or `embed`.
- `url:` target for `link` mode.
- `summary:` short text used in the list view.

Body content may include standard Markdown-like text and media rendered by the page.

## Member-only page syntax

### Member Tools (`member-tools_data.md`)

```md
tag(TOOLS)
## Section Heading
card(Title, Description, IconPreset, TargetURL)
card(Title, Description, IconPreset, TargetURL, WIP)
```

Supported fields:
- `tag(TEXT)` - section label.
- `## Section Heading` - starts a group of cards.
- `card(Title, Description, IconPreset, TargetURL)` - adds a tool card.
- Optional fifth value adds a small badge like `WIP`.

Supported icon presets:
- `library`
- `flight`
- `notes`
- `schedule`
- `infobase`

### Info Base (`info-base_data.md`)

```md
# Category Title | Short Label
## Subsection Title
link(Title, Description, TYPE, URL)
```

Supported fields:
- `# Category | Label` - starts a top-level category.
- `## Subsection Title` - starts a subsection.
- `link(Title, Description, TYPE, URL)` - adds a searchable resource entry.

### ARC Org and R4S Org (`arc-org_data.md`, `r4s-org_data.md`)

These pages use the same syntax.

```md
// Comments are ignored
tag(OPERATIONS)
## Section Title
card(Title, Description, IconPreset, TargetURL)
embed(https://drive.google.com/drive/folders/example)
```

Supported fields:
- `tag(TEXT)` - section label.
- `## Section Title` - starts a section.
- `card(Title, Description, IconPreset, TargetURL)` - adds a resource card.
- `embed(URL)` - renders an embedded iframe view.
- `//` - comment line.

## Notes for editors

- Edit `Layouts/` for page structure, styling, and shared navigation.
- Edit `Content/` for page data and content blocks.
- Keep asset paths relative to `Layouts/` when referenced from content files.
- `Layouts/default.js` contains the theme toggle and member link visibility logic.
- `Layouts/default.html` contains the shared top navigation and fonts.
- `Join Us` is the only major page in `Layouts/` that is static HTML and does not depend on `Content/`.

## Serving the site

The site works as plain static HTML. To preview locally, use any static server or open `index.html` in a browser.

> Tip: Use `index.html` or `home.html` at the root. They both redirect into `Layouts/home.html` and keep all relative paths working.
