🎬 <ins><strong>ComfyUI Cinematic Prompt Builder</strong></ins>

A visual, user-friendly prompt builder for ComfyUI that allows you to construct complex cinematic prompts using a visual interface with previews.
Originally designed as a self learning tool to generate cinematic prompts (https://yedp123.github.io/), I decided to port it to ComfyUI as well.
Designed originally with Midjourney, Stable Diffusion, Nanobanana pro and Flux workflows in mind.

<img width="1746" height="800" alt="14b5a7c66e5b9c8ed62599a73055fbdc" src="https://github.com/user-attachments/assets/08cb73e7-71d6-41cb-9a7d-9dec288e08d3" />

--------------------------------------------------------------------------

✨ <ins>**FEATURES**</ins>

- Visual Reference Monitor: See exactly what a "Medium Shot" or "Rembrandt Lighting" looks like before you prompt.
- Auto-Formatting: Automatically structures your prompt with the correct syntax for Midjourney (--ar 16:9), SDXL, or Flux.
- Drag & Drop: Fully embedded inside a ComfyUI node.
- Drop-in Replacement: Works exactly like a CLIP Text Encode node. Connect your CLIP model, get Conditioning out.

<ins>Categories Include:</ins>

📸 Camera Models (Arri Alexa, Sony Venice, GoPro, etc.)
🔭 Focal Lengths (14mm to 200mm)
💡 Lighting (Volumetric, Golden Hour, Neon, etc.)
🎨 Art Styles (Filmic, Analog, Anime, etc.)
🖼️ Aspect Ratios (16:9, 9:16, 2.35:1, etc.)

--------------------------------------------------------------------------

📦 <ins>**INSTALLATION**</ins>

1. Navigate to your ComfyUI/custom_nodes/ folder.

2. Clone this repository:
git clone [https://github.com/yedp123/ComfyUI-Cinematic-Prompt.git](https://github.com/yedp123/ComfyUI-Cinematic-Prompt.git)

3. Restart ComfyUI.

--------------------------------------------------------------------------

🚀 <ins>**HOW TO USE**</ins>

1. Add Node: Right-click canvas > Yedp > Prompting > Cinematic Prompt Builder.

2. Connect Inputs: Connect your Checkpoint's CLIP output to the node's clip input.

3. Connect Outputs:

4. Connect positive to your KSampler's positive input.

5. Connect negative to your KSampler's negative input.

6. Create: Use the visual interface to build your scene!

--------------------------------------------------------------------------

🛠️ <ins>**INPUTS & OUTPUTS**</ins>

**- Input:**
clip (Standard CLIP model from any checkpoint)

**- Output:**

positive: Conditioning data (for KSampler)
negative: Negative conditioning data (for KSampler)
positive_text: The raw generated text string (for debugging or display)
negative_text: The raw negative text string

--------------------------------------------------------------------------

🤝 <ins>**CREDITS**</ins>

Original concept and design by Yedp.
