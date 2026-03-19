---
title: "EDIT CONFORM GUIDE"
description: "Guide for the edit conform workflow – exporting your edit for professional color grading by Maximilian Lamm."
url: "/en/edit-conform/"
layout: "edit-conform"
---

This guide helps you prepare your edit for further processing (conform) in DaVinci Resolve.

In most cases, you should use the **Source Media Workflow** instead of the **Flat Quicktime Workflow**.



## SOURCE MEDIA WORKFLOW

- Create a copy of your sequence and add a descriptive suffix such as "forColor".
- Remove graphics and other elements not needed for colour grading
Exception: If you want to create the final exports in Resolve, leave all elements unchanged.
- Reduce the clips and edits to as few video tracks as possible – ideally just 1-2. When finished, there should be no clips or clip sections in the sequence that are not visible in the final cut.
- Join all through edits, unless they serve to subdivide speed changes or reframes.
- Replace all multi-cam clips, nested sequences or compound clips with their source clips.
- Swap all proxies or transcoded clips for the original source clips.
- Delete empty video tracks
- Delete all audio tracks and clips
- Copy all original media to a working drive.
- Export an XML or AAF of the sequence.
- Export a Quicktime of the sequence in native resolution as **ProRes LT** or **H.264**.

 <br>

## FLAT QUICKTIME WORKFLOW

- Create a copy of your sequence and add a descriptive suffix such as "forColor".
- Make sure the sequence resolution matches the desired final delivery resolution.
- Verify that all clips fill the frame completely without black bars (pillarboxing or letterboxing).
- Remove all dissolves or other transitions.
- Finalise any position or zoom adjustments, as these will be baked into the colour grade.
- Remove graphics and other unnecessary elements
- Exception: If you want to create the final exports in Resolve, leave all elements unchanged and export them as a separate Quicktime with alpha (without footage!).
- Remove filters and LUTs
- Reduce the clips and edits to as few video tracks as possible – ideally just 1-2. When finished, there should be no clips or clip sections in the sequence that are not visible in the final cut.
- Join all through edits, unless they serve to subdivide speed changes or reframes.
- Swap all proxies or transcoded clips for the original source clips.
- Delete empty video tracks
- Delete all audio tracks and clips
- Export an EDL, XML or AAF of the sequence.
- Export a Quicktime of the sequence in native resolution as **ProRes 4444**.
<br><br>

### Important limitations of the Flat Quicktime Workflow

- Dissolves or other transitions in the sequence cannot be carried over.
- The final render resolution is limited to the resolution of the delivered flat Quicktime, regardless of the original footage resolution.
- All composited elements will be treated as a single flat element.
