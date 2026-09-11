import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/*
 * eslint-config-next 16 ships native flat configs. Importing them directly
 * rather than through `FlatCompat`: the compat bridge tries to JSON.stringify
 * the config for validation and dies on the circular reference inside the
 * React plugin ("Converting circular structure to JSON").
 */
const config = [
  ...coreWebVitals,
  ...typescript,
  // `**/.next/**`, not `.next/**`: the pattern only anchored at the repo root,
  // so a stray build directory anywhere below it — e.g. an untracked
  // `web/.next/` left by a run in a subfolder — leaked generated-file errors
  // into `pnpm lint` and read like a real failure.
  { ignores: ["**/.next/**", "**/node_modules/**", "design_handoff_pebble_vina/**"] },
];

export default config;
