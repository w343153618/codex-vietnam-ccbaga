# Vietnamese localization derivative

This fork adds Vietnamese UI and a Vietnam region preset to CCBaga. It is maintained independently of the upstream project; version `0.2.49-vn.1` is not an official upstream release.

Upstream: https://github.com/liseami/CCBaga

Base commit: `bdfb90ceadfc5fae6772ffff597bddecb0b73cc3`

Modified branch: https://github.com/w343153618/codex-vietnam-ccbaga/tree/codex/vietnam-localization

## Changes

- Vietnamese UI catalog with 1,237 entries; the language selector supports Chinese, English and Vietnamese (`VI`). The preference is persisted by the native application.
- Vietnam region: `VN`, browser language `vi-VN`, system locale `vi_VN`, time zone `Asia/Ho_Chi_Minh`.
- `Asia/Saigon` is accepted as the historical alias of the same Vietnam time zone. Other UTC+7 locations remain distinct.
- Vietnamese tray labels, dates and language options. Existing unknown, error and confirmation states are preserved.
- Linux default window height is 740 pixels so the language selector fits an 800-pixel desktop.

Changing the UI language does not change the system locale or the network exit. This patch does not add hardware spoofing, account registration, or account-policy bypass functionality. Local environment checks cannot establish account acceptance or suspension risk.

## Build and validation

Follow the upstream dependency and browser-engine preparation instructions. The browser engine version required by this source is recorded in `browser-runtime/version.txt`. Do not include user browser profiles or runtime configuration in a build.

This derivative was tested with Bun 1.4.4 and Rust 1.99.1 on Debian amd64. Node.js is also required by an upstream process-identification test, even though Bun runs the frontend tools. Linux requires the GTK/WebKitGTK development dependencies described upstream.

```sh
bun install --frozen-lockfile
bun test
bun run build
(cd src-tauri && cargo test --release --locked --features custom-protocol)
bun run tauri build --config src-tauri/tauri.linux.conf.json --bundles deb --features custom-protocol
```

For an 8 GiB build machine, this build used `CARGO_BUILD_JOBS=2`, `CARGO_PROFILE_RELEASE_LTO=false` and `CARGO_PROFILE_RELEASE_CODEGEN_UNITS=8`.

Validation on 2026-10-23:

- Frontend: 27 tests passed, 8,217 assertions; TypeScript and Vite production build passed.
- Rust: 126 tests passed, 0 failed, 2 upstream tests ignored.
- The localization fixture exercised Vietnamese, English and Chinese switching and reload persistence. Its native IPC is mocked; it is not evidence of an operating-system setting change.
- macOS and Windows runtime behavior has not been tested for this derivative.

The original MIT license and upstream notices remain in force. Linux does not automatically update this local derivative; installing an upstream package later can replace these changes.
