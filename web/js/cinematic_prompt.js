// !!! CRITICAL FIX: Added extra "../" to reach the root folder from "web/js/"
import { app } from "../../../scripts/app.js";

// --- CSS STYLES ---
const style = `
<style>
    /* Main Container */
    .yedp-container {
        --bg-dark: #1e1e1e;
        --bg-panel: #252526;
        --bg-input: #333333;
        --bg-hover: #3e3e42;
        --text-main: #e0e0e0;
        --text-muted: #858585;
        --accent: #F5C518; /* IMDb/Cinema Gold */
        --border: #444444;
        --radius: 6px;
        font-family: 'Inter', sans-serif;
        color: var(--text-main);
        background: var(--bg-dark);
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        min-height: 600px;
        overflow: hidden;
        border-radius: 8px;
        font-size: 12px;
        border: 1px solid var(--border);
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    }
    
    .yedp-layout { display: flex; height: 100%; }
    
    /* Left Sidebar */
    .yedp-sidebar { 
        width: 280px; 
        background: var(--bg-panel); 
        border-right: 1px solid var(--border); 
        overflow-y: auto; 
        padding: 15px; 
        flex-shrink: 0; 
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    /* Right Preview Area */
    .yedp-main { 
        flex: 1; 
        padding: 20px; 
        overflow-y: auto; 
        background: #111; 
        display: flex; 
        flex-direction: column; 
        gap: 15px; 
    }

    .yedp-label { 
        font-size: 0.7rem; 
        font-weight: 800; 
        color: var(--accent); 
        text-transform: uppercase; 
        letter-spacing: 0.5px;
        margin-bottom: 4px;
        display: block; 
    }

    .yedp-input, .yedp-textarea { 
        background: var(--bg-input); 
        border: 1px solid var(--border); 
        color: var(--text-main); 
        padding: 8px; 
        border-radius: var(--radius); 
        width: 100%; 
        font-size: 12px;
    }
    .yedp-textarea { resize: vertical; min-height: 40px; font-family: sans-serif; }
    .yedp-input:focus, .yedp-textarea:focus { border-color: var(--accent); outline: none; }

    .yedp-btn { 
        background: var(--bg-input); 
        border: 1px solid transparent; 
        color: var(--text-muted); 
        padding: 8px 10px; 
        cursor: pointer; 
        border-radius: 4px; 
        width: 100%; 
        text-align: left; 
        transition: all 0.1s;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .yedp-btn:hover { background: var(--bg-hover); color: var(--text-main); }
    .yedp-btn.active { 
        border-color: var(--accent); 
        color: var(--accent); 
        background: rgba(245, 197, 24, 0.05); 
        font-weight: bold;
    }

    .yedp-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; }
    .yedp-grid-item { 
        background: var(--bg-input); 
        border: 1px solid transparent; 
        padding: 8px; 
        text-align: center; 
        cursor: pointer; 
        border-radius: 4px; 
        font-size: 0.75rem; 
        transition: all 0.1s;
    }
    .yedp-grid-item:hover { background: var(--bg-hover); }
    .yedp-grid-item.active { border-color: var(--accent); background: rgba(245, 197, 24, 0.1); color: var(--accent); }

    .yedp-slider-wrapper { padding: 5px 0; }
    .yedp-slider-header { display: flex; justify-content: space-between; margin-bottom: 5px; color: var(--accent); font-weight: bold; }
    .yedp-range { width: 100%; cursor: pointer; accent-color: var(--accent); }
    .yedp-slider-labels { display: flex; justify-content: space-between; font-size: 0.65rem; color: var(--text-muted); margin-top: 2px; }

    .yedp-preview-box { 
        width: 100%; 
        height: 250px; 
        background: #000; 
        border: 1px solid var(--border); 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        overflow: hidden; 
        position: relative; 
        border-radius: 4px;
    }
    .yedp-preview-img { 
        max-width: 100%; 
        max-height: 100%; 
        object-fit: contain; 
        display: block; 
        opacity: 0;
        transition: opacity 0.3s;
    }
    .yedp-preview-img.loaded { opacity: 1; }
    
    .yedp-preview-overlay {
        position: absolute;
        bottom: 10px;
        background: rgba(0,0,0,0.8);
        color: var(--accent);
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.8rem;
    }

    .yedp-info-box {
        background: rgba(245, 197, 24, 0.05);
        border-left: 3px solid var(--accent);
        padding: 12px;
        border-radius: 4px;
        min-height: 60px;
        margin-bottom: 10px;
    }
    .yedp-info-title { color: var(--accent); font-weight: bold; font-size: 0.9rem; display: block; margin-bottom: 4px; }
    .yedp-info-text { color: #ccc; font-size: 0.8rem; line-height: 1.4; }

    .yedp-output { 
        width: 100%; 
        height: 80px; 
        background: #0a0a0a; 
        border: 1px solid var(--border); 
        color: #fff; 
        padding: 10px; 
        font-family: 'Consolas', monospace; 
        font-size: 0.85rem; 
        border-radius: 4px;
    }
    .yedp-output:focus { border-color: var(--accent); box-shadow: 0 0 5px rgba(245, 197, 24, 0.3); outline: none; }

    .yedp-actions { margin-top: auto; display: flex; gap: 10px; }
    .yedp-btn-action { 
        background: var(--bg-input); 
        color: var(--text-main); 
        border: 1px solid var(--border); 
        padding: 10px; 
        border-radius: 4px; 
        cursor: pointer; 
        font-weight: bold; 
        flex: 1; 
        text-align: center;
        transition: all 0.2s;
    }
    .yedp-btn-action:hover { background: var(--bg-hover); }
    .yedp-btn-primary { background: var(--accent); color: #000; border: none; }
    .yedp-btn-primary:hover { background: #d4a017; }
    .yedp-btn-reset { background: #333; color: #aaa; border: 1px solid #555; }
    .yedp-btn-reset:hover { background: #444; color: #fff; }
</style>
`;

const ASSET_PATH = new URL("../assets/", import.meta.url).href; 
const ASSET_EXT = ".jpg";

// --- FULL DATA DEFINITIONS ---
const categories = {
    ratio: { 
        title: "Aspect Ratio", type: "ratio", 
        options: [
            {id:"16-9", label:"16:9", value:"--ar 16:9", desc:"Standard Widescreen. Ideal for TV and YouTube.", w:16, h:9}, 
            {id:"9-16", label:"9:16", value:"--ar 9:16", desc:"Vertical. Perfect for TikTok, Reels, and Mobile.", w:9, h:16}, 
            {id:"1-1", label:"1:1", value:"--ar 1:1", desc:"Square. Classic Instagram format.", w:1, h:1}, 
            {id:"4-3", label:"4:3", value:"--ar 4:3", desc:"Standard Definition. Retro TV look.", w:4, h:3},
            {id:"235-1", label:"2.35:1", value:"--ar 2.35:1", desc:"Anamorphic Widescreen. Classic CinemaScope look.", w:2.35, h:1}, 
            {id:"143-1", label:"1.43:1", value:"--ar 1.43:1", desc:"IMAX. Massive vertical scale.", w:1.43, h:1}
        ]
    },
    framing: { 
        title: "Framing / Shot Size", type: "select", 
        options: [
            {id:"ecu", label:"Extreme Close-Up", value:"extreme close-up", desc:"Focuses on a specific detail (e.g., an eye). Intensifies emotion."}, 
            {id:"cu", label:"Close-Up", value:"close-up", desc:"Head and shoulders. Focuses on facial expression."}, 
            {id:"med", label:"Medium Shot", value:"medium shot", desc:"Waist up. Standard interaction shot."}, 
            {id:"cowboy", label:"Cowboy Shot", value:"American shot", desc:"Mid-thigh up. Originates from Westerns to show gun holsters."}, 
            {id:"full", label:"Full Body", value:"full body shot", desc:"Head to toe. Shows attire and stance."}, 
            {id:"wide", label:"Wide Shot", value:"wide shot", desc:"Subject + environment. Shows context."}, 
            {id:"est", label:"Establishing Shot", value:"establishing shot", desc:"Very wide. Sets the scene and location."},
            {id:"macro", label:"Macro", value:"macro photography", desc:"Microscopic detail. Insects, textures, eyes."},
            {id:"tilt", label:"Tilt-Shift", value:"tilt-shift photography", desc:"Miniature effect with selective focus band. Makes large scenes look like models."},
            {id:"split", label:"Split Diopter", value:"split diopter shot", desc:"Both foreground and background are sharp. Classic Brian De Palma technique."}
        ]
    },
    angle: { 
        title: "Camera Angle", type: "select", 
        options: [
            {id:"eye", label:"Eye Level", value:"eye level angle", desc:"Neutral perspective. Connects directly with the subject."}, 
            {id:"low", label:"Low Angle", value:"low angle shot", desc:"Looking up. Makes subject look powerful or dominant."}, 
            {id:"high", label:"High Angle", value:"high angle shot", desc:"Looking down. Makes subject look vulnerable or small."}, 
            {id:"worm", label:"Worm's Eye", value:"worm's eye view", desc:"From the floor looking up. Grandeur or strangeness."}, 
            {id:"ground", label:"Ground Level", value:"ground level shot", desc:"Camera sits on the ground. Intimate texture."},
            {id:"bird", label:"Bird's Eye / Overhead", value:"overhead bird's eye view", desc:"Directly overhead (90 degrees). Geometry and layout."}, 
            {id:"ots", label:"Over-the-Shoulder", value:"over-the-shoulder shot", desc:"Behind one character looking at another. Dialogue."},
            {id:"dutch", label:"Dutch Angle", value:"Dutch angle", desc:"Tilted horizon. Creates unease, tension, or disorientation."},
            {id:"pov", label:"POV", value:"first-person POV", desc:"Seen through the eyes of a character."}
        ]
    },
    camera: { 
        title: "Camera Model", type: "select", 
        options: [
            {id:"arri", label:"Arri Alexa LF", value:"shot on Arri Alexa LF", desc:"The industry standard for digital cinema. High dynamic range."}, 
            {id:"imax70", label:"IMAX 70mm Film", value:"shot on IMAX 70mm Film", desc:"Unmatched resolution and depth. The Nolan look."}, 
            {id:"panavision", label:"Panavision Millennium", value:"shot on Panavision Millennium DXL2", desc:"Warm skin tones and classic Hollywood aesthetics."},
            {id:"sony", label:"Sony Venice 2", value:"shot on Sony Venice 2", desc:"Modern, sharp, incredible low light performance."}, 
            {id:"iphone", label:"iPhone 15 Pro", value:"shot on iPhone 15 Pro", desc:"Digital, sharp, deep depth of field. Modern vlog style."}, 
            {id:"polaroid", label:"Polaroid SX-70", value:"Polaroid SX-70 instant film", desc:"Soft, nostalgic, chemical borders and faded colors."}, 
            {id:"gopro", label:"GoPro Hero", value:"shot on GoPro Hero", desc:"Wide, distorted fish-eye, action sports feel."}
        ]
    },
    focal: { 
        title: "Focal Length", type: "select", 
        options: [
            {id:"14mm", label:"14mm (Ultra Wide)", value:"14mm lens", desc:"Distorted edges, vast scale. Action cam look."}, 
            {id:"24mm", label:"24mm (Wide)", value:"24mm lens", desc:"Standard wide. Good for landscapes and interiors."}, 
            {id:"35mm", label:"35mm (Classic)", value:"35mm lens", desc:"Closest to human field of view. Storytelling lens."}, 
            {id:"50mm", label:"50mm (Standard)", value:"50mm lens", desc:"Nifty Fifty. Natural perspective, no distortion."}, 
            {id:"85mm", label:"85mm (Portrait)", value:"85mm lens", desc:"Flattering for faces. Separates subject from background."}, 
            {id:"135mm", label:"135mm (Telephoto)", value:"135mm lens", desc:"Significant compression. Ideal for distant subjects."},
            {id:"200mm", label:"200mm (Super Tele)", value:"200mm lens", desc:"Compresses space. Background appears huge behind subject."}
        ]
    },
    dof: { 
        title: "Aperture / Depth of Field", type: "slider", 
        options: [
            {id:"f12", val:"f/1.2", label:"f/1.2 (Dreamy)", desc:"Razor thin focus. Dreamy bokeh."},
            {id:"f18", val:"f/1.8", label:"f/1.8 (Shallow)", desc:"Very shallow. Great for low light."},
            {id:"f28", val:"f/2.8", label:"f/2.8 (Pro)", desc:"Professional zoom lens standard. Good separation."},
            {id:"f4", val:"f/4.0", label:"f/4.0 (Balanced)", desc:"Balanced separation and clarity."},
            {id:"f56", val:"f/5.6", label:"f/5.6 (Sharp)", desc:"Standard sharpness."},
            {id:"f8", val:"f/8.0", label:"f/8.0 (Landscape)", desc:"Landscape standard. Mostly in focus."},
            {id:"f11", val:"f/11", label:"f/11 (Deep)", desc:"Deep focus."},
            {id:"f16", val:"f/16", label:"f/16 (Very Sharp)", desc:"Everything sharp. Sunstars appear."},
            {id:"f22", val:"f/22", label:"f/22 (Max Depth)", desc:"Maximum depth. Risk of diffraction softness."}
        ]
    },
    lighting: { 
        title: "Lighting", type: "select", 
        options: [
            {id:"volumetric", label:"Volumetric / God Rays", value:"volumetric lighting", desc:"Light beams visible in air/fog. Epic atmosphere."}, 
            {id:"biolum", label:"Bioluminescence", value:"bioluminescent lighting", desc:"Glowing organic light (blue/green). Avatar Pandora style."},
            {id:"golden", label:"Golden Hour", value:"golden hour", desc:"Warm, soft light just before sunset."}, 
            {id:"blue", label:"Blue Hour", value:"blue hour", desc:"Cold, melancholic twilight before sunrise."}, 
            {id:"noon", label:"Noon Sun", value:"harsh noon sunlight", desc:"Short shadows, high contrast, bright."}, 
            {id:"overcast", label:"Overcast", value:"overcast soft lighting", desc:"Diffused, shadowless, giant softbox effect."},
            {id:"studio", label:"Studio Key Light", value:"studio key lighting", desc:"Controlled, professional artificial lighting."}, 
            {id:"rembrandt", label:"Rembrandt", value:"Rembrandt lighting", desc:"Triangle of light on the cheek. Dramatic portraiture."}, 
            {id:"candle", label:"Candlelight", value:"lit by candlelight", desc:"Warm, flickering, low light, intimate."},
            {id:"moon", label:"Moonlight", value:"moonlight", desc:"Cold, silver/blue low light."},
            {id:"sil", label:"Silhouette", value:"silhouette lighting", desc:"Subject is black against a bright background."},
            {id:"neon", label:"Neon", value:"neon lighting", desc:"Vibrant pinks, cyans, and harsh artificial light."}, 
            {id:"chiaroscuro", label:"Chiaroscuro", value:"chiaroscuro", desc:"High contrast between light and dark."}
        ]
    },
    palette: { 
        title: "Color Palette", type: "select", 
        options: [
            {id:"tealorange", label:"Teal & Orange", value:"teal and orange color grading", desc:"Blockbuster standard. Cool shadows, warm skin tones."}, 
            {id:"velvia", label:"Fujifilm Velvia", value:"Fujifilm Velvia 50", desc:"High saturation, deep blacks, vivid colors. Nature photography."}, 
            {id:"ektachrome", label:"Kodak Ektachrome", value:"Kodak Ektachrome", desc:"Cooler tones, fine grain, distinct blues."},
            {id:"techni", label:"Technicolor", value:"Technicolor process", desc:"Hyper-saturated red/green/blue. Old Hollywood Wizard of Oz look."},
            {id:"bw", label:"Black & White", value:"black and white photography", desc:"Timeless, focuses on texture and light."}, 
            {id:"kodak", label:"Kodak Portra 400", value:"Kodak Portra 400 film look", desc:"Natural skin tones, fine grain, warm highlights."},
            {id:"vivid", label:"Vivid / Saturated", value:"vivid colors, high saturation", desc:"Punchy, bright, eye-catching."}, 
            {id:"muted", label:"Muted / Desaturated", value:"muted tones, low saturation", desc:"Grim, serious, realistic."}, 
            {id:"warm", label:"Warm Tones", value:"warm color palette", desc:"Cozy, nostalgic, safe."},
            {id:"cool", label:"Cool Tones", value:"cool color palette", desc:"Clinical, detached, or sad."},
            {id:"highcon", label:"High Contrast", value:"high contrast", desc:"Deep blacks and bright whites. Dramatic."},
            {id:"mono", label:"Monochromatic", value:"monochromatic color scheme", desc:"Using shades of a single color."},
            {id:"neonpal", label:"Neon Palette", value:"neon color palette", desc:"Electric greens, pinks, purples."},
            {id:"sepia", label:"Sepia", value:"sepia tone", desc:"Old western, flashback, antique."},
        ]
    },
    texture: { 
        title: "Texture & Post (Multi)", type: "multi", 
        options: [
            {id:"clean", label:"Clean Digital", value:"clean digital noise-free", desc:"Pristine digital clarity. No noise or artifacts."},
            {id:"grain", label:"Film Grain", value:"heavy film grain", desc:"The organic texture of silver halide crystals on celluloid."},
            {id:"burn", label:"Film Burn", value:"film burn artifacts", desc:"Light leaks and chemical distortions at the edge of the reel."},
            {id:"vhs", label:"VHS", value:"VHS artifacts", desc:"Analog tracking errors and color bleeding of magnetic tape."},
            {id:"bloom", label:"Bloom", value:"bloom effect", desc:"Light spreading from bright edges, creating a dreamy glow."},
            {id:"chromatic", label:"Chromatic Aberration", value:"chromatic aberration", desc:"Color fringing at high-contrast edges caused by lens refraction."},
            {id:"motion", label:"Motion Blur", value:"motion blur", desc:"Kinetic energy captured through a longer shutter speed."},
            {id:"vignette", label:"Vignette", value:"vignette", desc:"Gradual darkening toward the corners to focus the eye."}
        ]
    },
    style: { 
        title: "Art Style (Multi)", type: "multi", 
        options: [
            {id:"photo", label:"Photorealistic", value:"photorealistic, 8k", desc:"Mimicking real photography with physical accuracy."}, 
            {id:"cine", label:"Cinematic", value:"cinematic composition", desc:"Mood and lighting typical of professional movie sets."}, 
            {id:"3d", label:"3D Render", value:"Unreal Engine 5 render, 3D", desc:"The sharp, clean look of modern real-time computer graphics."}, 
            {id:"clay", label:"Claymation", value:"claymation style, Aardman", desc:"The tactile, handcrafted feel of stop-motion clay characters."},
            {id:"water", label:"Watercolor", value:"watercolor painting", desc:"Soft edges, bleeding colors, and organic paper texture."},
            {id:"cyber", label:"Cyberpunk", value:"Cyberpunk aesthetic", desc:"High tech and low life; neon, rain, and urban futurism."}, 
            {id:"steam", label:"Steampunk", value:"Steampunk aesthetic, brass and gears", desc:"Victorian industrial design powered by steam and clockwork."},
            {id:"diner", label:"1950s Diner", value:"1950s diner aesthetic, retro americana", desc:"Chrome, neon, checkerboard floors, and classic Americana nostalgia."},
            {id:"atom", label:"Atompunk", value:"atompunk aesthetic", desc:"The retro-futuristic vision of the 1950s: Googie architecture and nuclear optimism."},
            {id:"vapor", label:"Vaporwave", value:"vaporwave aesthetic", desc:"Retro-futuristic 80s dreamscapes with pink and teal hues."},
            {id:"goth", label:"Gothic", value:"Gothic aesthetic", desc:"Dark, ornate, and mysterious moods with historic architectural roots."},
            {id:"min", label:"Minimalist", value:"minimalist style", desc:"Stripped down to the essential shapes, colors, and concepts."},
            {id:"retro80", label:"Retro 80s", value:"1980s retro style", desc:"Saturated primary colors and the lo-fi glow of CRT screens."},
            {id:"docu", label:"Gritty Documentary", value:"gritty documentary footage", desc:"Raw, unpolished, and handheld realism."},
            {id:"ghibli", label:"Studio Ghibli", value:"Studio Ghibli style", desc:"Lush, hand-painted backgrounds and whimsical charm."}, 
            {id:"oil", label:"Oil Painting", value:"oil painting texture", desc:"Thick brushstrokes and rich, layered pigments on canvas."},
            {id:"noir", label:"Film Noir", value:"film noir style", desc:"High-contrast lighting and a cynical urban atmosphere."}
        ]
    },
    artist: { 
        title: "Artist / Director", type: "select", 
        options: [
            {id:"wes", label:"Wes Anderson", value:"directed by Wes Anderson", desc:"Symmetry, pastel colors, and whimsical storybook staging."},
            {id:"ridley", label:"Ridley Scott", value:"directed by Ridley Scott", desc:"Atmospheric scale, high detail, and moody sci-fi noir."},
            {id:"nolan", label:"Christopher Nolan", value:"directed by Christopher Nolan", desc:"Grand scale, practical effects, and a cool, clinical color palette."},
            {id:"hopper", label:"Edward Hopper", value:"art by Edward Hopper", desc:"Dramatic shadows, urban isolation, and cinematic stillness."},
            {id:"fraser", label:"Greig Fraser", value:"cinematography by Greig Fraser", desc:"The Batman/Dune look: Moody, soft, and dark-focused digital."},
            {id:"lubezki", label:"Emmanuel Lubezki", value:"cinematography by Emmanuel Lubezki", desc:"Master of natural light and immersive long-take cinematography."},
            {id:"hoyte", label:"Hoyte van Hoytema", value:"cinematography by Hoyte van Hoytema", desc:"IMAX scale, tactile texture, and shallow depth of field."},
            {id:"fincher", label:"David Fincher", value:"directed by David Fincher", desc:"Extreme precision, green/yellow tints, and low-light digital clarity."},
            {id:"burton", label:"Tim Burton", value:"directed by Tim Burton", desc:"Gothic, quirky, and dark fantasy visuals with high contrast."},
            {id:"spielberg", label:"Steven Spielberg", value:"directed by Steven Spielberg", desc:"Cinematic wonder, backlighting, and distinct, iconic silhouettes."},
            {id:"denis", label:"Denis Villeneuve", value:"directed by Denis Villeneuve", desc:"Brutalist architecture, vast scale, and heavy atmosphere."},
            {id:"wong", label:"Wong Kar-wai", value:"directed by Wong Kar-wai", desc:"Saturated neon, motion blur, and a feeling of urban longing."},
            {id:"mead", label:"Syd Mead", value:"art by Syd Mead", desc:"Industrial futurism and functional high-tech design."},
            {id:"miyazaki", label:"Hayao Miyazaki", value:"art by Hayao Miyazaki", desc:"Lush nature, intricate flying machines, and hand-painted detail."},
            {id:"tarantino", label:"Quentin Tarantino", value:"directed by Quentin Tarantino", desc:"Low angles, vibrant colors, and 70s exploitation film style."},
            {id:"giger", label:"H.R. Giger", value:"art by H.R. Giger", desc:"Biomechanical nightmarish textures and monochromatic darkness."}
        ]
    }
};

// --- HELPER: UPDATE PREVIEW ---
// Shared helper function to update the visual reference monitor
const updatePreviewLogic = (container, catKey, id, nodeTypeStr, node) => {
    const img = container.querySelector(".yedp-preview-img");
    const infoTitle = container.querySelector(".yedp-info-title");
    const infoText = container.querySelector(".yedp-info-text");
    
    if(!img) return;

    let opt;
    if(catKey === 'dof') opt = categories.dof.options[id];
    else opt = categories[catKey]?.options?.find(o=>o.id === id);

    if (!opt) return;

    if(infoTitle && infoText) {
        infoTitle.innerText = opt.label;
        infoText.innerText = opt.desc || "";
    }

    // SKIP RATIO FOR PREVIEW (Loader Logic uses this to skip invalid loads)
    if (categories[catKey].type === 'ratio') return; 

    // Update Hidden Widget for LOADER NODE only
    if (nodeTypeStr === "loader") {
        if (node.widgets && node.widgets[0]) {
            // Send "category_id" (e.g. "camera_arri") to Python
            node.widgets[0].value = `${catKey}_${opt.id}`;
        }
    }

    img.classList.remove("loaded");
    const cb = "?t=" + new Date().getTime();
    const filenameBase = `${catKey}_${opt.id}`;
    
    img.onload = () => img.classList.add("loaded");
    img.onerror = function() {
        const currentSrc = this.src;
        if (currentSrc.includes(".jpg")) this.src = ASSET_PATH + filenameBase + ".png" + cb;
        else if (currentSrc.includes(".png")) this.src = ASSET_PATH + filenameBase + ".jpeg" + cb;
        else {
            this.src = `https://placehold.co/400x300/222/666?text=${catKey}:${opt.id}`;
            this.classList.add("loaded");
            this.onerror = null;
        }
    };
    img.src = ASSET_PATH + filenameBase + ".jpg" + cb;
};


// 1. PROMPT BUILDER UI
function createPromptBuilderUI(node) {
    node.bgcolor = "#222"; 
    
    // Hide Widgets
    if (node.widgets) {
        for (let w of node.widgets) {
            w.type = "hidden"; 
            w.computeSize = () => [0, -4]; 
        }
    }

    node.defaultState = {
        mode: "stablediffusion", ratio: "16-9", camera: "arri", framing: "wide",
        angle: "eye", focal: "50mm", dof: 2, lighting: "volumetric", palette: "tealorange",
        texture: [], style: ["photo", "cine"], artist: "wes",
        subject: "A lone astronaut", negative: ""
    };
    node.state = Object.assign({}, node.defaultState);

    const container = document.createElement("div");
    container.className = "yedp-container";
    container.innerHTML = `${style}<div class="yedp-layout" style="color:#666; justify-content:center; align-items:center;">Loading Prompt Builder...</div>`;

    const updateOutputs = () => {
        const widgets = node.widgets;
        if (!widgets) return;

        const p = node.state;
        const posOut = container.querySelector(".positive-output");
        if(!posOut) return;

        const getVal = (cat, id) => categories[cat]?.options?.find(o => o.id === id)?.value || "";
        
        const cam = getVal('camera', p.camera);
        const frame = getVal('framing', p.framing);
        const ang = getVal('angle', p.angle);
        const focal = getVal('focal', p.focal);
        const light = getVal('lighting', p.lighting);
        const pal = getVal('palette', p.palette);
        const artist = getVal('artist', p.artist);
        
        const styles = (p.style || []).map(s => getVal('style', s)).join(", ");
        const textures = (p.texture || []).map(t => getVal('texture', t)).join(", ");
        
        const dofObj = categories.dof.options[p.dof];
        const dofVal = dofObj ? dofObj.val : "";
        const ratio = categories.ratio.options.find(o => o.id === p.ratio)?.value || "";

        let final = "";
        const parts = [];
        
        if (p.mode === 'flux' || p.mode === 'nanobanana') {
                const prefix = p.mode === 'nanobanana' ? "High-end cinematic photography: " : "";
                let sentence = `${prefix}`;
                if (frame) sentence += `${frame} of ${p.subject}`;
                else sentence += `${p.subject}`; 
                
                if (ang) sentence += `, shot at ${ang}`;
                
                if (cam) {
                    if (cam.toLowerCase().startsWith("shot on")) sentence += `, ${cam}`;
                    else sentence += ` on ${cam}`;
                }
                
                if (focal) sentence += ` with a ${focal}`;
                if (dofVal) sentence += ` at aperture ${dofVal}`;
                
                if (light) sentence += `. The lighting is ${light}`;
                if (pal) sentence += ` with ${pal} color grade`;
                
                if (artist) {
                    if (artist.toLowerCase().startsWith("directed by") || artist.toLowerCase().startsWith("art by")) {
                        sentence += `. ${artist}`;
                    } else {
                        sentence += `. In the style of ${artist}`;
                    }
                }

                if (styles) sentence += `. Visuals: ${styles}`;
                if (textures) sentence += `. ${textures}`;
                if (ratio) sentence += `. ${ratio}`;

                final = sentence;
                final = final.replace(/\.\./g, '.').replace(/\s+/g, ' ').trim();
                
        } else if (p.mode === 'midjourney') {
            if(styles) parts.push(styles);
            if(frame) parts.push(`${frame} of ${p.subject}`); else parts.push(`${p.subject}`);
            if(cam) parts.push(cam);
            if(focal) parts.push(focal);
            if(dofVal) parts.push(dofVal); 
            if(ang) parts.push(ang);
            if(light) parts.push(light);
            if(pal) parts.push(pal);
            if(artist) parts.push(artist);
            if(textures) parts.push(textures);
            final = parts.filter(x=>x).join(", ") + (ratio ? " " + ratio : "");
        } else {
            if(styles) parts.push(styles);
            if(frame) parts.push(`${frame} of ${p.subject}`); else parts.push(`${p.subject}`);
            if(cam) parts.push(cam);
            if(focal) parts.push(focal);
            if(dofVal) parts.push(`aperture ${dofVal}`);
            if(ang) parts.push(ang);
            if(light) parts.push(light);
            if(pal) parts.push(pal);
            if(artist) parts.push(artist);
            if(textures) parts.push(textures);
            final = parts.filter(x=>x).join(", ");
        }
        
        posOut.value = final;
        if(widgets[0]) widgets[0].value = JSON.stringify(p);
        if(widgets[1]) widgets[1].value = final;
        if(widgets[2]) widgets[2].value = p.negative;
    };

    const updatePreview = (catKey, id) => {
        updatePreviewLogic(container, catKey, id, "prompt", node);
    };

    const renderControls = () => {
        const controlsArea = container.querySelector(".dynamic-controls");
        if(!controlsArea) return; 
        controlsArea.innerHTML = "";
        
        Object.keys(categories).forEach(key => {
            const cat = categories[key];
            const label = document.createElement("div");
            label.className = "yedp-label";
            label.innerText = cat.title;
            controlsArea.appendChild(label);
            const wrapper = document.createElement("div");
            
            if (cat.type === 'slider') {
                wrapper.className = "yedp-slider-wrapper";
                const header = document.createElement("div");
                header.className = "yedp-slider-header";
                const valSpan = document.createElement("span");
                valSpan.innerText = cat.options[node.state[key]].label;
                header.appendChild(valSpan);
                wrapper.appendChild(header);
                
                const range = document.createElement("input");
                range.type = "range"; range.min = 0; range.max = cat.options.length - 1;
                range.value = node.state[key]; range.className = "yedp-range";
                range.oninput = (e) => {
                    const idx = parseInt(e.target.value);
                    node.state[key] = idx;
                    valSpan.innerText = cat.options[idx].label;
                    updateOutputs();
                    updatePreview(key, idx); 
                };
                wrapper.appendChild(range);
                const labels = document.createElement("div");
                labels.className = "yedp-slider-labels";
                labels.innerHTML = "<span>Blurry</span><span>Sharp</span>";
                wrapper.appendChild(labels);
            } else if (cat.type === 'ratio' || cat.type === 'multi') {
                wrapper.className = "yedp-grid";
                cat.options.forEach(opt => {
                    const btn = document.createElement("div");
                    const isActive = cat.type === 'multi' 
                        ? (node.state[key] && node.state[key].includes(opt.id))
                        : (node.state[key] === opt.id);
                        
                    btn.className = `yedp-grid-item ${isActive ? 'active' : ''}`;
                    btn.innerText = opt.label;
                    btn.onclick = () => {
                        if(cat.type === 'multi') {
                            if(!node.state[key]) node.state[key] = [];
                            if(node.state[key].includes(opt.id)) 
                                node.state[key] = node.state[key].filter(x => x !== opt.id);
                            else node.state[key].push(opt.id);
                        } else {
                            if (node.state[key] === opt.id) node.state[key] = "";
                            else node.state[key] = opt.id;
                        }
                        renderControls(); updatePreview(key, opt.id); updateOutputs();
                    };
                    btn.onmouseenter = () => updatePreview(key, opt.id);
                    wrapper.appendChild(btn);
                });
            } else {
                wrapper.style.display = "flex"; wrapper.style.flexDirection = "column"; wrapper.style.gap = "4px";
                cat.options.forEach(opt => {
                    const btn = document.createElement("div");
                    const isActive = node.state[key] === opt.id;
                    btn.className = `yedp-btn ${isActive ? 'active' : ''}`;
                    btn.innerHTML = `<span>${opt.label}</span> ${isActive ? '●' : ''}`;
                    btn.onmouseenter = () => updatePreview(key, opt.id);
                    btn.onclick = () => {
                        if (node.state[key] === opt.id) node.state[key] = "";
                        else node.state[key] = opt.id;
                        renderControls(); updateOutputs();
                    };
                    wrapper.appendChild(btn);
                });
            }
            controlsArea.appendChild(wrapper);
        });
    };

    const buildUI = () => {
        container.innerHTML = `
            ${style}
            <div class="yedp-layout">
                <div class="yedp-sidebar">
                    <div class="yedp-label">Formatting Mode</div>
                    <select class="yedp-input mode-select">
                        <option value="midjourney">Midjourney</option>
                        <option value="stablediffusion">Stable Diffusion</option>
                        <option value="flux">Flux</option>
                        <option value="nanobanana">NanoBanana Pro</option>
                    </select>

                    <div class="yedp-label">Subject</div>
                    <input type="text" class="yedp-input subject-input" placeholder="A lone astronaut..." value="${node.state.subject}">

                    <div class="yedp-label">Negative</div>
                    <textarea class="yedp-textarea negative-input" placeholder="blurry, low quality...">${node.state.negative}</textarea>

                    <div class="dynamic-controls"></div>
                </div>
                
                <div class="yedp-main">
                    <div class="yedp-label">Visual Reference</div>
                    <div class="yedp-preview-box">
                        <img class="yedp-preview-img" src="" alt="">
                    </div>
                    
                    <div class="yedp-info-box">
                        <span class="yedp-info-title">Welcome</span>
                        <span class="yedp-info-text">Hover over any option to see details and a preview image.</span>
                    </div>
                    
                    <div class="yedp-label">Final Prompt String</div>
                    <textarea class="yedp-output positive-output"></textarea>
                    
                    <div class="yedp-actions">
                        <button class="yedp-btn-action random-btn">🎲 Randomize</button>
                        <button class="yedp-btn-action reset-btn" style="background: #333; border-color: #666; margin-left: 5px;">↺ Reset</button>
                    </div>
                </div>
            </div>
        `;

        const subjInput = container.querySelector(".subject-input");
        const negInput = container.querySelector(".negative-input");
        const modeSelect = container.querySelector(".mode-select");
        const randBtn = container.querySelector(".random-btn");
        const resetBtn = container.querySelector(".reset-btn");
        const posOut = container.querySelector(".positive-output");

        subjInput.oninput = (e) => { node.state.subject = e.target.value; updateOutputs(); };
        negInput.oninput = (e) => { node.state.negative = e.target.value; updateOutputs(); };
        modeSelect.onchange = (e) => { node.state.mode = e.target.value; updateOutputs(); };
        posOut.oninput = (e) => { if(node.widgets && node.widgets[1]) node.widgets[1].value = e.target.value; };
        
        randBtn.onclick = () => {
            node.state.camera = categories.camera.options[Math.floor(Math.random()*categories.camera.options.length)].id;
            node.state.lighting = categories.lighting.options[Math.floor(Math.random()*categories.lighting.options.length)].id;
            node.state.palette = categories.palette.options[Math.floor(Math.random()*categories.palette.options.length)].id;
            node.state.artist = categories.artist.options[Math.floor(Math.random()*categories.artist.options.length)].id;
            node.state.style = [categories.style.options[Math.floor(Math.random()*categories.style.options.length)].id];
            node.state.dof = Math.floor(Math.random()*categories.dof.options.length);
            renderControls(); updateOutputs(); updatePreview('camera', node.state.camera);
        };

        resetBtn.onclick = () => {
            node.state.camera = ""; node.state.framing = ""; node.state.angle = "";
            node.state.focal = ""; node.state.lighting = ""; node.state.palette = "";
            node.state.artist = ""; node.state.style = []; node.state.texture = [];
            node.state.ratio = "16-9"; node.state.dof = 2;
            renderControls(); updateOutputs(); updatePreview('camera', 'arri'); 
        };

        modeSelect.value = node.state.mode;
        renderControls();
        updateOutputs();
        updatePreview('camera', node.state.camera || 'arri');
    };

    return { container, buildUI };
}


// 2. LOADER UI
function createLoaderUI(node) {
    node.bgcolor = "#222"; 
    
    if (node.widgets) {
        for (let w of node.widgets) {
            w.type = "hidden"; 
            w.computeSize = () => [0, -4]; 
        }
    }

    // Loader uses a simpler state tracking the currently selected item
    node.defaultState = {
        selectedCategory: null,
        selectedId: null
    };
    node.state = Object.assign({}, node.defaultState);

    const container = document.createElement("div");
    container.className = "yedp-container";
    container.innerHTML = `${style}<div class="yedp-layout" style="color:#666; justify-content:center; align-items:center;">Loading Reference Loader...</div>`;

    const updatePreview = (catKey, id) => {
        updatePreviewLogic(container, catKey, id, "loader", node);
    };

    const renderControls = () => {
        const controlsArea = container.querySelector(".dynamic-controls");
        if(!controlsArea) return; 
        controlsArea.innerHTML = "";
        
        Object.keys(categories).forEach(key => {
            // SKIP RATIO FOR LOADER
            if (key === 'ratio') return;
            
            const cat = categories[key];
            const label = document.createElement("div");
            label.className = "yedp-label";
            label.innerText = cat.title;
            controlsArea.appendChild(label);
            const wrapper = document.createElement("div");
            
            // For Loader, simplified rendering: List style or Grid for all, but enforce Single Select
            if (cat.type === 'slider') {
                // Sliders don't make much sense for "loading a specific image" unless we treat the slider positions as distinct images
                // Let's render them as buttons for the loader to make "one at a time" obvious
                wrapper.style.display = "flex"; wrapper.style.flexDirection = "column"; wrapper.style.gap = "4px";
                cat.options.forEach((opt, idx) => {
                     // Handle slider options which are array indices
                     const optId = idx;
                     const optLabel = opt.label;
                     const btn = document.createElement("div");
                     // Check if this specific slider value is the globally selected item
                     const isActive = (node.state.selectedCategory === key && node.state.selectedId === optId);
                     
                     btn.className = `yedp-btn ${isActive ? 'active' : ''}`;
                     btn.innerHTML = `<span>${optLabel}</span> ${isActive ? '●' : ''}`;
                     
                     btn.onmouseenter = () => updatePreview(key, optId);
                     btn.onclick = () => {
                         // Toggle off if clicking same
                         if (isActive) {
                             node.state.selectedCategory = null;
                             node.state.selectedId = null;
                         } else {
                             node.state.selectedCategory = key;
                             node.state.selectedId = optId;
                         }
                         renderControls();
                         // If selected, show preview. If deselected, maybe clear?
                         if (node.state.selectedCategory) {
                            updatePreview(node.state.selectedCategory, node.state.selectedId);
                         }
                     };
                     wrapper.appendChild(btn);
                });

            } else if (cat.type === 'ratio' || cat.type === 'multi') {
                wrapper.className = "yedp-grid";
                cat.options.forEach(opt => {
                    const btn = document.createElement("div");
                    // Global Single Select Logic
                    const isActive = (node.state.selectedCategory === key && node.state.selectedId === opt.id);
                        
                    btn.className = `yedp-grid-item ${isActive ? 'active' : ''}`;
                    btn.innerText = opt.label;
                    btn.onclick = () => {
                        if (isActive) {
                             node.state.selectedCategory = null;
                             node.state.selectedId = null;
                        } else {
                             node.state.selectedCategory = key;
                             node.state.selectedId = opt.id;
                        }
                        renderControls(); 
                        if (node.state.selectedCategory) updatePreview(key, opt.id);
                    };
                    btn.onmouseenter = () => updatePreview(key, opt.id);
                    wrapper.appendChild(btn);
                });
            } else {
                wrapper.style.display = "flex"; wrapper.style.flexDirection = "column"; wrapper.style.gap = "4px";
                cat.options.forEach(opt => {
                    const btn = document.createElement("div");
                    const isActive = (node.state.selectedCategory === key && node.state.selectedId === opt.id);

                    btn.className = `yedp-btn ${isActive ? 'active' : ''}`;
                    btn.innerHTML = `<span>${opt.label}</span> ${isActive ? '●' : ''}`;
                    btn.onmouseenter = () => updatePreview(key, opt.id);
                    btn.onclick = () => {
                        if (isActive) {
                             node.state.selectedCategory = null;
                             node.state.selectedId = null;
                        } else {
                             node.state.selectedCategory = key;
                             node.state.selectedId = opt.id;
                        }
                        renderControls();
                        if (node.state.selectedCategory) updatePreview(key, opt.id);
                    };
                    wrapper.appendChild(btn);
                });
            }
            controlsArea.appendChild(wrapper);
        });
    };

    const buildUI = () => {
        container.innerHTML = `
            ${style}
            <div class="yedp-layout">
                <div class="yedp-sidebar">
                    <div style="padding:10px; color:#888; font-size:11px; margin-bottom:10px;">
                        Select <strong>one</strong> reference image to load.
                    </div>
                    <div class="dynamic-controls"></div>
                </div>
                
                <div class="yedp-main">
                    <div class="yedp-label">Selected Reference</div>
                    <div class="yedp-preview-box">
                        <img class="yedp-preview-img" src="" alt="">
                    </div>
                    
                    <div class="yedp-info-box">
                        <span class="yedp-info-title">Welcome</span>
                        <span class="yedp-info-text">Hover to preview. Click to select (Single Selection).</span>
                    </div>
                    
                    <div class="yedp-actions" style="margin-top:auto">
                         <button class="yedp-btn-action reset-btn" style="background: #333; border-color: #666;">↺ Deselect All</button>
                    </div>
                </div>
            </div>
        `;

        const resetBtn = container.querySelector(".reset-btn");
        resetBtn.onclick = () => {
            node.state.selectedCategory = null;
            node.state.selectedId = null;
            renderControls(); 
            // Maybe clear preview or show placeholder?
        };

        renderControls();
        if (node.state.selectedCategory) {
            updatePreview(node.state.selectedCategory, node.state.selectedId);
        }
    };

    return { container, buildUI };
}


// --- REGISTER EXTENSION ---
app.registerExtension({
    name: "Yedp.CinematicPrompt",
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        
        // 1. PROMPT BUILDER NODE
        if (nodeData.name === "CinematicPromptNode") {
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                const r = onNodeCreated ? onNodeCreated.apply(this, arguments) : undefined;
                const ui = createPromptBuilderUI(this);
                this.addDOMWidget("cinematic_ui", "html", ui.container, {
                    getValue: () => this.state,
                    setValue: (v) => { if (v) this.state = Object.assign({}, this.defaultState, v); setTimeout(ui.buildUI, 50); }
                });
                requestAnimationFrame(() => { this.setSize([750, 850]); ui.buildUI(); });
                return r;
            };
        }
        
        // 2. REFERENCE LOADER NODE
        if (nodeData.name === "CinematicLoaderNode") {
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                const r = onNodeCreated ? onNodeCreated.apply(this, arguments) : undefined;
                const ui = createLoaderUI(this);
                this.addDOMWidget("cinematic_loader_ui", "html", ui.container, {
                    getValue: () => this.state,
                    setValue: (v) => { if (v) this.state = Object.assign({}, this.defaultState, v); setTimeout(ui.buildUI, 50); }
                });
                requestAnimationFrame(() => { this.setSize([750, 850]); ui.buildUI(); });
                return r;
            };
        }
    }
});
