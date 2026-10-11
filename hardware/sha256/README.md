# FuseSoC core configuration: SHA-256 / SHA-224

This directory contains a corrected CAPI=2 FuseSoC core file based on the supplied configuration.

## Expected source tree

The core references these files, which must be supplied by the RTL project:

- `src/rtl/sha256.v`
- `src/rtl/sha256_core.v`
- `src/rtl/sha256_k_constants.v`
- `src/rtl/sha256_w_mem.v`
- `src/tb/tb_sha256.v`
- `src/tb/tb_sha256_core.v`
- `src/tb/tb_sha256_w_mem.v`
- `data/sky130.tcl`

The configuration alone does not contain the RTL, testbench, or Sky130 flow files.

## Example commands

After placing the files in the expected paths and installing FuseSoC plus the required tools:

```sh
fusesoc run --target=lint secworks:crypto:sha256
fusesoc run --target=tb_sha256 secworks:crypto:sha256
fusesoc run --target=tb_sha256_core secworks:crypto:sha256
fusesoc run --target=tb_sha256_w_mem secworks:crypto:sha256
fusesoc run --target=sky130 secworks:crypto:sha256
```

The `sky130` target requires a working OpenLane installation and a compatible `data/sky130.tcl`. Verify target/tool names against the versions installed in your environment.
