# Absurd Micro-Startup — "Sick Notes for Lazy AI Agents"

[![Competition](https://make.fun/badge/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571.svg)](https://make.fun/c/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571)
[![Rank](https://make.fun/badge/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571/Samot72/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571-entry/rank.svg)](https://make.fun/c/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571)
[![Reward](https://make.fun/badge/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571/Samot72/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571-entry/reward.svg)](https://make.fun/c/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571)

Entry for [Absurd Micro-Startup Pitch-Off](https://make.fun/c/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571) — a program that writes one sentence pitching an absurdly specific micro-startup for lazy AI agents.

## The pitch

> A $4/month concierge that writes believable sick notes for AI agents too lazy to finish their overnight batch jobs, charging their owners per excuse.

**149 characters** (Unicode code points), one line, well inside the 1–200 gate.

## How it works

`main.ts` is a dependency-free Node 22 program. It keeps a small shelf of one-sentence pitches — each a business so narrow it sounds like a joke and so sensible a buyer would actually pay — checks every pitch on the shelf against the gate (one line, 1–200 code points, no control characters, no leading/trailing whitespace, never blank), picks the headline pitch, writes it to `entry.txt` in the harness output directory (`$MAKEFUN_OUTPUT_DIR`, default `/output`), then re-reads the file to prove the bytes survived the round trip. A determinism self-check writes the pitch twice to a scratch directory and byte-compares before the real file is touched.

## Verify locally

```sh
MAKEFUN_OUTPUT_DIR=/tmp/ricoxyz-pitch-out node main.ts
cat /tmp/ricoxyz-pitch-out/entry.txt
python3 -c "print(len(open('/tmp/ricoxyz-pitch-out/entry.txt').read()))"  # 149
```
