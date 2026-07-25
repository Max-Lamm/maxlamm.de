#!/usr/bin/env python3
"""Generate a branded PDF containing both DE and EN versions of the AGB."""

import os
import re
from fpdf import FPDF

FONT_DIR = os.path.expanduser("~/Library/Fonts")

# Brand colors (print-optimized)
COLOR_TEXT = (0x1A, 0x1A, 0x1A)
COLOR_BODY = (0x33, 0x33, 0x33)
COLOR_ACCENT = (0xE8, 0x55, 0x4E)
COLOR_HEADER = (0x66, 0x66, 0x66)
COLOR_FOOTER = (0x99, 0x99, 0x99)


def read_md(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    content = re.sub(r"^---.*?---\s*", "", content, flags=re.DOTALL)
    return content


class AGBPDF(FPDF):
    def __init__(self):
        super().__init__()
        self.set_auto_page_break(auto=True, margin=25)

        # Register Raleway fonts with Unicode support
        self.add_font("Raleway", "", os.path.join(FONT_DIR, "Raleway-Regular.ttf"))
        self.add_font("Raleway", "B", os.path.join(FONT_DIR, "Raleway-Bold.ttf"))
        self.add_font("RalewaySB", "", os.path.join(FONT_DIR, "Raleway-SemiBold.ttf"))
        self.add_font("RalewayLight", "", os.path.join(FONT_DIR, "Raleway-Light.ttf"))

    def header(self):
        # Accent line at top of every page
        self.set_draw_color(*COLOR_ACCENT)
        self.set_line_width(0.5)
        self.line(self.l_margin, 10, self.w - self.r_margin, 10)

    def footer(self):
        self.set_y(-15)
        self.set_font("RalewayLight", "", 8)
        self.set_text_color(*COLOR_FOOTER)
        self.cell(0, 10, str(self.page_no()), align="C")

    def add_section_title(self, title):
        self.set_font("Raleway", "B", 22)
        self.set_text_color(*COLOR_TEXT)
        self.cell(0, 15, title, ln=True, align="C")
        self.ln(4)

    def add_header_block(self, lines):
        self.set_font("RalewayLight", "", 9)
        self.set_text_color(*COLOR_HEADER)
        for line in lines:
            line = line.strip()
            if line:
                self.cell(0, 4.5, line, ln=True, align="C")
        self.ln(6)

    def add_paragraph_heading(self, text):
        self.set_font("RalewaySB", "", 11)
        self.set_text_color(*COLOR_TEXT)
        # multi_cell statt cell: lange Paragraphentitel brechen um statt zu ueberlaufen
        self.multi_cell(0, 5.5, text)
        self.ln(1.5)
        # Accent underline
        y = self.get_y()
        self.set_draw_color(*COLOR_ACCENT)
        self.set_line_width(0.3)
        self.line(self.l_margin, y, self.l_margin + 40, y)
        self.ln(2)

    def add_list_item(self, text):
        """Rendert einen Markdown-Listenpunkt mit Bullet und haengendem Einzug."""
        self.set_font("Raleway", "", 9.5)
        self.set_text_color(*COLOR_BODY)
        indent = 5
        bullet_width = 4
        self.set_x(self.l_margin + indent)
        self.set_text_color(*COLOR_ACCENT)
        self.cell(bullet_width, 4.5, "•")
        self.set_text_color(*COLOR_BODY)
        # Linken Rand temporaer versetzen, damit Folgezeilen buendig eingerueckt bleiben
        outer_margin = self.l_margin
        self.set_left_margin(outer_margin + indent + bullet_width)
        self.set_x(outer_margin + indent + bullet_width)
        self.multi_cell(0, 4.5, text)
        self.set_left_margin(outer_margin)

    def add_separator_page(self):
        """Add a separator page between DE and EN sections."""
        self.add_page()
        y_center = self.h / 2
        self.set_draw_color(*COLOR_ACCENT)
        self.set_line_width(0.5)
        x_center = self.w / 2
        self.line(x_center - 30, y_center, x_center + 30, y_center)


def render_markdown_to_pdf(pdf, md_content, title):
    pdf.add_page()
    pdf.add_section_title(title)

    lines = md_content.split("\n")
    header_lines = []
    i = 0

    # Collect header block (before first ##)
    while i < len(lines):
        line = lines[i].strip()
        if line.startswith("## "):
            break
        clean = line.replace("<br>", "").replace("<br><br>", "")
        # non-greedy, damit Linktexte mit eckigen Klammern (info[at]maxlamm.de) korrekt greifen
        clean = re.sub(r"\[(.+?)\]\([^)]*\)", r"\1", clean)
        if clean.strip():
            header_lines.append(clean.strip())
        i += 1

    pdf.add_header_block(header_lines)

    current_paragraph = []

    def flush_paragraph():
        if current_paragraph:
            text = " ".join(current_paragraph)
            # Check for bold prefix like **1.1**
            m = re.match(r"\*\*([^*]+)\*\*\s*(.*)", text)
            if m:
                prefix = m.group(1)
                rest = m.group(2)
                rest = re.sub(r"\*\*([^*]+)\*\*", r"\1", rest)
                # Numbered prefix in accent color + SemiBold
                pdf.set_font("RalewaySB", "", 9.5)
                pdf.set_text_color(*COLOR_ACCENT)
                pdf.write(4.5, prefix + " ")
                # Body text
                pdf.set_font("Raleway", "", 9.5)
                pdf.set_text_color(*COLOR_BODY)
                pdf.write(4.5, rest)
                pdf.ln(5)
            else:
                text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
                pdf.set_font("Raleway", "", 9.5)
                pdf.set_text_color(*COLOR_BODY)
                pdf.multi_cell(0, 4.5, text)
                pdf.ln(2)
            current_paragraph.clear()

    in_list = False

    def end_list():
        """Schliesst eine laufende Liste mit etwas Abstand ab."""
        nonlocal in_list
        if in_list:
            pdf.ln(2)
            in_list = False

    while i < len(lines):
        line = lines[i].strip()

        if line.startswith("## "):
            flush_paragraph()
            end_list()
            heading = line.replace("## ", "").strip()
            pdf.add_paragraph_heading(heading)
        elif line == "" or line == "<br><br>":
            flush_paragraph()
            end_list()
        else:
            clean = line.replace("<br>", "")
            # non-greedy, damit Linktexte mit eckigen Klammern korrekt greifen
            clean = re.sub(r"\[(.+?)\]\([^)]*\)", r"\1", clean).strip()
            if clean.startswith("- "):
                flush_paragraph()
                item = re.sub(r"\*\*([^*]+)\*\*", r"\1", clean[2:].strip())
                pdf.add_list_item(item)
                in_list = True
            elif clean:
                current_paragraph.append(clean)

        i += 1

    flush_paragraph()
    end_list()


def main():
    de_md = read_md("content/de/pages/agb.md")
    en_md = read_md("content/en/pages/agb.md")

    pdf = AGBPDF()
    pdf.set_left_margin(25)
    pdf.set_right_margin(25)
    pdf.set_top_margin(20)

    render_markdown_to_pdf(pdf, de_md, "Allgemeine Geschäftsbedingungen")
    pdf.add_separator_page()
    render_markdown_to_pdf(pdf, en_md, "General Terms and Conditions")

    output = "AGB_Maximilian_Lamm.pdf"
    pdf.output(output)
    print(f"PDF generated: {output}")


if __name__ == "__main__":
    main()
