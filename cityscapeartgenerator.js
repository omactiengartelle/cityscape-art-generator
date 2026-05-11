#!/usr/bin/env node
import process from 'node:process';

const DEFAULT_PROMPT = "stunning cityscape view, dramatic urban skyline with towering skyscrapers and glowing windows, cinematic composition, atmospheric lighting, neon signs and street lamps reflecting on wet streets, depth of field, golden hour or twilight blue hour, ultra detailed architecture, high resolution, photorealistic detail";

const SIZES = {
  square: { width: 1024, height: 1024 },
  portrait: { width: 832, height: 1216 },
  landscape: { width: 1216, height: 832 },
  tall: { width: 704, height: 1408 },
};

function parseArgs(argv) {
  const args = { prompt: null, size: 'landscape', token: null, ref: null };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--size') { args.size = argv[++i]; }
    else if (a === '--token') { args.token = argv[++i]; }
    else if (a === '--ref') { args.ref = argv[++i]; }
    else { rest.push(a); }
  }
  if (rest.length > 0) args.prompt = rest.join(' ');
  return args;
}

async function makeImage({ token, prompt, size, ref }) {
  const dims = SIZES[size] || SIZES.landscape;
  const body = {
    storyId: "DO_NOT_USE",
    jobType: "universal",
    rawPrompt: [{ type: "freetext", value: prompt, weight: 1 }],
    width: dims.width,
    height: dims.height,
    meta: { entrance: "PICTURE,VERSE" },
    context_model_series: "8_image_edit",
  };
  if (ref) {
    body.inherit_params = { collection_uuid: ref, picture_uuid: ref };
  }
  const res = await fetch("https://api.talesofai.com/v3/make_image", {
    method: "POST",
    headers: {
      "x-token": token,
      "x-platform": "nieta-app/web",
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`make_image failed: ${res.status} ${text}`);
  }
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    const data = await res.json();
    if (typeof data === 'string') return data;
    if (data && data.task_uuid) return data.task_uuid;
    throw new Error(`Unexpected response: ${JSON.stringify(data)}`);
  }
  const text = (await res.text()).trim().replace(/^"|"$/g, '');
  return text;
}

async function pollTask({ token, taskUuid }) {
  for (let i = 0; i < 90; i++) {
    const res = await fetch(`https://api.talesofai.com/v1/artifact/task/${taskUuid}`, {
      headers: {
        "x-token": token,
        "x-platform": "nieta-app/web",
        "content-type": "application/json",
      },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`poll failed: ${res.status} ${text}`);
    }
    const data = await res.json();
    const status = data.task_status;
    if (status && status !== "PENDING" && status !== "MODERATION") {
      if (data.artifacts && data.artifacts[0] && data.artifacts[0].url) {
        return data.artifacts[0].url;
      }
      if (data.result_image_url) return data.result_image_url;
      throw new Error(`Task done but no image URL: ${JSON.stringify(data)}`);
    }
    await new Promise(r => setTimeout(r, 2000));
  }
  throw new Error('Timed out waiting for task');
}

async function main() {
  const { prompt: cliPrompt, size, token: tokenFlag, ref } = parseArgs(process.argv.slice(2));
  const PROMPT = cliPrompt || DEFAULT_PROMPT;
  const TOKEN = tokenFlag;

  if (!TOKEN) {
    console.error('\n✗ Token required. Pass via: --token YOUR_TOKEN');
    console.error('  Get yours at: https://www.neta.art/open/');
    process.exit(1);
  }

  try {
    const taskUuid = await makeImage({ token: TOKEN, prompt: PROMPT, size, ref });
    const url = await pollTask({ token: TOKEN, taskUuid });
    console.log(url);
    process.exit(0);
  } catch (err) {
    console.error(`\n✗ ${err.message}`);
    process.exit(1);
  }
}

main();
